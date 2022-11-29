import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
  enable_offline_queue: false,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 5,
  duration: 1,
});

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  limiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Atingiu o limite de requisições por segundo');
    });
};
