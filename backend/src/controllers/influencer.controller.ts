import { Request, Response, NextFunction } from 'express';
import { InfluencerService } from '../services/influencer.service';
import { logger } from '../utils/logger';

export class InfluencerController {
  private influencerService: InfluencerService;

  constructor() {
    this.influencerService = new InfluencerService();
  }

  searchInfluencers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const searchParams = req.query;
      
      const influencers = await this.influencerService.searchInfluencers(searchParams);

      res.json({
        status: 'success',
        data: influencers
      });
    } catch (error) {
      logger.error('Error searching influencers:', error);
      next(error);
    }
  };

  getInfluencerDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      const influencer = await this.influencerService.getInfluencerDetails(id);

      if (!influencer) {
        return res.status(404).json({
          status: 'error',
          message: 'Influencer not found'
        });
      }

      res.json({
        status: 'success',
        data: influencer
      });
    } catch (error) {
      logger.error('Error getting influencer details:', error);
      next(error);
    }
  };

  recommendInfluencers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contentType, targetAudience, platform, budget, engagementRateMin } = req.body;
      
      const recommendations = await this.influencerService.recommendInfluencers({
        contentType,
        targetAudience,
        platform,
        budget,
        engagementRateMin
      });

      res.json({
        status: 'success',
        data: recommendations
      });
    } catch (error) {
      logger.error('Error recommending influencers:', error);
      next(error);
    }
  };
}