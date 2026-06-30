import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { AppError } from '../utils/apiError';

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

/** Verify a Bearer token and attach the decoded identity to the request. */
export const protect = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw AppError.unauthorized('Not authorized, no token');
    }
    const token = header.split(' ')[1] as string;
    const decoded = userService.verifyToken(token);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch {
    next(AppError.unauthorized('Not authorized, token failed'));
  }
};

export const admin = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    next(AppError.forbidden('Admin access required'));
  }
};
