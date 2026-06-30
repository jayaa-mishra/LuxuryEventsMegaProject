import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { analyticsService } from '../services/analytics.service';
import { sendSuccess } from '../utils/apiResponse';

export const getDashboardAnalytics = asyncHandler(async (_req: Request, res: Response) => {
  const metrics = await analyticsService.getDashboardMetrics();
  sendSuccess(res, metrics, 'Dashboard analytics fetched successfully');
});

export const getPaymentAnalyticsData = asyncHandler(async (_req: Request, res: Response) => {
  const metrics = await analyticsService.getPaymentAnalytics();
  sendSuccess(res, metrics, 'Payment analytics fetched successfully');
});
