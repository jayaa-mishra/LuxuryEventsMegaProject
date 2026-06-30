import express from 'express';
import { getWorkflow, getWorkflowByEntity, advanceWorkflow } from '../controllers/workflow.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { advanceWorkflowValidator } from '../middlewares/validators';

const router = express.Router();

/**
 * @swagger
 * /workflows/entity/{id}:
 *   get:
 *     summary: Get a workflow by its lead or booking id (auto-resolves)
 *     tags: [Workflow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Workflow details
 */
router.route('/entity/:id').get(protect, getWorkflowByEntity);

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
router.route('/:id/advance').post(protect, admin, advanceWorkflowValidator, validateRequest, advanceWorkflow);

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
