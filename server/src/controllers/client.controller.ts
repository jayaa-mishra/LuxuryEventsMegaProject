import { Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthRequest } from '../middlewares/auth.middleware';
import { bookingRepository } from '../repositories/booking.repository';
import { quotationRepository } from '../repositories/quotation.repository';
import { paymentRepository } from '../repositories/payment.repository';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../utils/apiError';
import { getUserId } from '../utils/request';

export const getMyBookings = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const clientId = getUserId(req);
  if (!clientId) return next(AppError.unauthorized());
  const bookings = await bookingRepository.getByClient(clientId);
  sendSuccess(res, bookings, 'Bookings retrieved');
});

export const getMyQuotations = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const clientId = getUserId(req);
  if (!clientId) return next(AppError.unauthorized());
  const bookings = await bookingRepository.getByClient(clientId);
  const bookingIds = bookings.map((b) => b._id.toString());
  const allQuotations = await quotationRepository.getAllPopulated();
  const myQuotations = allQuotations.filter((q) => {
    const leadId = typeof q.lead_id === 'object'
      ? (q.lead_id as any)?._id?.toString()
      : String(q.lead_id ?? '');
    return bookingIds.some((id) => id === leadId);
  });
  sendSuccess(res, myQuotations, 'Quotations retrieved');
});

export const getMyPayments = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const clientId = getUserId(req);
  if (!clientId) return next(AppError.unauthorized());
  const payments = await paymentRepository.getPaymentsByClient(clientId);
  sendSuccess(res, payments, 'Payments retrieved');
});

export const getMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  sendSuccess(res, req.user, 'Profile retrieved');
});
