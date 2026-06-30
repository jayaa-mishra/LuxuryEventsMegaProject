import { Request, Response, CookieOptions } from 'express';
import asyncHandler from 'express-async-handler';
import { userService, AuthPayload } from '../services/user.service';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../utils/apiError';
import { AuthRequest } from '../middlewares/auth.middleware';
import config from '../config/serverConfig';

const REFRESH_COOKIE = 'refreshToken';

const refreshCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: config.isProd,
  sameSite: config.isProd ? 'none' : 'lax',
  path: '/api/v1/auth',
  maxAge: config.jwt.refreshExpiresDays * 24 * 60 * 60 * 1000,
});

/** Set the refresh cookie and return the access token + user in the body. */
const respondWithSession = (res: Response, payload: AuthPayload, message: string, status = 200): void => {
  res.cookie(REFRESH_COOKIE, payload.refreshToken, refreshCookieOptions());
  sendSuccess(res, { ...payload.user, token: payload.accessToken }, message, status);
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const payload = await userService.register(req.body);
  respondWithSession(res, payload, 'Registered successfully', 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const payload = await userService.login(req.body.email, req.body.password);
  respondWithSession(res, payload, 'Logged in successfully');
});

/** Exchange a valid refresh cookie for a fresh access token (rotates the refresh token). */
export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies?.[REFRESH_COOKIE];
  const payload = await userService.refresh(token);
  respondWithSession(res, payload, 'Token refreshed successfully');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  await userService.revokeRefreshToken(req.cookies?.[REFRESH_COOKIE]);
  res.clearCookie(REFRESH_COOKIE, { path: '/api/v1/auth' });
  sendSuccess(res, null, 'Logged out successfully');
});

export const profile = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) throw AppError.unauthorized();
  const user = await userService.getProfile(req.user.id);
  sendSuccess(res, user, 'Profile fetched successfully');
});

/** Token introspection endpoint consumed by the gateway / other services. */
export const verify = asyncHandler(async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.split(' ')[1] : req.body.token;
  if (!token) throw AppError.badRequest('No token provided');
  const user = await userService.authenticate(token);
  sendSuccess(res, user, 'Token is valid');
});

export const listUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.listUsers();
  sendSuccess(res, users, 'Users fetched successfully');
});
