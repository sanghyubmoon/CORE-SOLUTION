import { Router } from 'express';
import { StoryboardController } from '../controllers/storyboard.controller';
import { validateRequest } from '../middleware/validateRequest';
import { createStoryboardSchema, updateStoryboardSchema } from '../validators/storyboard.validator';

const router = Router();
const storyboardController = new StoryboardController();

// 스토리보드 생성
router.post('/create',
  validateRequest(createStoryboardSchema),
  storyboardController.createStoryboard
);

// 스토리보드 조회
router.get('/:id',
  storyboardController.getStoryboard
);

// 스토리보드 수정
router.put('/:id',
  validateRequest(updateStoryboardSchema),
  storyboardController.updateStoryboard
);

export default router;