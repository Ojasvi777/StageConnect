"use server";

import { prisma } from "@/lib/prisma";
import { JobStatus, JobType, LocationType, TalentCategory } from "./enums";
import { revalidatePath } from "next/cache";

/**
 * Get all active jobs
 * @returns Array of active jobs
 */
export async function getActiveJobs() {
  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: JobStatus.active,
        application_deadline: {
          gte: new Date(),
        },
      },
      include: {
        profile: {
          select: {
            company_name: true,
            company_logo_url: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            auditions: true,
          },
        },
      },
      orderBy: {
        posted_at: "desc",
      },
    });

    return { success: true, data: jobs };
  } catch (error) {
    console.error("Error fetching active jobs:", error);
    return { success: false, error: "Failed to fetch jobs" };
  }
}

/**
 * Get job by ID
 * @param jobId - The ID of the job
 * @returns Job details
 */
export async function getJobById(jobId: string) {
  try {
    const job = await prisma.job.findUnique({
      where: {
        job_id: jobId,
      },
      include: {
        profile: {
          select: {
            company_name: true,
            company_description: true,
            company_logo_url: true,
            contact_person_name: true,
            website: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: {
            auditions: true,
          },
        },
      },
    });

    if (!job) {
      return { success: false, error: "Job not found" };
    }

    return { success: true, data: job };
  } catch (error) {
    console.error("Error fetching job:", error);
    return { success: false, error: "Failed to fetch job details" };
  }
}

/**
 * Search jobs with filters
 * @param filters - Search filters
 * @returns Filtered jobs
 */
export async function searchJobs(filters: {
  talentCategory?: TalentCategory;
  locationType?: LocationType;
  jobType?: JobType;
  city?: string;
  search?: string;
}) {
  try {
    const whereClause: any = {
      status: JobStatus.active,
      application_deadline: {
        gte: new Date(),
      },
    };

    if (filters.talentCategory) {
      whereClause.talent_category = filters.talentCategory;
    }

    if (filters.locationType) {
      whereClause.location_type = filters.locationType;
    }

    if (filters.jobType) {
      whereClause.job_type = filters.jobType;
    }

    if (filters.city) {
      whereClause.city = {
        contains: filters.city,
        mode: "insensitive",
      };
    }

    if (filters.search) {
      whereClause.OR = [
        {
          title: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      include: {
        profile: {
          select: {
            company_name: true,
            company_logo_url: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            auditions: true,
          },
        },
      },
      orderBy: {
        posted_at: "desc",
      },
    });

    return { success: true, data: jobs };
  } catch (error) {
    console.error("Error searching jobs:", error);
    return { success: false, error: "Failed to search jobs" };
  }
}

/**
 * Check if user has already applied to a job
 * @param userId - The ID of the user
 * @param jobId - The ID of the job
 * @returns Boolean indicating if user has applied
 */
export async function hasUserApplied(userId: string, jobId: string) {
  try {
    const audition = await prisma.audition.findFirst({
      where: {
        user_id: userId,
        job_id: jobId,
      },
    });

    return { success: true, data: !!audition };
  } catch (error) {
    console.error("Error checking application status:", error);
    return { success: false, error: "Failed to check application status" };
  }
}
