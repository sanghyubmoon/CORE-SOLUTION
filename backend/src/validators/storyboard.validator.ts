import Joi from 'joi';

export const createStoryboardSchema = Joi.object({
  contentId: Joi.string().required(),
  title: Joi.string().required().min(3).max(200),
  description: Joi.string().optional(),
  duration: Joi.number().min(15).max(180).required(),
  platform: Joi.string().valid('tiktok', 'instagram', 'youtube').required()
});

export const updateStoryboardSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  description: Joi.string().optional(),
  scenes: Joi.array().items(Joi.object({
    order: Joi.number().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    cameraAngle: Joi.string().optional(),
    transition: Joi.string().optional()
  })).optional()
});