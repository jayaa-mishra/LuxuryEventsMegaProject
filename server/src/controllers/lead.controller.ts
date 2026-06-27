import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as leadService from '../services/lead.service';

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user ? (req as any).user._id.toString() : undefined;
  const lead = await leadService.createLead(req.body, userId);
  res.status(201).json(lead);
});

export const getLeads = asyncHandler(async (req: Request, res: Response) => {
  const leads = await leadService.getAllLeads();
  res.json(leads);
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const lead = await leadService.getLeadById(req.params.id as string);
  if (lead) res.json(lead);
  else { res.status(404); throw new Error('Lead not found'); }
});

export const updateLeadStatus = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user ? (req as any).user._id.toString() : undefined;
  const lead = await leadService.updateLeadStatus(req.params.id as string, req.body.status, userId);
  if (lead) res.json(lead);
  else { res.status(404); throw new Error('Lead not found'); }
});
