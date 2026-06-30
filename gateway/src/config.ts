import dotenv from 'dotenv';
dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 8080,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  services: {
    main: process.env.MAIN_API_URL || 'http://localhost:5000',
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:5001',
    notification: process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:5002',
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 300,
  },
};

export default config;
