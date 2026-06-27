import Razorpay from 'razorpay';
import crypto from 'crypto';
import { paymentRepository } from '../repositories/payment.repository';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import Booking from '../models/Booking';

class PaymentService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret'
    });
  }

  async createOrder(amount: number, currency: string, bookingId: string, clientId: string) {
    const options = {
      amount: amount * 100, // Razorpay works in smallest currency unit (paise)
      currency,
      receipt: `rcpt_${bookingId}`
    };

    let razorpayOrder;
    try {
      razorpayOrder = await this.razorpay.orders.create(options);
    } catch (err: any) {
      // Mocking order for development without keys
      if (!process.env.RAZORPAY_KEY_ID) {
        razorpayOrder = { id: `order_mock_${Date.now()}` };
      } else {
        throw new Error(`Razorpay Error: ${err.message}`);
      }
    }

    const payment = await paymentRepository.createPayment({
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency,
      bookingId: bookingId as any,
      clientId: clientId as any,
      status: 'pending'
    });

    await auditService.logAction('PAYMENT_ORDER_CREATED', 'Payment', payment._id.toString(), clientId, null, { amount, currency });

    return {
      orderId: razorpayOrder.id,
      paymentId: payment._id,
      amount,
      currency
    };
  }

  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
    userId: string
  ) {
    const payment = await paymentRepository.getPaymentByOrderId(razorpayOrderId);
    if (!payment) throw new Error('Payment not found');

    // MOCK VERIFICATION IF NO KEYS
    let isValid = false;
    if (!process.env.RAZORPAY_KEY_SECRET) {
      isValid = true; 
    } else {
      const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const digest = shasum.digest('hex');
      isValid = digest === razorpaySignature;
    }

    if (isValid) {
      payment.status = 'paid';
      payment.transactionId = razorpayPaymentId;
      payment.paidAt = new Date();
      await payment.save();

      await Booking.findByIdAndUpdate(payment.bookingId, { payment_status: 'paid' });
      await auditService.logAction('PAYMENT_VERIFIED', 'Payment', payment._id.toString(), userId, 'pending', 'paid');
      await notificationService.sendNotification(userId, undefined, 'Payment Success', 'Your payment was successful.', ['in_app']);
      
      return payment;
    } else {
      payment.status = 'failed';
      await payment.save();
      await auditService.logAction('PAYMENT_FAILED', 'Payment', payment._id.toString(), userId, 'pending', 'failed');
      await notificationService.sendNotification(userId, undefined, 'Payment Failed', 'Your payment verification failed.', ['in_app']);
      throw new Error('Payment verification failed');
    }
  }
}

export const paymentService = new PaymentService();
