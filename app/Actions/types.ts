// Type definitions for server actions responses
// Using any for now - Prisma types will be properly generated after schema changes
/* eslint-disable @typescript-eslint/no-explicit-any */

export type AuditionWithDetails = any;
export type JobWithDetails = any;
export type UserWithProfile = any;
export type PortfolioItemType = any;
export type ExperienceType = any;
export type EducationType = any;
export type ProfileType = any;

export type TalentProfile = {
  user_id: string;
  role: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  address: string | null;
  instagram_profile: string | null;
  youtube_profile: string | null;
  bio: string | null;
  visibility: string;
  gig_count: number;
  talent_category: string | null;
  specializations: any;
  height: number | null;
  weight: number | null;
  age: number | null;
  languages: any;
  intro_video_url: string | null;
  profile_photos: any;
  skills: any;
  hourly_rate: number | null;
  availability: string | null;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    portfolioItems: Array<{
      portfolio_id: string;
      media_type: string;
      media_url: string;
      thumbnail_url: string | null;
    }>;
  };
};

export type ProfileStats = {
  gigCount: number;
  auditionsCount: number;
  portfolioCount: number;
  connectionsCount: number;
};

export type ProfileHighlight = {
  title: string;
  description: string;
  type: "portfolio" | "achievement";
};
