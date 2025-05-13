import { OpenAIService } from './openai.service';
import { prisma } from '../db/prisma';

interface CreateStoryboardParams {
  contentId: string;
  title: string;
  description?: string;
  duration: number;
  platform: string;
}

export class StoryboardService {
  private openAIService: OpenAIService;

  constructor() {
    this.openAIService = new OpenAIService();
  }

  async createStoryboard(params: CreateStoryboardParams) {
    const { contentId, title, description, duration, platform } = params;

    // Get content details if available
    const content = await prisma.content.findUnique({
      where: { id: contentId }
    });

    const prompt = `
      Create a detailed storyboard for a ${duration}-second ${platform} video:
      Title: "${title}"
      ${description ? `Description: ${description}` : ''}
      ${content ? `Topic: ${content.topic}` : ''}
      
      For each scene, provide:
      1. Scene number and duration
      2. Visual description
      3. Audio/dialogue
      4. Camera angle and movement
      5. Transition to next scene
      6. Props/effects needed
      
      Format as JSON with scenes array.
    `;

    const response = await this.openAIService.generateResponse(prompt);
    const scenes = JSON.parse(response);

    // Save storyboard to database
    const storyboard = await prisma.storyboard.create({
      data: {
        contentId,
        title,
        description,
        duration,
        platform,
        scenes: scenes
      }
    });

    return storyboard;
  }

  async getStoryboard(id: string) {
    return await prisma.storyboard.findUnique({
      where: { id },
      include: {
        content: true
      }
    });
  }

  async updateStoryboard(id: string, updates: any) {
    return await prisma.storyboard.update({
      where: { id },
      data: updates
    });
  }
}