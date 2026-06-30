import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { leadService } from '../services/lead.service';
import { sendSuccess } from '../utils/apiResponse';
import { SuccessCodes } from '../utils/error-codes';
import { getUserId } from '../utils/request';

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const lead = await leadService.createLead(req.body, userId);
  sendSuccess(res, lead, 'Lead created successfully', SuccessCodes.CREATED);
});

export const getLeads = asyncHandler(async (_req: Request, res: Response) => {
  const leads = await leadService.getAllLeads();
  sendSuccess(res, leads, 'Leads fetched successfully');
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id as string);
  sendSuccess(res, lead, 'Lead fetched successfully');
});

export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const lead = await leadService.updateLeadStatus(req.params.id as string, req.body.status, userId);
  sendSuccess(res, lead, 'Lead status updated successfully');
});
