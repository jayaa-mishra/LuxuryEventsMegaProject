import { notificationRepository } from '../repositories/notification.repository';
import { processEmailJob } from '../jobs/notification.job';
import logger from '../utils/logger';

class NotificationService {
  async sendNotification(
    recipientId: string, 
    emailAddress: string | undefined, 
    title: string, 
    message: string, 
    channels: ('in_app' | 'email' | 'sms')[]
  ) {
    if (channels.includes('in_app')) {
      await notificationRepository.createNotification({
        recipient: recipientId as any,
        title,
        message,
        channels
      });
    }

    if (channels.includes('email') && emailAddress) {
      // Fire and forget email job (do not wait for SMTP response)
      processEmailJob(emailAddress, title, message).catch(err => {
         logger.error('Failed to trigger email job: ' + err);
      });
    }

    if (channels.includes('sms')) {
      logger.info(`[SMS Abstraction] Sending SMS to ${recipientId}: ${message}`);
    }
  }
}

export const notificationService = new NotificationService();
