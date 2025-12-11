"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "./enums";

interface CompanyAnalytics {
  profileViews: number;
  connections: number;
  connectionsGrowth: number; // Percentage growth
  activeJobs: number;
  totalApplications: number;
  viewsGrowth: number; // Percentage growth
  monthlyViews: { month: string; views: number }[];
  applicationsByStatus: { status: string; count: number }[];
  recentActivity: {
    type: string;
    title: string;
    date: Date;
    metadata?: any;
  }[];
}

/**
 * Get comprehensive analytics for a company
 */
export async function getCompanyAnalytics(
  userId: string
): Promise<{ success: boolean; data?: CompanyAnalytics; error?: string }> {
  try {
    // Verify the user is an employer
    const profile = await prisma.profile.findUnique({
      where: { user_id: userId, role: Role.employer },
    });

    if (!profile) {
      return {
        success: false,
        error: "Company profile not found",
      };
    }

    // Get all jobs posted by this company
    const jobs = await prisma.job.findMany({
      where: { employer_id: userId },
      include: {
        auditions: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Calculate analytics
    const activeJobs = jobs.filter((job) => job.status === "active").length;
    const totalApplications = jobs.reduce(
      (sum, job) => sum + job.auditions.length,
      0
    );

    // Count applications by status
    const applicationsByStatus: { status: string; count: number }[] = [];
    const statusCounts: Record<string, number> = {};

    jobs.forEach((job) => {
      job.auditions.forEach((audition: any) => {
        const status = audition.status;
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });
    });

    Object.entries(statusCounts).forEach(([status, count]) => {
      applicationsByStatus.push({
        status: status.charAt(0).toUpperCase() + status.slice(1).replace("_", " "),
        count,
      });
    });

    // Mock data for views (in production, you'd track this separately)
    const profileViews = Math.floor(Math.random() * 1000) + 500;
    const viewsGrowth = Math.floor(Math.random() * 30) + 5;

    // Mock connections data
    const connections = Math.floor(Math.random() * 200) + 50;
    const connectionsGrowth = Math.floor(Math.random() * 20) + 2;

    // Monthly views for the last 6 months
    const monthlyViews = generateMonthlyViews();

    // Recent activity from auditions
    const recentActivity = jobs
      .flatMap((job) =>
        job.auditions.slice(0, 5).map((audition: any) => ({
          type: "application",
          title: `New application for ${job.title}`,
          date: audition.submitted_at,
          metadata: {
            applicantName: audition.user.name,
            status: audition.status,
            jobId: job.job_id,
          },
        }))
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);

    return {
      success: true,
      data: {
        profileViews,
        connections,
        connectionsGrowth,
        activeJobs,
        totalApplications,
        viewsGrowth,
        monthlyViews,
        applicationsByStatus,
        recentActivity,
      },
    };
  } catch (error) {
    console.error("Error fetching company analytics:", error);
    return {
      success: false,
      error: "Failed to fetch analytics",
    };
  }
}

/**
 * Generate monthly views data for the last 6 months
 */
function generateMonthlyViews(): { month: string; views: number }[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();
  const result: { month: string; views: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    result.push({
      month: months[monthIndex],
      views: Math.floor(Math.random() * 300) + 100,
    });
  }

  return result;
}

/**
 * Get company's posted jobs with application stats
 */
export async function getCompanyJobs(userId: string): Promise<{
  success: boolean;
  data?: any[];
  error?: string;
}> {
  try {
    const jobs = await prisma.job.findMany({
      where: { employer_id: userId },
      include: {
        auditions: {
          select: {
            audition_id: true,
            status: true,
            submitted_at: true,
          },
        },
      },
      orderBy: {
        posted_at: "desc",
      },
      take: 10,
    });

    const jobsWithStats = jobs.map((job) => ({
      ...job,
      applicationCount: job.auditions.length,
      newApplications: job.auditions.filter(
        (a: any) =>
          new Date(a.submitted_at).getTime() >
          Date.now() - 7 * 24 * 60 * 60 * 1000
      ).length,
    }));

    return {
      success: true,
      data: jobsWithStats,
    };
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    return {
      success: false,
      error: "Failed to fetch jobs",
    };
  }
}
