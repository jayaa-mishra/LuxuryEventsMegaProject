import express from 'express';
import { getAuditLogs } from '../controllers/audit.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /audit:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of audit logs
 */
router.route('/').get(protect, admin, getAuditLogs);

export default router;
