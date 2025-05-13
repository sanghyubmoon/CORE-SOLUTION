import { createClient } from 'redis';
import { config } from '../config';
import { logger } from './logger';

const redis = createClient({
  url: config.redis.url
});

redis.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

redis.on('connect', () => {
  logger.info('Redis Client Connected');
});

// Connect to Redis
(async () => {
  try {
    await redis.connect();
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
  }
})();

export const cache = {
  async get(key: string): Promise<any> {
    try {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  },

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await redis.set(key, JSON.stringify(value), {
        EX: ttl
      });
    } catch (error) {
      logger.error(`Cache set error for key ${key}:`, error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error(`Cache delete error for key ${key}:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      await redis.flushAll();
    } catch (error) {
      logger.error('Cache clear error:', error);
    }
  }
};