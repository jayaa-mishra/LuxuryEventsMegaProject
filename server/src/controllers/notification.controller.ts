import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { notificationRepository } from '../repositories/notification.repository';
import { sendSuccess } from '../utils/apiResponse';
import { getUserId } from '../utils/request';

export const getMyNotifications = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req) as string;
  const limit = Number(req.query.limit) || 20;
  const notifications = await notificationRepository.getNotifications(userId, limit);
  sendSuccess(res, notifications, 'Notifications fetched successfully');
});

export const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req) as string;
  const count = await notificationRepository.getUnreadCount(userId);
  sendSuccess(res, { count }, 'Unread count fetched successfully');
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req) as string;
  const notification = await notificationRepository.markAsRead(req.params.id as string, userId);
  sendSuccess(res, notification, 'Notification marked as read');
});

export const markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserId(req) as string;
  await notificationRepository.markAllAsRead(userId);
  sendSuccess(res, null, 'All notifications marked as read');
});
