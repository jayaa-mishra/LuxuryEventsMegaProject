import { ConnectionOptions } from 'bullmq';
import config from './serverConfig';

/**
 * BullMQ connection options. BullMQ manages its own ioredis clients internally,
 * so we only expose the connection descriptor here (shared by queue + worker).
 */
export const redisConnection: ConnectionOptions = config.redis.url
  ? ({ url: config.redis.url } as ConnectionOptions)
  : {
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
    };
