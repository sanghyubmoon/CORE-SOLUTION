import { Request, Response, NextFunction } from 'express';
import { StoryboardService } from '../services/storyboard.service';
import { logger } from '../utils/logger';

export class StoryboardController {
  private storyboardService: StoryboardService;

  constructor() {
    this.storyboardService = new StoryboardService();
  }

  createStoryboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { contentId, title, description, duration, platform } = req.body;
      
      const storyboard = await this.storyboardService.createStoryboard({
        contentId,
        title,
        description,
        duration,
        platform
      });

      res.status(201).json({
        status: 'success',
        data: storyboard
      });
    } catch (error) {
      logger.error('Error creating storyboard:', error);
      next(error);
    }
  };

  getStoryboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      
      const storyboard = await this.storyboardService.getStoryboard(id);

      if (!storyboard) {
        return res.status(404).json({
          status: 'error',
          message: 'Storyboard not found'
        });
      }

      res.json({
        status: 'success',
        data: storyboard
      });
    } catch (error) {
      logger.error('Error getting storyboard:', error);
      next(error);
    }
  };

  updateStoryboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const storyboard = await this.storyboardService.updateStoryboard(id, updates);

      if (!storyboard) {
        return res.status(404).json({
          status: 'error',
          message: 'Storyboard not found'
        });
      }

      res.json({
        status: 'success',
        data: storyboard
      });
    } catch (error) {
      logger.error('Error updating storyboard:', error);
      next(error);
    }
  };
}