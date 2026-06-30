import app from './app';
import connectDB from './config/db';
import { getRedis } from './config/redis';
import { env } from './config/env';
import logger from './utils/logger';

const startServer = async () => {
  try {
    await connectDB();
    getRedis(); // warm the Redis connection (no-op/best-effort if unavailable)

    const server = app.listen(env.port, () => {
      logger.info(`Main API running in ${env.env} mode on port ${env.port}`);
    });

    const shutdown = (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`);
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
      logger.error(`Unhandled Rejection: ${reason}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error}`);
    process.exit(1);
  }
};

startServer();
