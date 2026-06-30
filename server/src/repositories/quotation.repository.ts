import Quotation, { IQuotation } from '../models/Quotation';
import CrudRepository from './crud.repository';

/**
 * Quotation data-access layer. Generic CRUD inherited; quotation-specific
 * populated reads added here.
 */
export class QuotationRepository extends CrudRepository<IQuotation> {
  constructor() {
    super(Quotation);
  }

  async getAllPopulated(): Promise<IQuotation[]> {
    return this.getAll({ sort: { createdAt: -1 }, populate: ['lead_id', 'package_id'] });
  }

  async getByIdPopulated(id: string): Promise<IQuotation | null> {
    return Quotation.findById(id).populate('lead_id package_id');
  }

  async updateStatus(id: string, status: IQuotation['status']): Promise<IQuotation | null> {
    return this.update(id, { status } as Partial<IQuotation>);
  }
}

export const quotationRepository = new QuotationRepository();
export default quotationRepository;
