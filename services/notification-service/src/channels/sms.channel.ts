import logger from '../utils/logger';

/**
 * SMS delivery abstraction. Swap this stub for a real provider (Twilio, MSG91,
 * AWS SNS) without touching the worker.
 */
export const sendSms = async (recipientId: string, message: string): Promise<void> => {
  logger.info(`[SMS stub] -> ${recipientId}: ${message}`);
};
