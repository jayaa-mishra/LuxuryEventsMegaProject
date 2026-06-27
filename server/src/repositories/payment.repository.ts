import Payment, { IPayment } from '../models/Payment';

class PaymentRepository {
  async createPayment(data: Partial<IPayment>): Promise<IPayment> {
    return await Payment.create(data);
  }

  async getPaymentByOrderId(orderId: string): Promise<IPayment | null> {
    return await Payment.findOne({ razorpayOrderId: orderId });
  }

  async updatePaymentStatus(id: string, updates: Partial<IPayment>): Promise<IPayment | null> {
    return await Payment.findByIdAndUpdate(id, updates, { new: true });
  }

  async getPaymentsByClient(clientId: string): Promise<IPayment[]> {
    return await Payment.find({ clientId }).sort({ createdAt: -1 });
  }
}

export const paymentRepository = new PaymentRepository();
