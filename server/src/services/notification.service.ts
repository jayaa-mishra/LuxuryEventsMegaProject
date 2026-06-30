import { notificationRepository } from '../repositories/notification.repository';
import { processEmailJob } from '../jobs/notification.job';
import { enqueueNotification, NotificationChannel } from '../queues/notification.queue';
import logger from '../utils/logger';

/**
 * Notification orchestration.
 *
 * - `in_app`  → written synchronously to Mongo (fast, needed for the UI badge).
 * - `email`/`sms` → pushed onto the Redis/BullMQ queue and delivered by the
 *   `notification-service` worker. If the queue is unavailable we fall back to
 *   inline delivery so a missing Redis never drops a notification.
 */
class NotificationService {
  async sendNotification(
    recipientId: string,
    emailAddress: string | undefined,
    title: string,
    message: string,
    channels: NotificationChannel[],
  ): Promise<void> {
    if (channels.includes('in_app')) {
      await notificationRepository.createNotification({
        recipient: recipientId as any,
        title,
        message,
        channels,
      });
    }

    const needsExternalDelivery =
      (channels.includes('email') && !!emailAddress) || channels.includes('sms');

    if (!needsExternalDelivery) return;

    const queued = await enqueueNotification({
      recipientId,
      email: emailAddress,
      title,
      message,
      channels,
    });

    if (!queued) {
      // Fallback: deliver inline when the queue/worker is not running.
      if (channels.includes('email') && emailAddress) {
        processEmailJob(emailAddress, title, message).catch((err) =>
          logger.error(`Inline email fallback failed: ${err}`),
        );
      }
      if (channels.includes('sms')) {
        logger.info(`[SMS Abstraction] (inline) Sending SMS to ${recipientId}: ${message}`);
      }
    }
  }
}

export const notificationService = new NotificationService();
export default notificationService;
