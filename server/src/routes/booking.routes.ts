import express from 'express';
import { createBooking, getBookings, updateBookingStatus } from '../controllers/booking.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createBookingValidator, updateBookingStatusValidator } from '../middlewares/validators';

const router = express.Router();

router.route('/')
  .get(protect, admin, getBookings)
  .post(protect, admin, createBookingValidator, validateRequest, createBooking);

router.route('/:id')
  .put(protect, admin, updateBookingStatusValidator, validateRequest, updateBookingStatus);

export default router;
