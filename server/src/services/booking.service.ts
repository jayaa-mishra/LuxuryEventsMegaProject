import { IBooking } from '../models/Booking';
import Quotation from '../models/Quotation';
import { bookingRepository, BookingRepository } from '../repositories/booking.repository';
import CrudService from './crud.service';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { WorkflowState } from '../models/Workflow';

/**
 * Booking business logic. CRUD from the base service; lifecycle orchestration
 * (workflow advance, audit, client notifications) added on top.
 */
export class BookingService extends CrudService<IBooking> {
  constructor(private readonly bookings: BookingRepository = bookingRepository) {
    super(bookings, 'Booking');
  }

  async createBooking(data: Partial<IBooking>, userId?: string): Promise<IBooking> {
    const booking = await this.bookings.create(data);
    await auditService.logAction('CREATE_BOOKING', 'Booking', booking._id.toString(), userId, null, booking);

    if (booking.quotation_id) {
      const quote = await Quotation.findById(booking.quotation_id);
      if (quote && quote.lead_id) {
        const wf = await workflowService.getWorkflowByLeadOrBooking(quote.lead_id.toString(), 'lead');
        if (wf) {
          await workflowService.attachBooking(wf._id.toString(), booking._id.toString(), userId || 'system');
        }
      }
    }

    return booking;
  }

  async getBookings(): Promise<IBooking[]> {
    return this.bookings.getAllPopulated();
  }

  async updateBookingStatus(
    id: string,
    status: IBooking['status'],
    userId?: string,
  ): Promise<IBooking | null> {
    const oldBooking = await this.bookings.get(id);
    const booking = await this.bookings.updateStatus(id, status);

    if (oldBooking && booking) {
      await auditService.logAction('UPDATE_BOOKING_STATUS', 'Booking', id, userId, oldBooking.status, status);
      await this.handleStatusSideEffects(booking, status, userId);
    }

    return booking;
  }

  private async handleStatusSideEffects(
    booking: IBooking,
    status: IBooking['status'],
    userId?: string,
  ): Promise<void> {
    const wf = await workflowService.getWorkflowByLeadOrBooking(booking._id.toString(), 'booking');
    const clientId = booking.client_id?.toString() || 'admin';

    if (status === 'completed') {
      if (wf) {
        await workflowService.advanceWorkflow(
          wf._id.toString(), WorkflowState.EVENT_COMPLETED, userId || 'system', 'Event Completed',
        );
      }
      await notificationService.sendNotification(clientId, undefined, 'Booking Completed', 'Your event has been completed.', ['in_app']);
    } else if (status === 'in_progress') {
      if (wf) {
        await workflowService.advanceWorkflow(
          wf._id.toString(), WorkflowState.EVENT_ONGOING, userId || 'system', 'Event In Progress',
        );
      }
    } else if (status === 'approved') {
      await notificationService.sendNotification(clientId, undefined, 'Booking Approved', 'Your booking has been approved.', ['in_app']);
    } else if (status === 'cancelled') {
      await notificationService.sendNotification(clientId, undefined, 'Booking Cancelled', 'Your booking has been cancelled.', ['in_app']);
    }
  }
}

export const bookingService = new BookingService();
export default bookingService;
