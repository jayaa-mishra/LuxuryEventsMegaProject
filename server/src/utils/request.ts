import { Request } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';

/** Safely extract the authenticated user's id from a request, if present. */
export const getUserId = (req: Request): string | undefined => {
  const user = (req as AuthRequest).user;
  return user?._id ? String(user._id) : undefined;
};
