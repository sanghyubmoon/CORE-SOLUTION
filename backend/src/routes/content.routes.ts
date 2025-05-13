import { Router } from 'express';
import { ContentController } from '../controllers/content.controller';
import { validateRequest } from '../middleware/validateRequest';
import { createContentSchema, trendingSchema } from '../validators/content.validator';

const router = Router();
const contentController = new ContentController();

// 콘텐츠 아이디어 생성
router.post('/ideas', 
  validateRequest(createContentSchema),
  contentController.generateIdeas
);

// 트렌드 분석
router.post('/trending', 
  validateRequest(trendingSchema),
  contentController.analyzeTrends
);

// 키워드 추천
router.get('/keywords',
  contentController.recommendKeywords
);

export default router;