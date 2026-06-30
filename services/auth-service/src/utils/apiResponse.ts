import { Response } from 'express';

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: unknown;
}

export const sendSuccess = <T>(res: Response, data: T, message = 'Success', statusCode = 200): Response =>
  res.status(statusCode).json({ success: true, message, data, error: null } as ApiEnvelope<T>);

export const sendError = (res: Response, message: string, statusCode: number, error: unknown = {}): Response =>
  res.status(statusCode).json({ success: false, message, data: null, error } as ApiEnvelope<null>);
