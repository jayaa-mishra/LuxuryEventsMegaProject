import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { notificationRepository } from '../repositories/notification.repository';

export const getMyNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id.toString();
  const limit = Number(req.query.limit) || 20;
  const notifications = await notificationRepository.getNotifications(userId, limit);
  res.json(notifications);
});

export const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id.toString();
  const count = await notificationRepository.getUnreadCount(userId);
  res.json({ count });
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id.toString();
  const notification = await notificationRepository.markAsRead(req.params.id as string, userId);
  res.json(notification);
});

export const markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id.toString();
  await notificationRepository.markAllAsRead(userId);
  res.json({ message: 'Marked all as read' });
});
