import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import {
  authUserController,
  registerUserController,
  logoutUserController,
  getUserProfileController,
} from '../controllers/auth.controller';
import { protect, admin } from '../middlewares/auth.middleware';
import { registerValidator, loginValidator } from '../middlewares/auth.validator';
import { validateRequest } from '../middlewares/validate.middleware';

const router = express.Router();

// Public routes
router.post('/register', registerValidator, validateRequest, registerUserController);
router.post('/login', loginValidator, validateRequest, authUserController);
router.post('/logout', logoutUserController);

// Refresh — re-sign a new token from the httpOnly cookie
router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.jwt;
  if (!token) { res.status(401); throw new Error('No refresh token'); }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

  res.cookie('jwt', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.json({ data: { token: newToken } });
}));

// Protected routes
router.route('/profile').get(protect, getUserProfileController);

// Admin-only: create a user account on behalf of a client
router.post('/admin/create-user', protect, admin, registerValidator, validateRequest, registerUserController);

export default router;
