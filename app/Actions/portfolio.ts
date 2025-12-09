"use server";

import { prisma } from "@/lib/prisma";
import { MediaType } from "./enums";
import { revalidatePath } from "next/cache";

/**
 * Get all portfolio items for a user
 * @param userId - The ID of the user
 * @returns Array of portfolio items
 */
export async function getUserPortfolio(userId: string) {
  try {
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: {
        user_id: userId,
      },
      orderBy: [
        {
          is_featured: "desc",
        },
        {
          display_order: "asc",
        },
        {
          uploaded_at: "desc",
        },
      ],
    });

    return { success: true, data: portfolioItems };
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return { success: false, error: "Failed to fetch portfolio" };
  }
}

/**
 * Get portfolio item by ID
 * @param portfolioId - The ID of the portfolio item
 * @returns Portfolio item details
 */
export async function getPortfolioItemById(portfolioId: string) {
  try {
    const portfolioItem = await prisma.portfolioItem.findUnique({
      where: {
        portfolio_id: portfolioId,
      },
    });

    if (!portfolioItem) {
      return { success: false, error: "Portfolio item not found" };
    }

    return { success: true, data: portfolioItem };
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
    return { success: false, error: "Failed to fetch portfolio item" };
  }
}

/**
 * Get featured portfolio items for a user
 * @param userId - The ID of the user
 * @returns Array of featured portfolio items
 */
export async function getFeaturedPortfolio(userId: string) {
  try {
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: {
        user_id: userId,
        is_featured: true,
      },
      orderBy: {
        display_order: "asc",
      },
    });

    return { success: true, data: portfolioItems };
  } catch (error) {
    console.error("Error fetching featured portfolio:", error);
    return { success: false, error: "Failed to fetch featured portfolio" };
  }
}

/**
 * Get portfolio items by media type
 * @param userId - The ID of the user
 * @param mediaType - The type of media to filter by
 * @returns Filtered portfolio items
 */
export async function getPortfolioByMediaType(
  userId: string,
  mediaType: MediaType
) {
  try {
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: {
        user_id: userId,
        media_type: mediaType,
      },
      orderBy: {
        uploaded_at: "desc",
      },
    });

    return { success: true, data: portfolioItems };
  } catch (error) {
    console.error("Error fetching portfolio by media type:", error);
    return { success: false, error: "Failed to fetch portfolio items" };
  }
}

/**
 * Create a new portfolio item
 * @param data - Portfolio item data
 * @returns Created portfolio item
 */
export async function createPortfolioItem(data: {
  userId: string;
  title?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  mediaType: MediaType;
  fileSize?: number;
  duration?: number;
  description?: string;
  tags?: string[];
  isFeatured?: boolean;
}) {
  try {
    const portfolioItem = await prisma.portfolioItem.create({
      data: {
        user_id: data.userId,
        title: data.title,
        media_url: data.mediaUrl,
        thumbnail_url: data.thumbnailUrl,
        media_type: data.mediaType,
        file_size: data.fileSize,
        duration: data.duration,
        description: data.description,
        tags: data.tags,
        is_featured: data.isFeatured || false,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: portfolioItem };
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return { success: false, error: "Failed to create portfolio item" };
  }
}

/**
 * Update a portfolio item
 * @param portfolioId - The ID of the portfolio item
 * @param data - Updated portfolio item data
 * @returns Updated portfolio item
 */
export async function updatePortfolioItem(
  portfolioId: string,
  data: {
    title?: string;
    description?: string;
    tags?: string[];
    isFeatured?: boolean;
    displayOrder?: number;
  }
) {
  try {
    const portfolioItem = await prisma.portfolioItem.update({
      where: {
        portfolio_id: portfolioId,
      },
      data: {
        title: data.title,
        description: data.description,
        tags: data.tags,
        is_featured: data.isFeatured,
        display_order: data.displayOrder,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: portfolioItem };
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    return { success: false, error: "Failed to update portfolio item" };
  }
}

/**
 * Delete a portfolio item
 * @param portfolioId - The ID of the portfolio item
 * @returns Success status
 */
export async function deletePortfolioItem(portfolioId: string) {
  try {
    await prisma.portfolioItem.delete({
      where: {
        portfolio_id: portfolioId,
      },
    });

    revalidatePath("/Profile");
    return { success: true, message: "Portfolio item deleted successfully" };
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return { success: false, error: "Failed to delete portfolio item" };
  }
}
