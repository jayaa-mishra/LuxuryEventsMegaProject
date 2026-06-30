import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { webhookService } from '../services/webhook.service';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../utils/apiError';

export const handleRazorpayWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  if (!signature) throw AppError.badRequest('Missing signature');

  // The webhook route is mounted with express.raw(), so req.body is a Buffer
  // containing the exact bytes Razorpay signed. HMAC must run on these bytes.
  const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : JSON.stringify(req.body);

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    throw AppError.badRequest('Invalid JSON payload');
  }

  const result = await webhookService.processWebhook(payload, signature, rawBody);
  sendSuccess(res, result ?? { status: 'ok' }, 'Webhook processed');
});
