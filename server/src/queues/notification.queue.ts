import { Queue } from 'bullmq';
import { env } from '../config/env';
import logger from '../utils/logger';

/**
 * Notification queue (producer side).
 *
 * The main API only *enqueues* notification jobs; the dedicated
 * `notification-service` worker consumes and delivers them (email/SMS). This
 * decouples slow third-party I/O (SMTP) from request latency.
 *
 * Shared contract — keep in sync with `services/notification-service`.
 */
export const NOTIFICATION_QUEUE_NAME = 'notifications';

export type NotificationChannel = 'in_app' | 'email' | 'sms';

export interface NotificationJobData {
  recipientId: string;
  email?: string;
  title: string;
  message: string;
  channels: NotificationChannel[];
}

let queue: Queue<NotificationJobData> | null = null;

const connection = env.redis.url
  ? { url: env.redis.url }
  : { host: env.redis.host, port: env.redis.port, password: env.redis.password };

/** Lazily construct the queue so the app boots even when Redis is absent. */
export const getNotificationQueue = (): Queue<NotificationJobData> | null => {
  if (queue) return queue;
  try {
    queue = new Queue<NotificationJobData>(NOTIFICATION_QUEUE_NAME, {
      connection: connection as any,
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: 1000,
        removeOnFail: 5000,
      },
    });
    return queue;
  } catch (error) {
    logger.warn(`[NotificationQueue] unavailable, will fall back to inline send: ${error}`);
    return null;
  }
};

/**
 * Enqueue a notification job. Returns `true` if it was accepted by the queue,
 * `false` if the queue is unavailable so the caller can fall back to inline delivery.
 */
export const enqueueNotification = async (data: NotificationJobData): Promise<boolean> => {
  const q = getNotificationQueue();
  if (!q) return false;
  try {
    await q.add('send', data);
    return true;
  } catch (error) {
    logger.warn(`[NotificationQueue] enqueue failed, falling back to inline: ${error}`);
    return false;
  }
};
