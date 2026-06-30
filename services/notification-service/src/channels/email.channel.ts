import nodemailer, { Transporter } from 'nodemailer';
import config from '../config/serverConfig';
import logger from '../utils/logger';

let transporter: Transporter | null = null;

const getTransporter = (): Transporter => {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: config.smtp.host || 'smtp.ethereal.email',
    port: config.smtp.port || 587,
    auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
  });
  return transporter;
};

export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  const info = await getTransporter().sendMail({
    from: config.smtp.from,
    to,
    subject,
    text,
  });
  logger.info(`Email sent to ${to} (messageId=${info.messageId})`);
};
