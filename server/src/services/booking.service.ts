import Booking, { IBooking } from '../models/Booking';
import Quotation from '../models/Quotation';
import { workflowService } from './workflow.service';
import { auditService } from './audit.service';
import { notificationService } from './notification.service';
import { WorkflowState } from '../models/Workflow';

export const createBooking = async (data: Partial<IBooking>, userId?: string): Promise<IBooking> => {
  const booking = await Booking.create(data);
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
};

export const getBookings = async (): Promise<IBooking[]> => {
  return await Booking.find({}).populate('client_id package_id quotation_id').sort({ event_date: 1 });
};

export const updateBookingStatus = async (id: string, status: IBooking['status'], userId?: string): Promise<IBooking | null> => {
  const oldBooking = await Booking.findById(id);
  const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  
  if (oldBooking && booking) {
    await auditService.logAction('UPDATE_BOOKING_STATUS', 'Booking', id, userId, oldBooking.status, status);
    
    const wf = await workflowService.getWorkflowByLeadOrBooking(id, 'booking');
    if (wf) {
      if (status === 'completed') {
        await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.EVENT_COMPLETED, userId || 'system', 'Event Completed');
        await notificationService.sendNotification(booking.client_id?.toString() || 'admin', undefined, 'Booking Completed', 'Your event has been completed.', ['in_app']);
      } else if (status === 'in_progress') {
        await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.EVENT_ONGOING, userId || 'system', 'Event In Progress');
      } else if (status === 'approved') {
        await notificationService.sendNotification(booking.client_id?.toString() || 'admin', undefined, 'Booking Approved', 'Your booking has been approved.', ['in_app']);
      } else if (status === 'cancelled') {
        await notificationService.sendNotification(booking.client_id?.toString() || 'admin', undefined, 'Booking Cancelled', 'Your booking has been cancelled.', ['in_app']);
      }
    }
  }
  
  return booking;
};
