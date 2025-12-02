// Enum types matching Prisma schema
// These are used as fallbacks when Prisma client types are not available

export enum AuditionStatus {
  submitted = "submitted",
  under_review = "under_review",
  shortlisted = "shortlisted",
  audition_scheduled = "audition_scheduled",
  selected = "selected",
  rejected = "rejected",
  withdrawn = "withdrawn"
}

export enum JobStatus {
  active = "active",
  inactive = "inactive",
  closed = "closed",
  draft = "draft"
}

export enum JobType {
  full_time = "full_time",
  part_time = "part_time",
  contract = "contract",
  gig = "gig"
}

export enum LocationType {
  remote = "remote",
  on_site = "on_site",
  hybrid = "hybrid"
}

export enum TalentCategory {
  singer = "singer",
  dancer = "dancer",
  actor = "actor",
  model = "model",
  musician = "musician",
  voice_artist = "voice_artist",
  choreographer = "choreographer",
  photographer = "photographer",
  videographer = "videographer",
  makeup_artist = "makeup_artist",
  script_writer = "script_writer",
  fashion_designer = "fashion_designer",
  other = "other"
}

export enum MediaType {
  image = "image",
  video = "video",
  audio = "audio",
  document = "document"
}

export enum Role {
  talent = "talent",
  employer = "employer"
}

export enum Visibility {
  public = "public",
  private = "private"
}

export enum ExperienceLevel {
  beginner = "beginner",
  mid = "mid",
  professional = "professional"
}
