"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Blog category type - must match Prisma enum
type BlogCategory = 
  | "acting"
  | "dancing"
  | "singing"
  | "modeling"
  | "voiceover"
  | "photography"
  | "tips"
  | "experience"
  | "industry_news"
  | "other";

// Get all blogs with author info, like count, and comment count
export async function getBlogs(params?: {
  category?: BlogCategory;
  search?: string;
  sortBy?: "newest" | "trending";
  limit?: number;
}) {
  try {
    const { category, search, sortBy = "newest", limit } = params || {};

    const where: any = {
      published: true,
    };

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const orderBy: any =
      sortBy === "trending"
        ? { likes: { _count: "desc" } }
        : { created_at: "desc" };

    const blogs = await prisma.blog.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            profile: {
              select: {
                role: true,
                talent_category: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    // Get current user's likes if logged in
    const session = await getServerSession(authOptions);
    let userLikes: string[] = [];

    if (session?.user) {
      const likes = await prisma.blogLike.findMany({
        where: {
          user_id: (session.user as any).id,
          blog_id: { in: blogs.map((b: any) => b.blog_id) },
        },
        select: { blog_id: true },
      });
      userLikes = likes.map((l: any) => l.blog_id);
    }

    return {
      success: true,
      blogs: blogs.map((blog: any) => ({
        id: blog.blog_id,
        title: blog.title,
        content: blog.content,
        category: blog.category,
        image: blog.image_url,
        author: {
          id: blog.author.id,
          name: blog.author.name || "Anonymous",
          image: blog.author.image,
          role:
            blog.author.profile?.role === "talent"
              ? blog.author.profile?.talent_category || "talent"
              : "employer",
        },
        likes: blog._count.likes,
        comments: blog._count.comments,
        liked: userLikes.includes(blog.blog_id),
        createdAt: blog.created_at,
      })),
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, error: "Failed to fetch blogs" };
  }
}

// Create a new blog post
export async function createBlog(data: {
  title: string;
  content: string;
  category: BlogCategory;
  image_url?: string;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = (session.user as any).id;

    if (!data.title?.trim() || !data.content?.trim()) {
      return { success: false, error: "Title and content are required" };
    }

    const blog = await prisma.blog.create({
      data: {
        author_id: userId,
        title: data.title.trim(),
        content: data.content.trim(),
        category: data.category,
        image_url: data.image_url,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            profile: {
              select: {
                role: true,
                talent_category: true,
              },
            },
          },
        },
      },
    });

    revalidatePath("/Blog");

    return {
      success: true,
      blog: {
        id: blog.blog_id,
        title: blog.title,
        content: blog.content,
        category: blog.category,
        image: blog.image_url,
        author: {
          id: blog.author.id,
          name: blog.author.name || "Anonymous",
          image: blog.author.image,
          role:
            blog.author.profile?.role === "talent"
              ? blog.author.profile?.talent_category || "talent"
              : "employer",
        },
        likes: 0,
        comments: 0,
        liked: false,
        createdAt: blog.created_at,
      },
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

// Toggle like on a blog post
export async function toggleBlogLike(blogId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = (session.user as any).id;

    // Check if already liked
    const existingLike = await prisma.blogLike.findUnique({
      where: {
        blog_id_user_id: {
          blog_id: blogId,
          user_id: userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.blogLike.delete({
        where: {
          like_id: existingLike.like_id,
        },
      });

      const likeCount = await prisma.blogLike.count({
        where: { blog_id: blogId },
      });

      revalidatePath("/Blog");
      return { success: true, liked: false, likeCount };
    } else {
      // Like
      await prisma.blogLike.create({
        data: {
          blog_id: blogId,
          user_id: userId,
        },
      });

      const likeCount = await prisma.blogLike.count({
        where: { blog_id: blogId },
      });

      revalidatePath("/Blog");
      return { success: true, liked: true, likeCount };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

// Add a comment to a blog post
export async function addBlogComment(blogId: string, content: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const userId = (session.user as any).id;

    if (!content?.trim()) {
      return { success: false, error: "Comment cannot be empty" };
    }

    const comment = await prisma.blogComment.create({
      data: {
        blog_id: blogId,
        user_id: userId,
        content: content.trim(),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    revalidatePath("/Blog");

    return {
      success: true,
      comment: {
        id: comment.comment_id,
        content: comment.content,
        author: {
          id: comment.user.id,
          name: comment.user.name || "Anonymous",
          image: comment.user.image,
        },
        createdAt: comment.created_at,
      },
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { success: false, error: "Failed to add comment" };
  }
}

// Get comments for a blog post
export async function getBlogComments(blogId: string) {
  try {
    const comments = await prisma.blogComment.findMany({
      where: { blog_id: blogId },
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return {
      success: true,
      comments: comments.map((c: any) => ({
        id: c.comment_id,
        content: c.content,
        author: {
          id: c.user.id,
          name: c.user.name || "Anonymous",
          image: c.user.image,
        },
        createdAt: c.created_at,
      })),
    };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { success: false, error: "Failed to fetch comments" };
  }
}

// Check if user is authenticated
export async function checkAuth() {
  try {
    const session = await getServerSession(authOptions);
    return {
      success: true,
      isAuthenticated: !!session?.user,
      user: session?.user
        ? {
            id: (session.user as any).id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
          }
        : null,
    };
  } catch (error) {
    console.error("Error checking auth:", error);
    return { success: false, isAuthenticated: false, user: null };
  }
}
