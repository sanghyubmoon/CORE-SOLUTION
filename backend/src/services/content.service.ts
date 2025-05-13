import { OpenAIService } from './openai.service';
import { prisma } from '../db/prisma';

interface CreateContentParams {
  topic: string;
  platform: string;
  targetAudience?: string;
  tone?: string;
  duration?: number;
}

interface TrendParams {
  platform: string;
  category?: string;
  region?: string;
}

export class ContentService {
  private openAIService: OpenAIService;

  constructor() {
    this.openAIService = new OpenAIService();
  }

  async generateIdeas(params: CreateContentParams) {
    const { topic, platform, targetAudience, tone, duration } = params;

    const prompt = `
      Generate 5 creative short-form content ideas for ${platform} about "${topic}".
      ${targetAudience ? `Target audience: ${targetAudience}` : ''}
      ${tone ? `Tone: ${tone}` : ''}
      ${duration ? `Duration: ${duration} seconds` : ''}
      
      For each idea, provide:
      1. Title
      2. Hook (first 3 seconds)
      3. Main content points
      4. Call to action
      5. Estimated engagement potential (1-10)
      
      Format as JSON array.
    `;

    const response = await this.openAIService.generateResponse(prompt);
    const ideas = JSON.parse(response);

    // Save to database for future reference
    const savedContent = await prisma.content.create({
      data: {
        topic,
        platform,
        targetAudience,
        tone,
        duration,
        ideas: ideas
      }
    });

    return {
      contentId: savedContent.id,
      ideas
    };
  }

  async analyzeTrends(params: TrendParams) {
    const { platform, category, region } = params;

    const prompt = `
      Analyze current trends for ${platform} content
      ${category ? `in the ${category} category` : ''}
      ${region ? `for ${region} region` : ''}.
      
      Provide:
      1. Top 5 trending topics
      2. Popular hashtags
      3. Optimal posting times
      4. Content format recommendations
      5. Engagement tips
      
      Format as JSON.
    `;

    const response = await this.openAIService.generateResponse(prompt);
    return JSON.parse(response);
  }

  async recommendKeywords(params: { platform?: string; category?: string }) {
    const { platform, category } = params;

    const prompt = `
      Recommend keywords and hashtags for short-form content
      ${platform ? `on ${platform}` : ''}
      ${category ? `in the ${category} category` : ''}.
      
      Provide:
      1. 10 primary keywords
      2. 20 related hashtags
      3. SEO tips for each platform
      
      Format as JSON.
    `;

    const response = await this.openAIService.generateResponse(prompt);
    return JSON.parse(response);
  }
}