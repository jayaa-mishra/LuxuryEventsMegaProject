import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { paymentService } from '../services/payment.service';
import { paymentRepository } from '../repositories/payment.repository';
import Booking from '../models/Booking';
import Quotation from '../models/Quotation';
import { workflowService } from '../services/workflow.service';
import { WorkflowState } from '../models/Workflow';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';
import { AppError } from '../utils/apiError';
import { getUserId } from '../utils/request';

export const createPaymentOrder = asyncHandler(async (req: Request, res: Response) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) throw AppError.notFound('Booking not found');
  if (!booking.quotation_id) throw AppError.badRequest('Booking has no quotation attached');

  const quote = await Quotation.findById(booking.quotation_id);
  if (!quote) throw AppError.notFound('Quotation not found');

  const clientId = getUserId(req) as string;
  const order = await paymentService.createOrder(quote.total_amount, 'INR', bookingId, clientId);
  sendSuccess(res, order, 'Payment order created successfully', SuccessCodes.CREATED);
});

export const verifyPayment = asyncHandler(async (req: Request, res: Response) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const userId = getUserId(req) as string;

  const payment = await paymentService.verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    userId,
  );

  if (payment.status === 'paid') {
    const wf = await workflowService.getWorkflowByLeadOrBooking(payment.bookingId.toString(), 'booking');
    if (wf) {
      await workflowService.advanceWorkflow(wf._id.toString(), WorkflowState.ADVANCE_PAID, userId, 'Advance payment received');
    }
  }

  sendSuccess(res, payment, 'Payment verified successfully');
});

export const getMyPayments = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req) as string;
  const payments = await paymentRepository.getPaymentsByClient(userId);
  sendSuccess(res, payments, 'Payments fetched successfully');
});
