import express from 'express';
import { getMyPayments, getAllPayments } from '../controllers/payment.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /payments/my-payments:
 *   get:
 *     summary: Get authenticated client's payment history
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 */
router.get('/my-payments', protect, getMyPayments);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments (admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all payments
 */
router.get('/', protect, admin, getAllPayments);

export default router;
