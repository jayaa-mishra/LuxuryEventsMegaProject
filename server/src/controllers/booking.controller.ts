import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { bookingService } from '../services/booking.service';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';
import { getUserId } from '../utils/request';

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const booking = await bookingService.createBooking(req.body, userId);
  sendSuccess(res, booking, 'Booking created successfully', SuccessCodes.CREATED);
});

export const getBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await bookingService.getBookings();
  sendSuccess(res, bookings, 'Bookings fetched successfully');
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const booking = await bookingService.updateBookingStatus(req.params.id as string, req.body.status, userId);
  sendSuccess(res, booking, 'Booking status updated successfully');
});
