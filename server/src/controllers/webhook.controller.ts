import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { webhookService } from '../services/webhook.service';

export const handleRazorpayWebhook = asyncHandler(async (req: Request, res: Response) => {
  const signature = req.headers['x-razorpay-signature'] as string;
  const payload = req.body;
  // We need the raw body string for verification.
  // Assuming body-parser or express.json parses it, but we can stringify it for HMAC validation.
  const rawBody = JSON.stringify(payload);

  if (!signature) {
    res.status(400);
    throw new Error('Missing signature');
  }

  await webhookService.processWebhook(payload, signature, rawBody);

  res.status(200).json({ status: 'ok' });
});
