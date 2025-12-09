# StageConnect Schema Changes Summary

## Overview
The Prisma schema has been transformed from a LinkedIn-style job platform to a creative gigs platform for singers, dancers, actors, and other creative professionals.

## Key Changes

### 1. **New Enums Added**

#### `TalentCategory`
Defines the types of creative professionals:
- `singer`, `dancer`, `actor`, `model`, `musician`, `voice_artist`
- `choreographer`, `photographer`, `videographer`, `makeup_artist`, `other`

#### `MediaType`
For portfolio items stored in S3:
- `image`, `video`, `audio`, `document`

#### `AuditionStatus` (replaced `ApplicationStatus`)
More appropriate for creative auditions:
- `submitted`, `under_review`, `shortlisted`, `audition_scheduled`
- `selected`, `rejected`, `withdrawn`

### 2. **Enhanced Role Enum**
- `job_seeker` → `talent` (more appropriate for creative professionals)
- `employer` remains the same

### 3. **JobType Enum - Added "gig"**
- Added `gig` option for one-time or short-term creative projects

---

## Model Changes

### **User Model**
- Changed `resumes` → `portfolioItems` (one-to-many relation)
- Added `auditions` relation
- `image` field now explicitly stores S3 URL (VarChar 512)

### **Profile Model**
Major enhancements for creative professionals:

#### Talent-Specific Fields:
- `talent_category`: Type of creative professional
- `specializations`: JSON array (e.g., ["Classical", "Jazz"])
- `height`, `weight`: Physical attributes (Decimal with precision)
- `age`: Integer
- `languages`: JSON array of spoken languages
- `intro_video_url`: S3 URL for introduction video
- `profile_photos`: JSON array of S3 URLs
- `hourly_rate`: Decimal for pricing
- `availability`: String describing availability

#### Employer Fields Remain:
- Company information preserved for employers
- `company_logo_url` uses S3 storage

#### Added Relation:
- `jobs` relation to Job model

### **Experience Model**
Enhanced for creative projects:
- Added `project_name`: For movie/show/concert names
- Added `media_urls`: JSON array of S3 URLs for work samples
- Updated comments to reflect creative context
- Added `onDelete: Cascade`

### **Education Model**
Enhanced for creative training:
- Added `certificate_url`: S3 URL for certificates/proof
- Updated comments for creative context
- Added `onDelete: Cascade`

### **PortfolioItem Model** (Formerly Resume)
Complete redesign for multimedia portfolio:
- `portfolio_id`: UUID primary key
- `title`: Optional title for the work
- `media_url`: S3 URL for media file
- `thumbnail_url`: S3 URL for video thumbnails
- `media_type`: Enum (image/video/audio/document)
- `file_size`: Integer (bytes)
- `duration`: Integer (seconds) for video/audio
- `description`: Text description
- `tags`: JSON array for categorization
- `is_featured`: Boolean flag for highlights
- `display_order`: Integer for custom ordering
- Proper indexes and cascade deletion

### **Job Model**
Transformed for creative gigs:
- Added `profile` relation to employer
- Added `talent_category`: Type of talent needed
- Added `venue`: Specific location
- Renamed `salary_min/max` → `compensation_min/max`
- Added `compensation_type`: "per hour", "per day", "per project"
- Added `event_date`: Date of performance/event
- Renamed `audition_deadline` → `application_deadline`
- Added audition-specific fields:
  - `audition_required`: Boolean
  - `audition_date`: DateTime
  - `audition_location`: String
- Added `preferred_age_min/max`: Age range
- Added `slots_available`: Number of positions
- Added `auditions` relation
- Added index on `talent_category`

### **Audition Model** (Formerly Application)
Enhanced for creative auditions:
- Renamed table from `audition` → `auditions`
- Added proper relations: `user`, `job`, `portfolio`
- Renamed `resume_id` → `portfolio_id`
- Added `cover_letter`: Why they're applying
- Renamed `audition_date` → `submitted_at`
- Changed status enum to `AuditionStatus`
- Added `audition_notes`: Employer feedback
- Added `rating`: Integer (1-5) for employer ratings
- All relations have proper cascade/setNull behavior

### **TalentAuditionsView** (Formerly JobSeekerAuditionsView)
Enhanced view for talent dashboard:
- Added `venue`: Venue information
- Added `event_date`: Performance/event date
- Renamed `audition_date` → `submitted_at`
- Added `compensation_min/max`: Payment information

### **EmployerJobApplicantsView**
Enhanced for viewing applicants:
- Added `applicant_talent_category`: Type of talent
- Renamed `applicant_resume_url` → `applicant_portfolio_url`
- Added `applicant_intro_video`: Intro video URL
- Renamed `audition_date` → `submitted_at`
- Added `rating`: Rating field

---

## Data Type Decisions for S3 Storage

All media URLs use **`@db.VarChar(512)`**:
- User profile pictures
- Portfolio items (images, videos, audio)
- Introduction videos
- Company logos
- Certificates
- Experience media

### Why VarChar(512)?
- S3 URLs are strings with variable length
- 512 characters accommodate:
  - Bucket name
  - Region
  - Path/key
  - Query parameters (if needed)
  - CDN URLs (CloudFront, etc.)

### JSON Arrays for Multiple URLs:
- `profile_photos`: Array of profile image URLs
- `media_urls` in Experience: Array of work sample URLs
- `specializations`, `languages`, `skills`, `tags`: Arrays for categorization

---

## Migration Notes

When creating a migration, you'll need to:

1. **Handle renamed enum values:**
   - `job_seeker` → `talent` in Role enum
   - Create new `TalentCategory`, `MediaType`, `AuditionStatus` enums

2. **Handle renamed tables:**
   - `resumes` → `portfolio_items`
   - `audition` → `auditions`
   - `job_seeker_auditions_view` → `talent_auditions_view`

3. **Handle renamed columns:**
   - Multiple field renames in Job, Audition models

4. **Add new columns:**
   - Many new fields in Profile, Job, and other models

5. **Update relations:**
   - Add foreign key constraints for new relations

## Recommended Next Steps

1. **Review the schema** to ensure it matches your requirements
2. **Create a new migration:**
   ```bash
   npx prisma migrate dev --name transform_to_creative_platform
   ```
3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```
4. **Update your application code** to use the new field names and types
5. **Consider adding database views** for the View models (TalentAuditionsView, EmployerJobApplicantsView)

## Questions to Consider

1. Do you need additional talent categories?
2. Should there be a separate `Review` model for employer-to-talent reviews?
3. Do you want to track view counts on portfolios?
4. Should there be a messaging system between employers and talent?
5. Do you need payment integration fields?
