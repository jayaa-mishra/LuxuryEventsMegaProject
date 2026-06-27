import Notification, { INotification } from '../models/Notification';

class NotificationRepository {
  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return await Notification.create(data);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await Notification.countDocuments({ recipient: userId, isRead: false });
  }

  async getNotifications(userId: string, limit = 20): Promise<INotification[]> {
    return await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(limit);
  }

  async markAsRead(id: string, userId: string): Promise<INotification | null> {
    return await Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
      { isRead: true },
      { new: true }
    );
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
  }
}

export const notificationRepository = new NotificationRepository();
