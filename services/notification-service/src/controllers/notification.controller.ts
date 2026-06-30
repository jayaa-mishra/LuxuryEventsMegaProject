import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Joi from 'joi';
import { notificationQueue, NotificationJobData } from '../queues/notification.queue';
import { sendSuccess, sendError } from '../utils/apiResponse';

const enqueueSchema = Joi.object({
  recipientId: Joi.string().required(),
  email: Joi.string().email().optional(),
  title: Joi.string().required(),
  message: Joi.string().required(),
  channels: Joi.array().items(Joi.string().valid('in_app', 'email', 'sms')).min(1).required(),
});

/** Allows services without a direct Redis connection to enqueue via HTTP. */
export const enqueue = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = enqueueSchema.validate(req.body, { stripUnknown: true });
  if (error) {
    sendError(res, 'Validation failed', 400, error.details.map((d) => d.message));
    return;
  }
  const job = await notificationQueue.add('send', value as NotificationJobData);
  sendSuccess(res, { jobId: job.id }, 'Notification queued', 202);
});

/** Lightweight queue metrics for dashboards / debugging. */
export const stats = asyncHandler(async (_req: Request, res: Response) => {
  const counts = await notificationQueue.getJobCounts('waiting', 'active', 'completed', 'failed', 'delayed');
  sendSuccess(res, counts, 'Queue stats');
});
