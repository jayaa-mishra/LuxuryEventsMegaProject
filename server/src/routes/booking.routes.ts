import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/booking.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/')
  .get(protect, admin, getBookings)
  .post(protect, admin, createBooking);

router.route('/:id')
  .put(protect, admin, updateBookingStatus);

export default router;
