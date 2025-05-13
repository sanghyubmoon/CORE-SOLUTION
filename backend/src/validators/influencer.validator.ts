import Joi from 'joi';

export const searchInfluencerSchema = Joi.object({
  query: Joi.string().optional(),
  platform: Joi.string().valid('tiktok', 'instagram', 'youtube').optional(),
  category: Joi.string().optional(),
  minFollowers: Joi.number().min(0).optional(),
  maxFollowers: Joi.number().min(0).optional(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(10)
});

export const recommendInfluencerSchema = Joi.object({
  contentType: Joi.string().required(),
  targetAudience: Joi.string().required(),
  platform: Joi.string().valid('tiktok', 'instagram', 'youtube').required(),
  budget: Joi.number().min(0).optional(),
  engagementRateMin: Joi.number().min(0).max(100).optional()
});