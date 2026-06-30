import Lead, { ILead } from '../models/Lead';
import CrudRepository from './crud.repository';

/**
 * Lead data-access layer. Only lead-specific reads live here; generic CRUD is
 * inherited from CrudRepository.
 */
export class LeadRepository extends CrudRepository<ILead> {
  constructor() {
    super(Lead);
  }

  async getAllWithPackage(): Promise<ILead[]> {
    return this.getAll({ sort: { createdAt: -1 }, populate: 'desired_package' });
  }

  async getByIdWithPackage(id: string): Promise<ILead | null> {
    return Lead.findById(id).populate('desired_package');
  }

  async updateStatus(id: string, status: ILead['status']): Promise<ILead | null> {
    return this.update(id, { status } as Partial<ILead>);
  }
}

export const leadRepository = new LeadRepository();
export default leadRepository;
