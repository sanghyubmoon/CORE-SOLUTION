import { Router } from 'express';
import { InfluencerController } from '../controllers/influencer.controller';
import { validateRequest } from '../middleware/validateRequest';
import { searchInfluencerSchema, recommendInfluencerSchema } from '../validators/influencer.validator';

const router = Router();
const influencerController = new InfluencerController();

// 인플루언서 검색
router.get('/search',
  validateRequest(searchInfluencerSchema, 'query'),
  influencerController.searchInfluencers
);

// 인플루언서 상세 정보
router.get('/:id',
  influencerController.getInfluencerDetails
);

// 인플루언서 추천
router.post('/recommend',
  validateRequest(recommendInfluencerSchema),
  influencerController.recommendInfluencers
);

export default router;