import rateLimit from 'express-rate-limit';
import { config } from '../config';

export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: 'Too many requests from this IP, please try again later.'
});

export const aiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: Math.floor(config.rateLimit.max / 10), // 1/10th of general limit
  message: 'Too many AI requests from this IP, please try again later.',
  skip: (req) => {
    // Skip rate limiting for authenticated premium users
    return req.user?.isPremium === true;
  }
});