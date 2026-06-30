import express from 'express';
import { createPaymentOrder, verifyPayment, getMyPayments } from '../controllers/payment.controller';
import { protect } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { createPaymentOrderValidator, verifyPaymentValidator } from '../middlewares/validators';

const router = express.Router();

/**
 * @swagger
 * /payments/order:
 *   post:
 *     summary: Create Razorpay Order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order created
 */
router.post('/order', protect, createPaymentOrderValidator, validateRequest, createPaymentOrder);
router.get('/my-payments', protect, getMyPayments);

/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify Razorpay Payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment verified
 */
router.post('/verify', protect, verifyPaymentValidator, validateRequest, verifyPayment);

import { handleRazorpayWebhook } from '../controllers/webhook.controller';

/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: Razorpay Webhook
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook processed
 */
router.post('/webhook', handleRazorpayWebhook);

export default router;
