import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { auditService } from '../services/audit.service';

export const getAuditLogs = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (req.query.entityType) filter.entityType = req.query.entityType;
  if (req.query.action) filter.action = req.query.action;

  const result = await auditService.getLogs(filter, skip, limit);
  res.json(result);
});
