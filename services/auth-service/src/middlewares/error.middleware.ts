import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apiError';
import { sendError } from '../utils/apiResponse';

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  next(AppError.notFound(`Route not found - ${req.originalUrl}`));
};

export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err instanceof AppError ? err.statusCode : err?.code === 11000 ? 409 : 500;
  const message = err?.message || 'Something went wrong';
  sendError(res, message, statusCode, process.env.NODE_ENV === 'production' ? {} : { stack: err?.stack });
};
