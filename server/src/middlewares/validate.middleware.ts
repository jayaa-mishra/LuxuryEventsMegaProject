import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/apiError';

/**
 * Collects express-validator results and converts any failures into a typed
 * AppError so the global error handler renders the standard envelope.
 */
export const validateRequest = (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((e: any) => e.msg);
    return next(AppError.badRequest('Validation failed', messages));
  }
  next();
};
