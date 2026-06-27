import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { paymentService } from '../services/payment.service';
import Booking from '../models/Booking';
import Quotation from '../models/Quotation';
import Payment from '../models/Payment';
import { workflowService } from '../services/workflow.service';
import { WorkflowState } from '../models/Workflow';

export const createPaymentOrder = asyncHandler(async (req: Request, res: Response) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) { res.status(404); throw new Error('Booking not found'); }
  if (!booking.quotation_id) { res.status(400); throw new Error('Booking has no quotation attached'); }

  const quote = await Quotation.findById(booking.quotation_id);
  if (!quote) { res.status(404); throw new Error('Quotation not found'); }

  const amount = quote.total_amount;
  const clientId = (req as any).user._id.toString();

  const order = await paymentService.createOrder(amount, 'INR', bookingId, clientId);
  res.json(order);
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const userId = (req as any).user._id.toString();

  const payment = await paymentService.verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    userId
  );
  
  if (payment.status === 'paid') {
     const wf = await workflowService.getWorkflowByLeadOrBooking(payment.bookingId.toString(), 'booking');
     if (wf) {
        await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.ADVANCE_PAID, userId, 'Advance payment received');
     }
  }

  res.json(payment);
});

export const getMyPayments = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id.toString();
  const payments = await Payment.find({ clientId: userId }).sort({ createdAt: -1 });
  res.json(payments);
});
