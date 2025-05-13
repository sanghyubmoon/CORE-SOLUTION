import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Sample influencers
  const influencers = [
    {
      name: '테크 크리에이터',
      bio: 'IT/테크 콘텐츠 전문 크리에이터',
      platforms: ['youtube', 'instagram'],
      categories: ['tech', 'education'],
      followers: 150000,
      engagementRate: 4.5,
      email: 'tech@example.com'
    },
    {
      name: '뷰티 인플루언서',
      bio: 'K-뷰티 전문가',
      platforms: ['instagram', 'tiktok'],
      categories: ['beauty', 'lifestyle'],
      followers: 250000,
      engagementRate: 7.2,
      email: 'beauty@example.com'
    },
    {
      name: '음식 크리에이터',
      bio: '맛집 리뷰 및 요리 콘텐츠',
      platforms: ['youtube', 'tiktok'],
      categories: ['food', 'lifestyle'],
      followers: 180000,
      engagementRate: 5.8,
      email: 'food@example.com'
    },
    {
      name: '피트니스 코치',
      bio: '홈트레이닝 전문가',
      platforms: ['instagram', 'youtube'],
      categories: ['fitness', 'health'],
      followers: 120000,
      engagementRate: 6.3,
      email: 'fitness@example.com'
    },
    {
      name: '여행 블로거',
      bio: '국내외 여행지 추천',
      platforms: ['instagram', 'tiktok', 'youtube'],
      categories: ['travel', 'lifestyle'],
      followers: 200000,
      engagementRate: 5.5,
      email: 'travel@example.com'
    }
  ];

  // Create influencers
  for (const influencer of influencers) {
    const created = await prisma.influencer.create({
      data: influencer
    });

    // Add metrics for each influencer
    await prisma.influencerMetrics.create({
      data: {
        influencerId: created.id,
        avgViews: Math.floor(created.followers * 0.1),
        avgLikes: Math.floor(created.followers * 0.05),
        avgComments: Math.floor(created.followers * 0.01),
        avgShares: Math.floor(created.followers * 0.005),
        growthRate: Math.random() * 10,
        demographics: {
          age: {
            '18-24': 30,
            '25-34': 45,
            '35-44': 20,
            '45+': 5
          },
          gender: {
            male: 40,
            female: 60
          }
        }
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });