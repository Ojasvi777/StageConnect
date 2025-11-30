/*
  Warnings:

  - The values [entry,senior,director,executive] on the enum `ExperienceLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [internship] on the enum `JobType` will be removed. If these variants are still used in the database, this will fail.
  - The values [job_seeker] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `employer_job_applicants_view` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ai_score` on the `employer_job_applicants_view` table. All the data in the column will be lost.
  - You are about to drop the column `applicant_resume_url` on the `employer_job_applicants_view` table. All the data in the column will be lost.
  - You are about to drop the column `application_date` on the `employer_job_applicants_view` table. All the data in the column will be lost.
  - You are about to drop the column `application_id` on the `employer_job_applicants_view` table. All the data in the column will be lost.
  - You are about to drop the column `matched_skills` on the `employer_job_applicants_view` table. All the data in the column will be lost.
  - You are about to drop the column `missing_skills` on the `employer_job_applicants_view` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `salary_max` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `salary_min` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin_profile` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `profiles` table. All the data in the column will be lost.
  - You are about to alter the column `image` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(512)`.
  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_seeker_applications_view` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resumes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `audition_id` to the `employer_job_applicants_view` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitted_at` to the `employer_job_applicants_view` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TalentCategory" AS ENUM ('singer', 'dancer', 'actor', 'model', 'musician', 'voice_artist', 'choreographer', 'photographer', 'videographer', 'makeup_artist', 'other');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('image', 'video', 'audio', 'document');

-- CreateEnum
CREATE TYPE "AuditionStatus" AS ENUM ('submitted', 'under_review', 'shortlisted', 'audition_scheduled', 'selected', 'rejected', 'withdrawn');

-- AlterEnum
BEGIN;
CREATE TYPE "ExperienceLevel_new" AS ENUM ('beginner', 'mid', 'professional');
ALTER TABLE "jobs" ALTER COLUMN "experience_level" TYPE "ExperienceLevel_new" USING ("experience_level"::text::"ExperienceLevel_new");
ALTER TYPE "ExperienceLevel" RENAME TO "ExperienceLevel_old";
ALTER TYPE "ExperienceLevel_new" RENAME TO "ExperienceLevel";
DROP TYPE "public"."ExperienceLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobType_new" AS ENUM ('full_time', 'part_time', 'contract', 'gig');
ALTER TABLE "jobs" ALTER COLUMN "job_type" TYPE "JobType_new" USING ("job_type"::text::"JobType_new");
ALTER TYPE "JobType" RENAME TO "JobType_old";
ALTER TYPE "JobType_new" RENAME TO "JobType";
DROP TYPE "public"."JobType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('talent', 'employer');
ALTER TABLE "profiles" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."educations" DROP CONSTRAINT "educations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."experiences" DROP CONSTRAINT "experiences_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."resumes" DROP CONSTRAINT "resumes_user_id_fkey";

-- AlterTable
ALTER TABLE "educations" ADD COLUMN     "certificate_url" VARCHAR(512);

-- AlterTable
ALTER TABLE "employer_job_applicants_view" DROP CONSTRAINT "employer_job_applicants_view_pkey",
DROP COLUMN "ai_score",
DROP COLUMN "applicant_resume_url",
DROP COLUMN "application_date",
DROP COLUMN "application_id",
DROP COLUMN "matched_skills",
DROP COLUMN "missing_skills",
ADD COLUMN     "applicant_intro_video" VARCHAR(512),
ADD COLUMN     "applicant_portfolio_url" VARCHAR(512),
ADD COLUMN     "applicant_talent_category" VARCHAR(50),
ADD COLUMN     "audition_id" UUID NOT NULL,
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "submitted_at" TIMESTAMPTZ NOT NULL,
ADD CONSTRAINT "employer_job_applicants_view_pkey" PRIMARY KEY ("audition_id");

-- AlterTable
ALTER TABLE "experiences" ADD COLUMN     "media_urls" JSONB,
ADD COLUMN     "project_name" VARCHAR(255),
ALTER COLUMN "company_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "industry",
DROP COLUMN "salary_max",
DROP COLUMN "salary_min",
ADD COLUMN     "audition_date" TIMESTAMPTZ,
ADD COLUMN     "audition_location" VARCHAR(255),
ADD COLUMN     "audition_required" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "compensation_max" DECIMAL(10,2),
ADD COLUMN     "compensation_min" DECIMAL(10,2),
ADD COLUMN     "compensation_type" VARCHAR(50),
ADD COLUMN     "event_date" TIMESTAMPTZ,
ADD COLUMN     "preferred_age_max" INTEGER,
ADD COLUMN     "preferred_age_min" INTEGER,
ADD COLUMN     "slots_available" INTEGER,
ADD COLUMN     "talent_category" "TalentCategory",
ADD COLUMN     "venue" VARCHAR(255);

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "linkedin_profile",
DROP COLUMN "summary",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "availability" VARCHAR(100),
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "height" DECIMAL(5,2),
ADD COLUMN     "hourly_rate" DECIMAL(10,2),
ADD COLUMN     "instagram_profile" VARCHAR(255),
ADD COLUMN     "intro_video_url" VARCHAR(512),
ADD COLUMN     "languages" JSONB,
ADD COLUMN     "profile_photos" JSONB,
ADD COLUMN     "specializations" JSONB,
ADD COLUMN     "talent_category" "TalentCategory",
ADD COLUMN     "weight" DECIMAL(5,2),
ADD COLUMN     "youtube_profile" VARCHAR(255),
ALTER COLUMN "visibility" SET DEFAULT 'public';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" SET DATA TYPE VARCHAR(512);

-- DropTable
DROP TABLE "public"."applications";

-- DropTable
DROP TABLE "public"."job_seeker_applications_view";

-- DropTable
DROP TABLE "public"."resumes";

-- DropEnum
DROP TYPE "public"."ApplicationStatus";

-- CreateTable
CREATE TABLE "portfolio_items" (
    "portfolio_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(255),
    "media_url" VARCHAR(512) NOT NULL,
    "thumbnail_url" VARCHAR(512),
    "media_type" "MediaType" NOT NULL,
    "file_size" INTEGER,
    "duration" INTEGER,
    "description" TEXT,
    "tags" JSONB,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER,
    "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "portfolio_items_pkey" PRIMARY KEY ("portfolio_id")
);

-- CreateTable
CREATE TABLE "auditions" (
    "audition_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "portfolio_id" UUID,
    "cover_letter" TEXT,
    "submitted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AuditionStatus" NOT NULL DEFAULT 'submitted',
    "audition_notes" TEXT,
    "rating" INTEGER,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "auditions_pkey" PRIMARY KEY ("audition_id")
);

-- CreateTable
CREATE TABLE "talent_auditions_view" (
    "audition_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "job_location_type" VARCHAR(20),
    "job_city" VARCHAR(100),
    "job_state" VARCHAR(100),
    "job_country" VARCHAR(100),
    "venue" VARCHAR(255),
    "event_date" TIMESTAMPTZ,
    "submitted_at" TIMESTAMPTZ NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "compensation_min" DECIMAL(10,2),
    "compensation_max" DECIMAL(10,2),
    "last_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "talent_auditions_view_pkey" PRIMARY KEY ("audition_id")
);

-- CreateIndex
CREATE INDEX "portfolio_items_user_id_idx" ON "portfolio_items"("user_id");

-- CreateIndex
CREATE INDEX "portfolio_items_media_type_idx" ON "portfolio_items"("media_type");

-- CreateIndex
CREATE INDEX "portfolio_items_is_featured_idx" ON "portfolio_items"("is_featured");

-- CreateIndex
CREATE INDEX "auditions_user_id_idx" ON "auditions"("user_id");

-- CreateIndex
CREATE INDEX "auditions_job_id_idx" ON "auditions"("job_id");

-- CreateIndex
CREATE INDEX "auditions_status_idx" ON "auditions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "auditions_user_job" ON "auditions"("user_id", "job_id");

-- CreateIndex
CREATE INDEX "idx_talent_apps_view_user_id" ON "talent_auditions_view"("user_id");

-- CreateIndex
CREATE INDEX "idx_talent_apps_view_job_id" ON "talent_auditions_view"("job_id");

-- CreateIndex
CREATE INDEX "jobs_talent_category_idx" ON "jobs"("talent_category");

-- CreateIndex
CREATE INDEX "jobs_application_deadline_idx" ON "jobs"("application_deadline");

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_items" ADD CONSTRAINT "portfolio_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "profiles"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditions" ADD CONSTRAINT "auditions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditions" ADD CONSTRAINT "auditions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditions" ADD CONSTRAINT "auditions_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolio_items"("portfolio_id") ON DELETE SET NULL ON UPDATE CASCADE;
