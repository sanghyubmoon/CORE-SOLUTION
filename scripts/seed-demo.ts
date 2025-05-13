import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seedDemoData() {
  console.log('🌱 Seeding demo data...');

  // Create demo influencers
  const influencerCount = 50;
  const platforms = ['tiktok', 'instagram', 'youtube'];
  const categories = ['tech', 'beauty', 'food', 'fitness', 'travel', 'lifestyle', 'fashion', 'gaming'];

  for (let i = 0; i < influencerCount; i++) {
    const followerCount = faker.number.int({ min: 10000, max: 1000000 });
    const engagementRate = faker.number.float({ min: 1, max: 15, precision: 0.1 });
    
    const influencer = await prisma.influencer.create({
      data: {
        name: faker.person.fullName(),
        bio: faker.lorem.sentence({ min: 10, max: 20 }),
        platforms: faker.helpers.arrayElements(platforms, { min: 1, max: 3 }),
        categories: faker.helpers.arrayElements(categories, { min: 1, max: 3 }),
        followers: followerCount,
        engagementRate: engagementRate,
        email: faker.internet.email(),
      }
    });

    // Add metrics
    await prisma.influencerMetrics.create({
      data: {
        influencerId: influencer.id,
        avgViews: Math.floor(followerCount * faker.number.float({ min: 0.1, max: 0.3 })),
        avgLikes: Math.floor(followerCount * faker.number.float({ min: 0.05, max: 0.15 })),
        avgComments: Math.floor(followerCount * faker.number.float({ min: 0.01, max: 0.05 })),
        avgShares: Math.floor(followerCount * faker.number.float({ min: 0.005, max: 0.02 })),
        growthRate: faker.number.float({ min: -5, max: 20, precision: 0.1 }),
        demographics: {
          age: {
            '13-17': faker.number.int({ min: 5, max: 20 }),
            '18-24': faker.number.int({ min: 20, max: 40 }),
            '25-34': faker.number.int({ min: 20, max: 40 }),
            '35-44': faker.number.int({ min: 10, max: 25 }),
            '45+': faker.number.int({ min: 5, max: 15 })
          },
          gender: {
            male: faker.number.int({ min: 30, max: 70 }),
            female: faker.number.int({ min: 30, max: 70 }),
            other: faker.number.int({ min: 0, max: 5 })
          },
          location: {
            'US': faker.number.int({ min: 20, max: 50 }),
            'EU': faker.number.int({ min: 10, max: 30 }),
            'Asia': faker.number.int({ min: 10, max: 30 }),
            'Other': faker.number.int({ min: 5, max: 20 })
          }
        }
      }
    });
  }

  // Create demo content
  const contentCount = 20;
  const tones = ['funny', 'serious', 'educational', 'inspiring'];
  
  for (let i = 0; i < contentCount; i++) {
    const content = await prisma.content.create({
      data: {
        topic: faker.company.catchPhrase(),
        platform: faker.helpers.arrayElement(platforms),
        targetAudience: faker.helpers.arrayElement(['Gen Z', 'Millennials', 'Gen X', 'All ages']),
        tone: faker.helpers.arrayElement(tones),
        duration: faker.helpers.arrayElement([15, 30, 60, 90, 120]),
        ideas: [
          {
            title: faker.lorem.sentence({ min: 5, max: 10 }),
            hook: faker.lorem.sentence({ min: 10, max: 20 }),
            mainPoints: faker.lorem.sentences(3).split('. '),
            callToAction: faker.lorem.sentence({ min: 5, max: 10 }),
            engagementPotential: faker.number.int({ min: 5, max: 10 })
          }
        ]
      }
    });

    // Create storyboard for some content
    if (i % 2 === 0) {
      await prisma.storyboard.create({
        data: {
          contentId: content.id,
          title: faker.lorem.sentence({ min: 5, max: 10 }),
          description: faker.lorem.paragraph(),
          duration: content.duration || 30,
          platform: content.platform,
          scenes: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, (_, index) => ({
            sceneNumber: index + 1,
            duration: faker.number.int({ min: 3, max: 10 }),
            visualDescription: faker.lorem.sentence({ min: 10, max: 20 }),
            audioDialogue: faker.lorem.sentence({ min: 5, max: 15 }),
            cameraAngle: faker.helpers.arrayElement(['wide', 'medium', 'close-up', 'POV']),
            transition: faker.helpers.arrayElement(['cut', 'fade', 'swipe', 'zoom']),
            propsEffects: faker.lorem.words(3).split(' ')
          }))
        }
      });
    }
  }

  console.log('✅ Demo data seeded successfully!');
}

seedDemoData()
  .catch((e) => {
    console.error('Error seeding demo data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });