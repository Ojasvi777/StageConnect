"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { Role, TalentCategory } from "./enums";

/**
 * Get all talent profiles for employers to browse
 * @returns List of talent profiles with basic information
 */
export async function getAllTalentProfiles() {
  try {
    const talents = await prisma.profile.findMany({
      where: {
        role: Role.talent,
        visibility: "public",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            portfolioItems: {
              where: {
                is_featured: true,
              },
              take: 3,
              orderBy: {
                uploaded_at: "desc",
              },
              select: {
                portfolio_id: true,
                media_type: true,
                media_url: true,
                thumbnail_url: true,
              },
            },
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    // Convert Decimal fields to numbers for client compatibility
    const serializedTalents = talents.map((talent: any) => ({
      ...talent,
      height: talent.height ? Number(talent.height) : null,
      weight: talent.weight ? Number(talent.weight) : null,
      hourly_rate: talent.hourly_rate ? Number(talent.hourly_rate) : null,
    }));

    return {
      success: true,
      data: serializedTalents,
      count: serializedTalents.length,
    };
  } catch (error) {
    console.error("Error fetching talent profiles:", error);
    return {
      success: false,
      error: "Failed to fetch talent profiles",
      data: [],
      count: 0,
    };
  }
}

/**
 * Get talent profiles by category
 * @param category - The talent category to filter by
 * @returns List of talent profiles in the specified category
 */
export async function getTalentsByCategory(category: TalentCategory) {
  try {
    const talents = await prisma.profile.findMany({
      where: {
        role: Role.talent,
        visibility: "public",
        talent_category: category,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            portfolioItems: {
              where: {
                is_featured: true,
              },
              take: 3,
              orderBy: {
                uploaded_at: "desc",
              },
              select: {
                portfolio_id: true,
                media_type: true,
                media_url: true,
                thumbnail_url: true,
              },
            },
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    // Convert Decimal fields to numbers for client compatibility
    const serializedTalents = talents.map((talent: any) => ({
      ...talent,
      height: talent.height ? Number(talent.height) : null,
      weight: talent.weight ? Number(talent.weight) : null,
      hourly_rate: talent.hourly_rate ? Number(talent.hourly_rate) : null,
    }));

    return {
      success: true,
      data: serializedTalents,
      count: serializedTalents.length,
    };
  } catch (error) {
    console.error("Error fetching talents by category:", error);
    return {
      success: false,
      error: "Failed to fetch talents by category",
      data: [],
      count: 0,
    };
  }
}

/**
 * Get detailed profile of a specific talent
 * @param userId - The user ID of the talent
 * @returns Detailed talent profile
 */
export async function getTalentProfileDetails(userId: string) {
  try {
    const talent = await prisma.profile.findUnique({
      where: {
        user_id: userId,
        role: Role.talent,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            experiences: {
              orderBy: {
                start_date: "desc",
              },
            },
            educations: {
              orderBy: {
                start_date: "desc",
              },
            },
            portfolioItems: {
              orderBy: [
                { is_featured: "desc" },
                { display_order: "asc" },
                { uploaded_at: "desc" },
              ],
            },
          },
        },
      },
    });

    if (!talent) {
      return {
        success: false,
        error: "Talent profile not found",
      };
    }

    return {
      success: true,
      data: talent,
    };
  } catch (error) {
    console.error("Error fetching talent profile details:", error);
    return {
      success: false,
      error: "Failed to fetch talent profile details",
    };
  }
}
