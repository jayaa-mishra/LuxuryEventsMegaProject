import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { workflowService } from '../services/workflow.service';
import { WorkflowState } from '../models/Workflow';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../utils/apiError';
import { getUserId } from '../utils/request';

export const getWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // lead_id or booking_id
  const { type } = req.query; // 'lead' | 'booking'

  if (type !== 'lead' && type !== 'booking') {
    throw AppError.badRequest('Query param "type" must be lead or booking');
  }

  const workflow = await workflowService.getWorkflowByLeadOrBooking(id as string, type);
  if (!workflow) throw AppError.notFound('Workflow not found');
  sendSuccess(res, workflow, 'Workflow fetched successfully');
});

/**
 * Resolve a workflow by entity id without the caller knowing whether it is a
 * lead or a booking (tries lead first, then booking). Backs the frontend
 * `/workflows/entity/:id` call.
 */
export const getWorkflowByEntity = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const workflow =
    (await workflowService.getWorkflowByLeadOrBooking(id as string, 'lead')) ??
    (await workflowService.getWorkflowByLeadOrBooking(id as string, 'booking'));

  if (!workflow) throw AppError.notFound('Workflow not found');
  sendSuccess(res, workflow, 'Workflow fetched successfully');
});

export const advanceWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // workflow id
  const { state, notes } = req.body;

  if (!Object.values(WorkflowState).includes(state)) {
    throw AppError.badRequest('Invalid target state');
  }

  const userId = getUserId(req) as string;
  const updated = await workflowService.advanceWorkflow(id as string, state, userId, notes);
  sendSuccess(res, updated, 'Workflow advanced successfully');
});
