import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifySeededData() {
  console.log('🔍 Verifying seeded data...\n');

  try {
    // Count all records
    const [
      usersCount,
      profilesCount,
      experiencesCount,
      educationsCount,
      portfolioCount,
      jobsCount,
      auditionsCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.profile.count(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.portfolioItem.count(),
      prisma.job.count(),
      prisma.audition.count(),
    ]);

    console.log('📊 Record Counts:');
    console.log(`  Users:          ${usersCount}`);
    console.log(`  Profiles:       ${profilesCount}`);
    console.log(`  Experiences:    ${experiencesCount}`);
    console.log(`  Educations:     ${educationsCount}`);
    console.log(`  Portfolio:      ${portfolioCount}`);
    console.log(`  Jobs:           ${jobsCount}`);
    console.log(`  Auditions:      ${auditionsCount}\n`);

    // Get talent users with profiles
    const talentUsers = await prisma.user.findMany({
      where: {
        profile: {
          role: 'talent',
        },
      },
      include: {
        profile: true,
        portfolioItems: true,
        auditions: true,
      },
    });

    console.log('🎭 Talent Users:');
    talentUsers.forEach((user: any, index: number) => {
      console.log(
        `  ${index + 1}. ${user.name} (${user.profile?.talent_category}) - ${user.email}`
      );
      console.log(`     Portfolio: ${user.portfolioItems.length} items`);
      console.log(`     Auditions: ${user.auditions.length} applications`);
    });

    // Get employer users
    const employerUsers = await prisma.user.findMany({
      where: {
        profile: {
          role: 'employer',
        },
      },
      include: {
        profile: true,
      },
    });

    console.log('\n🏢 Employer Users:');
    employerUsers.forEach((user: any, index: number) => {
      console.log(
        `  ${index + 1}. ${user.profile?.company_name} - ${user.email}`
      );
      console.log(`     Industry: ${user.profile?.industry}`);
    });

    // Get active jobs with audition counts
    const activeJobs = await prisma.job.findMany({
      where: {
        status: 'active',
      },
      include: {
        profile: {
          include: {
            user: true,
          },
        },
        _count: {
          select: {
            auditions: true,
          },
        },
      },
      orderBy: {
        application_deadline: 'asc',
      },
    });

    console.log('\n💼 Active Jobs:');
    activeJobs.forEach((job: any, index: number) => {
      console.log(
        `  ${index + 1}. ${job.title} (${job.talent_category})`
      );
      console.log(
        `     Employer: ${job.profile.company_name || job.profile.user.name}`
      );
      console.log(`     Location: ${job.city}, ${job.state}`);
      console.log(`     Applications: ${job._count.auditions}`);
      console.log(
        `     Deadline: ${job.application_deadline?.toLocaleDateString()}`
      );
    });

    // Get auditions by status
    const auditionsByStatus = await prisma.audition.groupBy({
      by: ['status'],
      _count: {
        audition_id: true,
      },
    });

    console.log('\n🎬 Auditions by Status:');
    auditionsByStatus.forEach((item: any) => {
      console.log(`  ${item.status}: ${item._count.audition_id}`);
    });

    // Get portfolio by media type
    const portfolioByType = await prisma.portfolioItem.groupBy({
      by: ['media_type'],
      _count: {
        portfolio_id: true,
      },
    });

    console.log('\n📸 Portfolio Items by Type:');
    portfolioByType.forEach((item: any) => {
      console.log(`  ${item.media_type}: ${item._count.portfolio_id}`);
    });

    // Featured portfolio items
    const featuredCount = await prisma.portfolioItem.count({
      where: {
        is_featured: true,
      },
    });

    console.log(`  Featured items: ${featuredCount}`);

    console.log('\n✅ Data verification complete!');
    console.log('\n💡 Tip: Run "npx prisma studio" to browse the data visually');
  } catch (error) {
    console.error('❌ Error verifying data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifySeededData();
