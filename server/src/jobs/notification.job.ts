import nodemailer from 'nodemailer';
import logger from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const processEmailJob = async (to: string, subject: string, text: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"Luxury Events" <${process.env.SMTP_USER || 'no-reply@luxuryevents.com'}>`,
      to,
      subject,
      text
    });
    logger.info(`[Notification Job] Email sent successfully to ${to} (${info.messageId})`);
  } catch (error) {
    logger.error(`[Notification Job] Failed to send email to ${to}: ${error}`);
  }
};
