import { Request, Response, NextFunction } from 'express';
import { ContentService } from '../services/content.service';
import { logger } from '../utils/logger';

export class ContentController {
  private contentService: ContentService;

  constructor() {
    this.contentService = new ContentService();
  }

  generateIdeas = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { topic, platform, targetAudience, tone, duration } = req.body;
      
      const ideas = await this.contentService.generateIdeas({
        topic,
        platform,
        targetAudience,
        tone,
        duration
      });

      res.json({
        status: 'success',
        data: ideas
      });
    } catch (error) {
      logger.error('Error generating content ideas:', error);
      next(error);
    }
  };

  analyzeTrends = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platform, category, region } = req.body;
      
      const trends = await this.contentService.analyzeTrends({
        platform,
        category,
        region
      });

      res.json({
        status: 'success',
        data: trends
      });
    } catch (error) {
      logger.error('Error analyzing trends:', error);
      next(error);
    }
  };

  recommendKeywords = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { platform, category } = req.query;
      
      const keywords = await this.contentService.recommendKeywords({
        platform: platform as string,
        category: category as string
      });

      res.json({
        status: 'success',
        data: keywords
      });
    } catch (error) {
      logger.error('Error recommending keywords:', error);
      next(error);
    }
  };
}