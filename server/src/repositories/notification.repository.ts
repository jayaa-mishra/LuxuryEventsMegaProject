import Notification, { INotification } from '../models/Notification';
import CrudRepository from './crud.repository';

/**
 * Notification data-access layer (in-app notifications). Extends the generic
 * CrudRepository and adds the per-recipient reads/updates the UI needs.
 */
export class NotificationRepository extends CrudRepository<INotification> {
  constructor() {
    super(Notification);
  }

  async createNotification(data: Partial<INotification>): Promise<INotification> {
    return this.create(data);
  }

  async getUnreadCount(userId: string): Promise<number> {
    return this.count({ recipient: userId, isRead: false });
  }

  async getNotifications(userId: string, limit = 20): Promise<INotification[]> {
    return this.getAll({ filter: { recipient: userId }, sort: { createdAt: -1 }, limit });
  }

  async markAsRead(id: string, userId: string): Promise<INotification | null> {
    return Notification.findOneAndUpdate(
      { _id: id, recipient: userId },
      { isRead: true },
      { new: true },
    );
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
  }
}

export const notificationRepository = new NotificationRepository();
export default notificationRepository;
