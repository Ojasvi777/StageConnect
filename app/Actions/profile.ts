"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Role, TalentCategory, Visibility } from "./enums";

/**
 * Get user profile with all related data
 * @param userId - The ID of the user
 * @returns User profile with experiences, education, and portfolio
 */
export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
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
          take: 6, // Limit to top 6 for profile display
        },
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: "Failed to fetch user profile" };
  }
}

/**
 * Get profile by user ID
 * @param userId - The ID of the user
 * @returns Profile data
 */
export async function getProfile(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    return { success: true, data: profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
}

/**
 * Update user profile
 * @param userId - The ID of the user
 * @param data - Updated profile data
 * @returns Updated profile
 */
export async function updateProfile(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    instagramProfile?: string;
    youtubeProfile?: string;
    bio?: string;
    visibility?: Visibility;
    talentCategory?: TalentCategory;
    specializations?: string[];
    height?: number;
    weight?: number;
    age?: number;
    languages?: string[];
    skills?: string[];
    hourlyRate?: number;
    availability?: string;
    companyName?: string;
    companyDescription?: string;
    industry?: string;
    website?: string;
  }
) {
  try {
    const profile = await prisma.profile.update({
      where: { user_id: userId },
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone_number: data.phoneNumber,
        address: data.address,
        instagram_profile: data.instagramProfile,
        youtube_profile: data.youtubeProfile,
        bio: data.bio,
        visibility: data.visibility,
        talent_category: data.talentCategory,
        specializations: data.specializations,
        height: data.height,
        weight: data.weight,
        age: data.age,
        languages: data.languages,
        skills: data.skills,
        hourly_rate: data.hourlyRate,
        availability: data.availability,
        company_name: data.companyName,
        company_description: data.companyDescription,
        industry: data.industry,
        website: data.website,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: profile };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

/**
 * Get user experiences
 * @param userId - The ID of the user
 * @returns Array of experiences
 */
export async function getUserExperiences(userId: string) {
  try {
    const experiences = await prisma.experience.findMany({
      where: { user_id: userId },
      orderBy: {
        start_date: "desc",
      },
    });

    return { success: true, data: experiences };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return { success: false, error: "Failed to fetch experiences" };
  }
}

/**
 * Create a new experience
 * @param userId - The ID of the user
 * @param data - Experience data
 * @returns Created experience
 */
export async function createExperience(
  userId: string,
  data: {
    title: string;
    companyName?: string;
    projectName?: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
    mediaUrls?: string[];
  }
) {
  try {
    const experience = await prisma.experience.create({
      data: {
        user_id: userId,
        title: data.title,
        company_name: data.companyName,
        project_name: data.projectName,
        location: data.location,
        start_date: data.startDate,
        end_date: data.endDate,
        description: data.description,
        media_urls: data.mediaUrls,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: experience };
  } catch (error) {
    console.error("Error creating experience:", error);
    return { success: false, error: "Failed to create experience" };
  }
}

/**
 * Update an experience
 * @param experienceId - The ID of the experience
 * @param data - Updated experience data
 * @returns Updated experience
 */
export async function updateExperience(
  experienceId: string,
  data: {
    title?: string;
    companyName?: string;
    projectName?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
  }
) {
  try {
    const experience = await prisma.experience.update({
      where: { experience_id: experienceId },
      data: {
        title: data.title,
        company_name: data.companyName,
        project_name: data.projectName,
        location: data.location,
        start_date: data.startDate,
        end_date: data.endDate,
        description: data.description,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: experience };
  } catch (error) {
    console.error("Error updating experience:", error);
    return { success: false, error: "Failed to update experience" };
  }
}

/**
 * Delete an experience
 * @param experienceId - The ID of the experience
 * @returns Success status
 */
export async function deleteExperience(experienceId: string) {
  try {
    await prisma.experience.delete({
      where: { experience_id: experienceId },
    });

    revalidatePath("/Profile");
    return { success: true, message: "Experience deleted successfully" };
  } catch (error) {
    console.error("Error deleting experience:", error);
    return { success: false, error: "Failed to delete experience" };
  }
}

/**
 * Get user education
 * @param userId - The ID of the user
 * @returns Array of education records
 */
export async function getUserEducation(userId: string) {
  try {
    const educations = await prisma.education.findMany({
      where: { user_id: userId },
      orderBy: {
        start_date: "desc",
      },
    });

    return { success: true, data: educations };
  } catch (error) {
    console.error("Error fetching education:", error);
    return { success: false, error: "Failed to fetch education" };
  }
}

/**
 * Create a new education record
 * @param userId - The ID of the user
 * @param data - Education data
 * @returns Created education record
 */
export async function createEducation(
  userId: string,
  data: {
    institutionName: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
    certificateUrl?: string;
  }
) {
  try {
    const education = await prisma.education.create({
      data: {
        user_id: userId,
        institution_name: data.institutionName,
        degree: data.degree,
        field_of_study: data.fieldOfStudy,
        start_date: data.startDate,
        end_date: data.endDate,
        description: data.description,
        certificate_url: data.certificateUrl,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: education };
  } catch (error) {
    console.error("Error creating education:", error);
    return { success: false, error: "Failed to create education" };
  }
}

/**
 * Update an education record
 * @param educationId - The ID of the education record
 * @param data - Updated education data
 * @returns Updated education record
 */
export async function updateEducation(
  educationId: string,
  data: {
    institutionName?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
    description?: string;
  }
) {
  try {
    const education = await prisma.education.update({
      where: { education_id: educationId },
      data: {
        institution_name: data.institutionName,
        degree: data.degree,
        field_of_study: data.fieldOfStudy,
        start_date: data.startDate,
        end_date: data.endDate,
        description: data.description,
      },
    });

    revalidatePath("/Profile");
    return { success: true, data: education };
  } catch (error) {
    console.error("Error updating education:", error);
    return { success: false, error: "Failed to update education" };
  }
}

/**
 * Delete an education record
 * @param educationId - The ID of the education record
 * @returns Success status
 */
export async function deleteEducation(educationId: string) {
  try {
    await prisma.education.delete({
      where: { education_id: educationId },
    });

    revalidatePath("/Profile");
    return { success: true, message: "Education deleted successfully" };
  } catch (error) {
    console.error("Error deleting education:", error);
    return { success: false, error: "Failed to delete education" };
  }
}

/**
 * Get profile stats (connections, gigs, auditions)
 * @param userId - The ID of the user
 * @returns Profile statistics
 */
export async function getProfileStats(userId: string) {
  try {
    const [profile, auditionsCount, portfolioCount] = await Promise.all([
      prisma.profile.findUnique({
        where: { user_id: userId },
        select: { gig_count: true },
      }),
      prisma.audition.count({
        where: { user_id: userId },
      }),
      prisma.portfolioItem.count({
        where: { user_id: userId },
      }),
    ]);

    return {
      success: true,
      data: {
        gigCount: profile?.gig_count || 0,
        auditionsCount,
        portfolioCount,
        // Connections count would need a separate connections table in the future
        connectionsCount: 124, // Placeholder - implement connections feature later
      },
    };
  } catch (error) {
    console.error("Error fetching profile stats:", error);
    return { success: false, error: "Failed to fetch profile stats" };
  }
}

/**
 * Get profile highlights (awards, achievements, featured work)
 * This is a simplified version - you can expand based on your needs
 * @param userId - The ID of the user
 * @returns Array of highlights
 */
export async function getProfileHighlights(userId: string) {
  try {
    // Get featured portfolio items as highlights
    const featuredWork = await prisma.portfolioItem.findMany({
      where: {
        user_id: userId,
        is_featured: true,
      },
      orderBy: {
        display_order: "asc",
      },
      take: 3,
    });

    // Get recent successful auditions
    const selectedAuditions = await prisma.audition.findMany({
      where: {
        user_id: userId,
        status: "selected",
      },
      include: {
        job: {
          select: {
            title: true,
            profile: {
              select: {
                company_name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
      take: 3,
    });

    const highlights = [
      ...featuredWork.map((item: any) => ({
        title: item.title || "Featured Work",
        description: item.description || "Featured portfolio item",
        type: "portfolio" as const,
      })),
      ...selectedAuditions.map((audition: any) => ({
        title: audition.job.title,
        description: `Selected for ${audition.job.profile.company_name || "project"}`,
        type: "achievement" as const,
      })),
    ];

    return { success: true, data: highlights };
  } catch (error) {
    console.error("Error fetching profile highlights:", error);
    return { success: false, error: "Failed to fetch profile highlights" };
  }
}
