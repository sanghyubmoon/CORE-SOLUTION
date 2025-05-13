import request from 'supertest';
import app from '../index';
import { prisma } from '../db/prisma';

jest.mock('../services/openai.service');

describe('Content API', () => {
  beforeEach(async () => {
    await prisma.content.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/content/ideas', () => {
    it('should generate content ideas', async () => {
      const response = await request(app)
        .post('/api/content/ideas')
        .send({
          topic: 'Test Topic',
          platform: 'tiktok',
          targetAudience: 'Gen Z',
          tone: 'funny'
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toHaveProperty('contentId');
      expect(response.body.data).toHaveProperty('ideas');
    });

    it('should return 400 for invalid input', async () => {
      const response = await request(app)
        .post('/api/content/ideas')
        .send({
          // Missing required field 'topic'
          platform: 'tiktok'
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });
});