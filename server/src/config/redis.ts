import Redis from 'ioredis';
import { env } from './env';
import logger from '../utils/logger';

/**
 * Shared Redis connection + thin cache helpers.
 *
 * Designed to degrade gracefully: if Redis is unreachable the app keeps
 * running and cache calls become no-ops (cache miss). This keeps local
 * development friction-free while giving production a real cache + the
 * backing store for the BullMQ notification queue.
 */
let client: Redis | null = null;

export const getRedis = (): Redis | null => {
  if (client) return client;

  const options = env.redis.url
    ? env.redis.url
    : {
        host: env.redis.host,
        port: env.redis.port,
        password: env.redis.password,
      };

  try {
    client = env.redis.url
      ? new Redis(env.redis.url, { maxRetriesPerRequest: null, lazyConnect: false })
      : new Redis({ ...(options as object), maxRetriesPerRequest: null });

    client.on('connect', () => logger.info('[Redis] connected'));
    client.on('error', (err) => logger.warn(`[Redis] error: ${err.message}`));
    return client;
  } catch (error) {
    logger.warn(`[Redis] failed to initialise, caching disabled: ${error}`);
    return null;
  }
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const redis = getRedis();
  if (!redis) return null;
  try {
    const raw = await redis.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    logger.warn(`[Redis] getCache miss for ${key}: ${error}`);
    return null;
  }
};

export const setCache = async (
  key: string,
  value: unknown,
  ttlSeconds: number = env.redis.cacheTtlSeconds,
): Promise<void> => {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
  } catch (error) {
    logger.warn(`[Redis] setCache failed for ${key}: ${error}`);
  }
};

/** Invalidate every key matching a glob pattern, e.g. `packages:*`. */
export const invalidateCache = async (pattern: string): Promise<void> => {
  const redis = getRedis();
  if (!redis) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length) await redis.del(...keys);
  } catch (error) {
    logger.warn(`[Redis] invalidateCache failed for ${pattern}: ${error}`);
  }
};
