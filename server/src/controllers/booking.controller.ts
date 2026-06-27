import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as bookingService from '../services/booking.service';

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user ? (req as any).user._id.toString() : undefined;
  const booking = await bookingService.createBooking(req.body, userId);
  res.status(201).json(booking);
});

export const getBookings = asyncHandler(async (req: Request, res: Response) => {
  const bookings = await bookingService.getBookings();
  res.json(bookings);
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user ? (req as any).user._id.toString() : undefined;
  const booking = await bookingService.updateBookingStatus(req.params.id as string, req.body.status, userId);
  if (booking) res.json(booking);
  else { res.status(404); throw new Error('Booking not found'); }
});
