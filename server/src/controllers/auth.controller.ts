import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { loginUser, registerUser, getUserById } from '../services/auth.service';
import { auditService } from '../services/audit.service';

export const authUserController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;

  try {
    const { user, token } = await loginUser(email, password);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    await auditService.logAction(
      user.role === 'admin' ? 'ADMIN_LOGIN' : 'USER_LOGIN',
      'User',
      user._id.toString(),
      user._id.toString(),
      null, null, ip
    );

    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (error) {
    await auditService.logAction('FAILED_LOGIN', 'User', 'unknown', undefined, { email }, null, ip);
    throw error;
  }
});

export const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
});

export const logoutUserController = asyncHandler(async (req: Request, res: Response) => {
  const ip = req.ip || req.connection.remoteAddress;
  const token = req.cookies.jwt;
  
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await getUserById(decoded.userId);
      if (user) {
        await auditService.logAction(
          user.role === 'admin' ? 'ADMIN_LOGOUT' : 'USER_LOGOUT',
          'User',
          user._id.toString(),
          user._id.toString(),
          null, null, ip
        );
      }
    } catch (err) {
      // Ignore token verification errors on logout
    }
  }

  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
});

export const getUserProfileController = asyncHandler(async (req: any, res: Response) => {
  const user = await getUserById(req.user._id);
  if (user) res.json(user);
  else { res.status(404); throw new Error('User not found'); }
});
