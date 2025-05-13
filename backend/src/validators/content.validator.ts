import Joi from 'joi';

export const createContentSchema = Joi.object({
  topic: Joi.string().required().min(3).max(200),
  platform: Joi.string().valid('tiktok', 'instagram', 'youtube').required(),
  targetAudience: Joi.string().optional(),
  tone: Joi.string().valid('funny', 'serious', 'educational', 'inspiring').optional(),
  duration: Joi.number().min(15).max(180).optional()
});

export const trendingSchema = Joi.object({
  platform: Joi.string().valid('tiktok', 'instagram', 'youtube').required(),
  category: Joi.string().optional(),
  region: Joi.string().optional()
});