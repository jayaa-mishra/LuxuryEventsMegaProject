import express from 'express';
import { getDashboardAnalytics, getPaymentAnalyticsData } from '../controllers/analytics.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardAnalytics);
router.get('/payments', protect, admin, getPaymentAnalyticsData);

export default router;
