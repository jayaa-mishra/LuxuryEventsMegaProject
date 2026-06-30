import Joi from 'joi';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URI: Joi.string().required().description('Mongo DB URL'),
  JWT_SECRET: Joi.string().required().description('JWT Secret Key'),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  // Redis / queue (optional — app degrades gracefully when absent)
  REDIS_URL: Joi.string().allow('').optional().description('redis://host:port'),
  REDIS_HOST: Joi.string().default('127.0.0.1'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  CACHE_TTL_SECONDS: Joi.number().default(300),

  CLOUDINARY_CLOUD_NAME: Joi.string().allow('').optional(),
  CLOUDINARY_API_KEY: Joi.string().allow('').optional(),
  CLOUDINARY_API_SECRET: Joi.string().allow('').optional(),
  RAZORPAY_KEY_ID: Joi.string().allow('').optional(),
  RAZORPAY_KEY_SECRET: Joi.string().allow('').optional(),
  RAZORPAY_WEBHOOK_SECRET: Joi.string().allow('').optional(),
  SMTP_HOST: Joi.string().allow('').optional(),
  SMTP_PORT: Joi.number().allow('').optional(),
  SMTP_USER: Joi.string().allow('').optional(),
  SMTP_PASS: Joi.string().allow('').optional(),

  // Downstream microservice URLs (used by the gateway / inter-service calls)
  AUTH_SERVICE_URL: Joi.string().allow('').optional(),
  NOTIFICATION_SERVICE_URL: Joi.string().allow('').optional(),

  CLIENT_URL: Joi.string().default('http://localhost:5173'),
}).unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const env = {
  env: envVars.NODE_ENV as 'development' | 'production' | 'test',
  isProd: envVars.NODE_ENV === 'production',
  port: envVars.PORT as number,
  mongoose: {
    url: envVars.MONGO_URI as string,
  },
  jwt: {
    secret: envVars.JWT_SECRET as string,
    expiresIn: envVars.JWT_EXPIRES_IN as string,
  },
  redis: {
    url: (envVars.REDIS_URL as string) || '',
    host: envVars.REDIS_HOST as string,
    port: envVars.REDIS_PORT as number,
    password: (envVars.REDIS_PASSWORD as string) || undefined,
    cacheTtlSeconds: envVars.CACHE_TTL_SECONDS as number,
  },
  smtp: {
    host: envVars.SMTP_HOST as string,
    port: envVars.SMTP_PORT as number,
    user: envVars.SMTP_USER as string,
    pass: envVars.SMTP_PASS as string,
  },
  services: {
    authUrl: (envVars.AUTH_SERVICE_URL as string) || '',
    notificationUrl: (envVars.NOTIFICATION_SERVICE_URL as string) || '',
  },
  clientUrl: envVars.CLIENT_URL as string,
};

export type Env = typeof env;
