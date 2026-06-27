import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(`Validation Error: ${errors.array().map((e: any) => e.msg).join(', ')}`);
  }
  next();
};
