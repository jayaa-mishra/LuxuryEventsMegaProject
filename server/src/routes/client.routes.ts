import express from 'express';
import { getMyBookings, getMyQuotations, getMyPayments, getMyProfile } from '../controllers/client.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(protect);

router.get('/profile', getMyProfile);
router.get('/bookings', getMyBookings);
router.get('/quotations', getMyQuotations);
router.get('/payments', getMyPayments);

export default router;
