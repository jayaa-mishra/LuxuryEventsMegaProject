import Booking, { IBooking } from '../models/Booking';
import CrudRepository from './crud.repository';

/**
 * Booking data-access layer. Generic CRUD inherited; booking-specific reads added here.
 */
export class BookingRepository extends CrudRepository<IBooking> {
  constructor() {
    super(Booking);
  }

  async getAllPopulated(): Promise<IBooking[]> {
    return this.getAll({
      sort: { event_date: 1 },
      populate: ['client_id', 'package_id', 'quotation_id'],
    });
  }

  async getByClient(clientId: string): Promise<IBooking[]> {
    return this.getAll({
      filter: { client_id: clientId },
      sort: { event_date: 1 },
      populate: ['package_id', 'quotation_id'],
    });
  }

  async updateStatus(id: string, status: IBooking['status']): Promise<IBooking | null> {
    return this.update(id, { status } as Partial<IBooking>);
  }
}

export const bookingRepository = new BookingRepository();
export default bookingRepository;
