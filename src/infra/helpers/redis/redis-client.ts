import Logger from '../log/logger';
import { config } from '../../../config/config';

const Redis = require('ioredis');

export default class RedisClient {
  private logger = Logger.getInstance();

  private redisClient: any;

  private static redisClienInstance: RedisClient;

  constructor(configConection: any) {
    this.redisClient = new Redis(
      configConection.nodes,
      Object.assign(
        {},
        { this: RedisClient.retryStrategy(configConection) },
        configConection.options
      )
    );

    this.redisClient.on('error', (err: any) =>
      this.logger.error(`[RedisClient] - constructor - Redis client error: ${err.message}`, err)
    );
  }

  static getInstance() {
    if (this.redisClienInstance === undefined) {
      this.redisClienInstance = new RedisClient(config.redis);
    }

    return this.redisClienInstance;
  }

  static retryStrategy(options: any): number {
    return Math.min(options.attempt * 200, 10000);
  }

  setValueEx(key: string, value: any, ttl: number) {
    this.logger.debug(`[RedisClient] - setValueEx - caching key ${key}`);
    return this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
  }

  getValue(key: string) {
    this.logger.debug(`[RedisClient] - getValue - caching key ${key}`);
    return this.redisClient.get(`${key}`);
  }
}
