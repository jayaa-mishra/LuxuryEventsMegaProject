import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { paymentRepository } from '../repositories/payment.repository';
import { sendSuccess } from '../utils/apiResponse';
import { getUserId } from '../utils/request';

export const getMyPayments = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req) as string;
  const payments = await paymentRepository.getPaymentsByClient(userId);
  sendSuccess(res, payments, 'Payments fetched successfully');
});

export const getAllPayments = asyncHandler(async (_req: Request, res: Response) => {
  const payments = await paymentRepository.getAll({ sort: { createdAt: -1 } });
  sendSuccess(res, payments, 'Payments fetched successfully');
});
