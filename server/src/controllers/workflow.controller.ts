import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { workflowService } from '../services/workflow.service';
import { WorkflowState } from '../models/Workflow';

export const getWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // lead_id or booking_id
  const { type } = req.query; // 'lead' | 'booking'

  if (type !== 'lead' && type !== 'booking') {
    res.status(400);
    throw new Error('Type must be lead or booking');
  }

  const workflow = await workflowService.getWorkflowByLeadOrBooking(id as string, type as 'lead' | 'booking');
  if (workflow) {
    res.json(workflow);
  } else {
    res.status(404);
    throw new Error('Workflow not found');
  }
});

export const advanceWorkflow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // workflow id
  const { state, notes } = req.body;
  
  if (!Object.values(WorkflowState).includes(state)) {
    res.status(400);
    throw new Error('Invalid target state');
  }

  const userId = (req as any).user._id.toString();
  const updated = await workflowService.advanceWorkflow(id as string, state, userId, notes);
  
  res.json(updated);
});
