import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getDashboardMetrics, getPaymentAnalytics } from '../services/analytics.service';

export const getDashboardAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const metrics = await getDashboardMetrics();
  res.status(200).json({ success: true, data: metrics });
});

export const getPaymentAnalyticsData = asyncHandler(async (req: Request, res: Response) => {
  const metrics = await getPaymentAnalytics();
  res.status(200).json({ success: true, data: metrics });
});
