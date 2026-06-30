import { Response } from 'express';
import { SuccessCodes } from './error-codes';

/**
 * Standard response envelope used across every controller.
 *
 * Shape mirrors the reference AirlineManagementProject (`{ data, success, message, err }`)
 * and is exactly what the frontend `apiClient` interceptor expects
 * (`response.data.data`, `response.data.success`, `response.data.message`).
 */
export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: unknown;
}

/** Backwards-compatible class wrapper (kept for any code still importing it). */
export class ApiResponse<T> implements ApiEnvelope<T> {
  public success: boolean;
  public data: T | null;
  public message: string;
  public error: unknown;

  constructor(statusCode: number, data: T | null, message = 'Success') {
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
    this.error = null;
  }
}

/** Send a success envelope. Defaults to 200 OK. */
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = 'Success',
  statusCode: number = SuccessCodes.OK,
): Response => {
  const body: ApiEnvelope<T> = { success: true, message, data, error: null };
  return res.status(statusCode).json(body);
};

/** Send an error envelope. Used by the global error middleware. */
export const sendError = (
  res: Response,
  message: string,
  statusCode: number,
  error: unknown = {},
): Response => {
  const body: ApiEnvelope<null> = { success: false, message, data: null, error };
  return res.status(statusCode).json(body);
};
