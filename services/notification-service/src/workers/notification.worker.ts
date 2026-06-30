import { Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis';
import { NOTIFICATION_QUEUE_NAME, NotificationJobData } from '../queues/notification.queue';
import { sendEmail } from '../channels/email.channel';
import { sendSms } from '../channels/sms.channel';
import config from '../config/serverConfig';
import logger from '../utils/logger';

/**
 * Consumes notification jobs and fans them out to the right channel.
 * `in_app` notifications are written synchronously by the producer (main API),
 * so the worker only handles the slow external channels (email/SMS).
 */
const processJob = async (job: Job<NotificationJobData>): Promise<void> => {
  const { email, title, message, channels, recipientId } = job.data;

  if (channels.includes('email') && email) {
    await sendEmail(email, title, message);
  }
  if (channels.includes('sms')) {
    await sendSms(recipientId, message);
  }
};

export const startNotificationWorker = (): Worker<NotificationJobData> => {
  const worker = new Worker<NotificationJobData>(NOTIFICATION_QUEUE_NAME, processJob, {
    connection: redisConnection,
    concurrency: config.workerConcurrency,
  });

  worker.on('completed', (job) => logger.info(`Job ${job.id} completed`));
  worker.on('failed', (job, err) => logger.error(`Job ${job?.id} failed: ${err.message}`));
  worker.on('error', (err) => logger.error(`Worker error: ${err.message}`));

  logger.info(`Notification worker listening on queue "${NOTIFICATION_QUEUE_NAME}"`);
  return worker;
};
