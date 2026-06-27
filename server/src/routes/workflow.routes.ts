import express from 'express';
import { getWorkflow, advanceWorkflow } from '../controllers/workflow.controller';
import { protect, admin } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /workflows/{id}/advance:
 *   post:
 *     summary: Advance a workflow
 *     tags: [Workflow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workflow advanced successfully
 */
router.route('/:id/advance').post(protect, admin, advanceWorkflow);

/**
 * @swagger
 * /workflows/{id}:
 *   get:
 *     summary: Get a specific workflow
 *     tags: [Workflow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workflow details
 */
router.route('/:id').get(protect, getWorkflow);

export default router;
