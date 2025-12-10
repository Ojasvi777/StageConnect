import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedBlogs() {
  try {
    console.log("🌱 Seeding blog data...");

    // Get first user to use as author
    const users = await prisma.user.findMany({ take: 2 });
    
    if (users.length === 0) {
      console.log("❌ No users found. Please create users first.");
      return;
    }

    const author1 = users[0];
    const author2 = users.length > 1 ? users[1] : users[0];

    // Create sample blogs
    const blog1 = await prisma.blog.create({
      data: {
        author_id: author1.id,
        title: "How I cracked my first film audition",
        content:
          "Being consistent and attending local theatre events helped me so much! I learned that networking is just as important as talent. Always be prepared with your monologues and stay confident.",
        category: "acting",
        published: true,
      },
    });

    const blog2 = await prisma.blog.create({
      data: {
        author_id: author2.id,
        title: "Choreography tips for beginners 🔥",
        content:
          "Always start with body control and footwork drills. Master the basics before moving to complex routines. Practice in front of a mirror and record yourself to see what needs improvement.",
        category: "dancing",
        published: true,
      },
    });

    const blog3 = await prisma.blog.create({
      data: {
        author_id: author1.id,
        title: "My journey in the modeling industry",
        content:
          "Starting as a model wasn't easy, but with persistence and the right portfolio, I landed my first contract. Here are my top tips for aspiring models: maintain a healthy lifestyle, network with photographers, and never give up on your dreams.",
        category: "modeling",
        published: true,
      },
    });

    const blog4 = await prisma.blog.create({
      data: {
        author_id: author2.id,
        title: "Voice acting: Finding your unique sound",
        content:
          "Voice acting is more than just reading lines. It's about bringing characters to life through your vocal expressions. Practice different accents, emotions, and character types. Record yourself daily and study professional voice actors.",
        category: "voiceover",
        published: true,
      },
    });

    const blog5 = await prisma.blog.create({
      data: {
        author_id: author1.id,
        title: "Essential photography tips for performers",
        content:
          "Good headshots can make or break your career in entertainment. Learn about lighting, angles, and how to present yourself. Work with professional photographers and build a diverse portfolio that showcases your range.",
        category: "photography",
        published: true,
      },
    });

    console.log("✅ Created 5 sample blogs");

    // Add some likes
    await prisma.blogLike.create({
      data: {
        blog_id: blog1.blog_id,
        user_id: author2.id,
      },
    });

    await prisma.blogLike.create({
      data: {
        blog_id: blog2.blog_id,
        user_id: author1.id,
      },
    });

    console.log("✅ Added sample likes");

    // Add some comments
    await prisma.blogComment.create({
      data: {
        blog_id: blog1.blog_id,
        user_id: author2.id,
        content: "Great advice! This really helped me prepare for my audition.",
      },
    });

    await prisma.blogComment.create({
      data: {
        blog_id: blog2.blog_id,
        user_id: author1.id,
        content: "Thanks for sharing! I've been struggling with footwork.",
      },
    });

    await prisma.blogComment.create({
      data: {
        blog_id: blog1.blog_id,
        user_id: author1.id,
        content:
          "Another tip: always be on time and professional. It goes a long way!",
      },
    });

    console.log("✅ Added sample comments");
    console.log("🎉 Blog seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding blog data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedBlogs()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
