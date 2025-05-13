import { OpenAIService } from './openai.service';
import { prisma } from '../db/prisma';

interface SearchParams {
  query?: string;
  platform?: string;
  category?: string;
  minFollowers?: number;
  maxFollowers?: number;
  page?: number;
  limit?: number;
}

interface RecommendParams {
  contentType: string;
  targetAudience: string;
  platform: string;
  budget?: number;
  engagementRateMin?: number;
}

export class InfluencerService {
  private openAIService: OpenAIService;

  constructor() {
    this.openAIService = new OpenAIService();
  }

  async searchInfluencers(params: SearchParams) {
    const { 
      query, 
      platform, 
      category, 
      minFollowers, 
      maxFollowers, 
      page = 1, 
      limit = 10 
    } = params;

    // Build database query
    const where: any = {};
    
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } }
      ];
    }
    
    if (platform) where.platforms = { has: platform };
    if (category) where.categories = { has: category };
    if (minFollowers) where.followers = { gte: minFollowers };
    if (maxFollowers) where.followers = { lte: maxFollowers };

    const influencers = await prisma.influencer.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { followers: 'desc' }
    });

    const total = await prisma.influencer.count({ where });

    return {
      influencers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getInfluencerDetails(id: string) {
    return await prisma.influencer.findUnique({
      where: { id },
      include: {
        metrics: true,
        campaigns: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async recommendInfluencers(params: RecommendParams) {
    const { contentType, targetAudience, platform, budget, engagementRateMin } = params;

    // Use AI to determine best matching criteria
    const prompt = `
      Recommend influencer characteristics for:
      Content Type: ${contentType}
      Target Audience: ${targetAudience}
      Platform: ${platform}
      ${budget ? `Budget: $${budget}` : ''}
      ${engagementRateMin ? `Minimum Engagement Rate: ${engagementRateMin}%` : ''}
      
      Provide:
      1. Ideal follower range
      2. Key categories
      3. Content style preferences
      4. Audience demographics
      5. Expected ROI
      
      Format as JSON.
    `;

    const response = await this.openAIService.generateResponse(prompt);
    const criteria = JSON.parse(response);

    // Find matching influencers from database
    const where: any = {
      platforms: { has: platform }
    };

    if (criteria.followerRange) {
      where.followers = {
        gte: criteria.followerRange.min,
        lte: criteria.followerRange.max
      };
    }

    if (criteria.categories) {
      where.categories = { hasSome: criteria.categories };
    }

    if (engagementRateMin) {
      where.engagementRate = { gte: engagementRateMin };
    }

    const influencers = await prisma.influencer.findMany({
      where,
      take: 10,
      orderBy: [
        { engagementRate: 'desc' },
        { followers: 'desc' }
      ]
    });

    return {
      criteria,
      recommendations: influencers
    };
  }
}