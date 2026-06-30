import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const schema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5002),
  REDIS_URL: Joi.string().allow('').optional(),
  REDIS_HOST: Joi.string().default('127.0.0.1'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  WORKER_CONCURRENCY: Joi.number().default(5),
  SMTP_HOST: Joi.string().allow('').optional(),
  SMTP_PORT: Joi.number().allow('').optional(),
  SMTP_USER: Joi.string().allow('').optional(),
  SMTP_PASS: Joi.string().allow('').optional(),
  MAIL_FROM: Joi.string().default('"Luxury Events" <no-reply@luxuryevents.com>'),
}).unknown();

const { value: envVars, error } = schema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`[notification-service] Config validation error: ${error.message}`);
}

export const config = {
  env: envVars.NODE_ENV as string,
  port: envVars.PORT as number,
  redis: {
    url: (envVars.REDIS_URL as string) || '',
    host: envVars.REDIS_HOST as string,
    port: envVars.REDIS_PORT as number,
    password: (envVars.REDIS_PASSWORD as string) || undefined,
  },
  workerConcurrency: envVars.WORKER_CONCURRENCY as number,
  smtp: {
    host: envVars.SMTP_HOST as string,
    port: envVars.SMTP_PORT as number,
    user: envVars.SMTP_USER as string,
    pass: envVars.SMTP_PASS as string,
    from: envVars.MAIL_FROM as string,
  },
};

export default config;
