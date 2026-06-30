import Payment, { IPayment } from '../models/Payment';
import CrudRepository from './crud.repository';

/**
 * Payment data-access layer. Extends the generic CrudRepository; the named
 * methods below are kept for readability at call sites.
 */
export class PaymentRepository extends CrudRepository<IPayment> {
  constructor() {
    super(Payment);
  }

  async createPayment(data: Partial<IPayment>): Promise<IPayment> {
    return this.create(data);
  }

  async updatePaymentStatus(id: string, updates: Partial<IPayment>): Promise<IPayment | null> {
    return this.update(id, updates);
  }

  async getPaymentsByClient(clientId: string): Promise<IPayment[]> {
    return this.getAll({ filter: { clientId }, sort: { createdAt: -1 } });
  }
}

export const paymentRepository = new PaymentRepository();
export default paymentRepository;
