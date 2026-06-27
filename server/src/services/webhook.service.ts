import crypto from 'crypto';
import WebhookLog from '../models/WebhookLog';
import Payment from '../models/Payment';
import Booking from '../models/Booking';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { receiptService } from './receipt.service';

class WebhookService {
  async processWebhook(payload: any, signature: string, rawBody: string) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_secret';

    // Verify signature
    let isValid = false;
    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
        isValid = true;
    } else {
        const expectedSignature = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
        isValid = expectedSignature === signature;
    }

    if (!isValid) {
      throw new Error('Invalid signature');
    }

    const eventId = payload.id || `mock_${Date.now()}`;
    const eventType = payload.event;

    // Duplicate check
    const existing = await WebhookLog.findOne({ eventId });
    if (existing) {
      return { status: 'ignored', message: 'Duplicate webhook' };
    }

    const log = await WebhookLog.create({
      eventId,
      eventType,
      payload,
      signature,
      status: 'processing'
    });

    try {
      const paymentEntity = payload.payload?.payment?.entity;

      if (eventType === 'payment.captured') {
        const orderId = paymentEntity?.order_id;
        const payment = await Payment.findOne({ razorpayOrderId: orderId });
        
        if (payment && payment.status !== 'paid') {
          payment.status = 'paid';
          payment.transactionId = paymentEntity?.id;
          payment.paidAt = new Date();
          
          // Generate receipt
          const receiptUrl = await receiptService.generateReceipt(payment._id.toString());
          payment.receiptUrl = receiptUrl;
          
          await payment.save();

          await Booking.findByIdAndUpdate(payment.bookingId, { payment_status: 'paid' });
          await auditService.logAction('WEBHOOK_PAYMENT_CAPTURED', 'Payment', payment._id.toString(), undefined, 'pending', 'paid');
          await notificationService.sendNotification(payment.clientId.toString(), undefined, 'Payment Success', 'Your payment was successful.', ['in_app']);
        }
      } else if (eventType === 'payment.failed') {
        const orderId = paymentEntity?.order_id;
        const payment = await Payment.findOne({ razorpayOrderId: orderId });
        
        if (payment && payment.status !== 'failed') {
          payment.status = 'failed';
          await payment.save();
          await Booking.findByIdAndUpdate(payment.bookingId, { payment_status: 'failed' });
          await auditService.logAction('WEBHOOK_PAYMENT_FAILED', 'Payment', payment._id.toString(), undefined, 'pending', 'failed');
          await notificationService.sendNotification(payment.clientId.toString(), undefined, 'Payment Failed', 'Your payment failed.', ['in_app']);
        }
      } else if (eventType === 'refund.processed' || eventType === 'refund.created') {
        const orderId = paymentEntity?.order_id;
        if (orderId) {
          const payment = await Payment.findOne({ razorpayOrderId: orderId });
          if (payment && payment.status !== 'refunded') {
            payment.status = 'refunded';
            await payment.save();
            await Booking.findByIdAndUpdate(payment.bookingId, { payment_status: 'refunded' });
            await auditService.logAction('WEBHOOK_REFUND_PROCESSED', 'Payment', payment._id.toString(), undefined, payment.status, 'refunded');
            await notificationService.sendNotification(payment.clientId.toString(), undefined, 'Refund Processed', 'Your refund has been processed.', ['in_app']);
          }
        }
      }

      log.status = 'processed';
      await log.save();
      return { status: 'processed' };
    } catch (err: any) {
      log.status = 'failed';
      log.error = err.message;
      await log.save();
      throw err;
    }
  }
}

export const webhookService = new WebhookService();
