"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { AuditionStatus } from "./enums";
import { revalidatePath } from "next/cache";

/**
 * Get all auditions for a specific user
 * Note: Authentication is handled by the (protected) layout
 * @param userId - The ID of the user
 * @returns Array of auditions with job and portfolio details
 */
export async function getUserAuditions(userId: string) {
  try {
    const auditions = await prisma.audition.findMany({
      where: {
        user_id: userId,
      },
      include: {
        job: {
          include: {
            profile: {
              select: {
                company_name: true,
                contact_person_name: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        portfolio: {
          select: {
            title: true,
            media_url: true,
            media_type: true,
            thumbnail_url: true,
          },
        },
      },
      orderBy: {
        submitted_at: "desc",
      },
    });

    return { success: true, data: auditions };
  } catch (error) {
    console.error("Error fetching user auditions:", error);
    return { success: false, error: "Failed to fetch auditions" };
  }
}

/**
 * Get a single audition by ID
 * @param auditionId - The ID of the audition
 * @returns Audition details with related data
 */
export async function getAuditionById(auditionId: string) {
  try {
    const audition = await prisma.audition.findUnique({
      where: {
        audition_id: auditionId,
      },
      include: {
        job: {
          include: {
            profile: {
              select: {
                company_name: true,
                contact_person_name: true,
                contact_person_email: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        portfolio: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!audition) {
      return { success: false, error: "Audition not found" };
    }

    return { success: true, data: audition };
  } catch (error) {
    console.error("Error fetching audition:", error);
    return { success: false, error: "Failed to fetch audition details" };
  }
}

/**
 * Submit a new audition for a job
 * @param data - Audition submission data
 * @returns Created audition
 */
export async function submitAudition(data: {
  userId: string;
  jobId: string;
  portfolioId?: string;
  coverLetter?: string;
}) {
  try {
    // Check if user already applied for this job
    const existingAudition = await prisma.audition.findFirst({
      where: {
        user_id: data.userId,
        job_id: data.jobId,
      },
    });

    if (existingAudition) {
      return { success: false, error: "You have already applied for this job" };
    }

    const audition = await prisma.audition.create({
      data: {
        user_id: data.userId,
        job_id: data.jobId,
        portfolio_id: data.portfolioId,
        cover_letter: data.coverLetter,
        status: AuditionStatus.submitted,
      },
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
    });

    revalidatePath("/Auditions");
    return { success: true, data: audition };
  } catch (error) {
    console.error("Error submitting audition:", error);
    return { success: false, error: "Failed to submit audition" };
  }
}

/**
 * Update audition status
 * @param auditionId - The ID of the audition
 * @param status - New status
 * @returns Updated audition
 */
export async function updateAuditionStatus(
  auditionId: string,
  status: AuditionStatus
) {
  try {
    const audition = await prisma.audition.update({
      where: {
        audition_id: auditionId,
      },
      data: {
        status,
      },
    });

    revalidatePath("/Auditions");
    return { success: true, data: audition };
  } catch (error) {
    console.error("Error updating audition status:", error);
    return { success: false, error: "Failed to update audition status" };
  }
}

/**
 * Withdraw an audition
 * @param auditionId - The ID of the audition
 * @returns Success status
 */
export async function withdrawAudition(auditionId: string) {
  try {
    await prisma.audition.update({
      where: {
        audition_id: auditionId,
      },
      data: {
        status: AuditionStatus.withdrawn,
      },
    });

    revalidatePath("/Auditions");
    return { success: true, message: "Audition withdrawn successfully" };
  } catch (error) {
    console.error("Error withdrawing audition:", error);
    return { success: false, error: "Failed to withdraw audition" };
  }
}

/**
 * Delete an audition
 * @param auditionId - The ID of the audition
 * @returns Success status
 */
export async function deleteAudition(auditionId: string) {
  try {
    await prisma.audition.delete({
      where: {
        audition_id: auditionId,
      },
    });

    revalidatePath("/Auditions");
    return { success: true, message: "Audition deleted successfully" };
  } catch (error) {
    console.error("Error deleting audition:", error);
    return { success: false, error: "Failed to delete audition" };
  }
}

/**
 * Get auditions filtered by status
 * @param userId - The ID of the user
 * @param status - The status to filter by
 * @returns Filtered auditions
 */
export async function getAuditionsByStatus(
  userId: string,
  status?: AuditionStatus
) {
  try {
    const whereClause: any = {
      user_id: userId,
    };

    if (status) {
      whereClause.status = status;
    }

    const auditions = await prisma.audition.findMany({
      where: whereClause,
      include: {
        job: {
          include: {
            profile: {
              select: {
                company_name: true,
                contact_person_name: true,
              },
            },
          },
        },
        portfolio: {
          select: {
            title: true,
            media_url: true,
            media_type: true,
          },
        },
      },
      orderBy: {
        submitted_at: "desc",
      },
    });

    return { success: true, data: auditions };
  } catch (error) {
    console.error("Error fetching auditions by status:", error);
    return { success: false, error: "Failed to fetch auditions" };
  }
}

/**
 * Get audition statistics for a user
 * @param userId - The ID of the user
 * @returns Audition statistics
 */
export async function getAuditionStats(userId: string) {
  try {
    const stats = await prisma.audition.groupBy({
      by: ["status"],
      where: {
        user_id: userId,
      },
      _count: {
        audition_id: true,
      },
    });

    const formattedStats = stats.reduce((acc: Record<string, number>, stat: any) => {
      acc[stat.status] = stat._count.audition_id;
      return acc;
    }, {});

    const total = await prisma.audition.count({
      where: {
        user_id: userId,
      },
    });

    return {
      success: true,
      data: {
        total,
        byStatus: formattedStats,
      },
    };
  } catch (error) {
    console.error("Error fetching audition stats:", error);
    return { success: false, error: "Failed to fetch statistics" };
  }
}
