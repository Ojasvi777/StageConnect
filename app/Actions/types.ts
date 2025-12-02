// Type definitions for server actions responses
import { Audition, Job, PortfolioItem, Profile, User } from "@prisma/client";

export type AuditionWithDetails = Audition & {
  job: Job & {
    profile: Profile & {
      user: User;
    };
  };
  portfolio: PortfolioItem | null;
};

export type JobWithDetails = Job & {
  profile: Profile & {
    user: User;
  };
  _count: {
    auditions: number;
  };
};

export type PortfolioItemType = PortfolioItem;
