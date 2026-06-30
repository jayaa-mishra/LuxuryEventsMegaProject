import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

/**
 * Notification queue contract.
 * MUST stay in sync with the producer in the main API
 * (`server/src/queues/notification.queue.ts`).
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

/** Producer used by this service's own HTTP enqueue endpoint. */
export const notificationQueue = new Queue<NotificationJobData>(NOTIFICATION_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});
