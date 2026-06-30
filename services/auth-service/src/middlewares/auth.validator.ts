import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendError } from '../utils/apiResponse';

const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      sendError(res, 'Validation failed', 400, error.details.map((d) => d.message));
      return;
    }
    next();
  };

export const validateRegister = validate(
  Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().optional(),
    company: Joi.string().optional(),
    role: Joi.string().valid('admin', 'client').optional(),
  }),
);

export const validateLogin = validate(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
);
