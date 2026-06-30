import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logger from '../utils/logger';
import { AppError } from '../utils/apiError';
import { sendError } from '../utils/apiResponse';
import { ClientErrorCodes, ServerErrorCodes } from '../utils/error-codes';

/** 404 handler — forwards a typed AppError to the error handler. */
export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(AppError.notFound(`Route not found - ${req.originalUrl}`));
};

/**
 * Global error handler. Normalises every failure (AppError, Mongoose
 * validation/cast/duplicate-key, or unknown) into the standard response
 * envelope so the frontend always receives `{ success, message, data, error }`.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode: number = ServerErrorCodes.INTERNAL_SERVER_ERROR;
  let message = 'Something went wrong';
  let details: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = ClientErrorCodes.UNPROCESSABLE_ENTITY;
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => e.message);
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = ClientErrorCodes.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err?.code === 11000) {
    statusCode = ClientErrorCodes.CONFLICT;
    message = `Duplicate value for: ${Object.keys(err.keyValue || {}).join(', ')}`;
  } else if (err instanceof Error) {
    message = err.message || message;
    // Preserve a status code an upstream handler may have set on the response.
    if (res.statusCode && res.statusCode >= 400) statusCode = res.statusCode;
  }

  logger.error(
    `${statusCode} - ${message} - ${req.method} ${req.originalUrl} - ${req.ip}`,
  );
  if (!(err instanceof AppError) && err?.stack && process.env.NODE_ENV !== 'production') {
    logger.error(err.stack);
  }

  const errorPayload =
    process.env.NODE_ENV === 'production'
      ? details ?? {}
      : { details, stack: err?.stack };

  sendError(res, message, statusCode, errorPayload);
};
