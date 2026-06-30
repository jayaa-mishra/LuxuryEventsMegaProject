import { paymentRepository } from '../repositories/payment.repository';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import Booking from '../models/Booking';

class PaymentService {
  async recordPayment(amount: number, currency: string, bookingId: string, clientId: string) {
    const payment = await paymentRepository.createPayment({
      amount,
      currency,
      bookingId: bookingId as any,
      clientId: clientId as any,
      status: 'pending',
    });

    await auditService.logAction('PAYMENT_RECORDED', 'Payment', payment._id.toString(), clientId, null, { amount, currency });
    return payment;
  }

  async markPaid(paymentId: string, transactionId: string, userId: string) {
    const payment = await paymentRepository.updatePaymentStatus(paymentId, {
      status: 'paid',
      transactionId,
      paidAt: new Date(),
    });
    if (!payment) throw new Error('Payment not found');

    await Booking.findByIdAndUpdate(payment.bookingId, { payment_status: 'paid' });
    await auditService.logAction('PAYMENT_MARKED_PAID', 'Payment', paymentId, userId, 'pending', 'paid');
    await notificationService.sendNotification(userId, undefined, 'Payment Confirmed', 'Your payment has been recorded.', ['in_app']);

    return payment;
  }
}

export const paymentService = new PaymentService();
