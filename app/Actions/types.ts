// Type definitions for server actions responses
// Using any for now - Prisma types will be properly generated after schema changes

export type AuditionWithDetails = any;
export type JobWithDetails = any;
export type UserWithProfile = any;
export type PortfolioItemType = any;
export type ExperienceType = any;
export type EducationType = any;
export type ProfileType = any;

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
