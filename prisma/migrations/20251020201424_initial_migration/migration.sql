-- CreateEnum
CREATE TYPE "Role" AS ENUM ('job_seeker', 'employer');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('remote', 'on_site', 'hybrid');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('entry', 'mid', 'senior', 'director', 'executive');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('active', 'inactive', 'closed', 'draft');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('submitted', 'under_review', 'interview_scheduled', 'offer_extended', 'rejected', 'hired', 'withdrawn');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "profiles" (
    "user_id" UUID NOT NULL,
    "role" "Role" NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "phone_number" VARCHAR(50),
    "address" VARCHAR(255),
    "linkedin_profile" VARCHAR(255),
    "summary" TEXT,
    "visibility" "Visibility" NOT NULL DEFAULT 'private',
    "company_name" VARCHAR(255),
    "company_description" TEXT,
    "industry" VARCHAR(100),
    "website" VARCHAR(255),
    "contact_person_name" VARCHAR(200),
    "contact_person_email" VARCHAR(255),
    "company_logo_url" VARCHAR(512),
    "skills" JSONB,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "experience_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "location" VARCHAR(100),
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("experience_id")
);

-- CreateTable
CREATE TABLE "educations" (
    "education_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "institution_name" VARCHAR(255) NOT NULL,
    "degree" VARCHAR(255) NOT NULL,
    "field_of_study" VARCHAR(255),
    "start_date" DATE NOT NULL,
    "end_date" DATE,
    "description" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "resumes" (
    "resume_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "file_url" VARCHAR(512) NOT NULL,
    "original_filename" VARCHAR(255) NOT NULL,
    "file_type" VARCHAR(50) NOT NULL,
    "extracted_text_url" VARCHAR(512),
    "uploaded_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resumes_pkey" PRIMARY KEY ("resume_id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "job_id" UUID NOT NULL,
    "employer_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "responsibilities" TEXT,
    "location_type" "LocationType" NOT NULL,
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "job_type" "JobType" NOT NULL,
    "salary_min" DECIMAL,
    "salary_max" DECIMAL,
    "industry" VARCHAR(100),
    "experience_level" "ExperienceLevel" NOT NULL,
    "application_deadline" TIMESTAMPTZ,
    "status" "JobStatus" NOT NULL DEFAULT 'active',
    "required_skills" JSONB,
    "posted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "applications" (
    "application_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "resume_id" UUID NOT NULL,
    "application_date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'submitted',
    "ai_score" DECIMAL,
    "matched_skills" JSONB,
    "missing_skills" JSONB,
    "extracted_keywords" JSONB,
    "resume_summary" TEXT,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "job_seeker_applications_view" (
    "application_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "company_name" VARCHAR(255) NOT NULL,
    "job_location_type" VARCHAR(20),
    "job_city" VARCHAR(100),
    "job_state" VARCHAR(100),
    "job_country" VARCHAR(100),
    "application_date" TIMESTAMPTZ NOT NULL,
    "status" TEXT NOT NULL,
    "ai_score" DECIMAL,
    "matched_skills" JSONB,
    "missing_skills" JSONB,
    "last_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "job_seeker_applications_view_pkey" PRIMARY KEY ("application_id")
);

-- CreateTable
CREATE TABLE "employer_job_applicants_view" (
    "application_id" UUID NOT NULL,
    "job_id" UUID NOT NULL,
    "employer_id" UUID NOT NULL,
    "job_title" VARCHAR(255) NOT NULL,
    "applicant_user_id" UUID NOT NULL,
    "applicant_first_name" VARCHAR(100),
    "applicant_last_name" VARCHAR(100),
    "applicant_email" VARCHAR(255),
    "applicant_resume_url" VARCHAR(512),
    "application_date" TIMESTAMPTZ NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "ai_score" DECIMAL,
    "matched_skills" JSONB,
    "missing_skills" JSONB,
    "last_updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "employer_job_applicants_view_pkey" PRIMARY KEY ("application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "experiences_user_id_idx" ON "experiences"("user_id");

-- CreateIndex
CREATE INDEX "educations_user_id_idx" ON "educations"("user_id");

-- CreateIndex
CREATE INDEX "resumes_user_id_idx" ON "resumes"("user_id");

-- CreateIndex
CREATE INDEX "jobs_employer_id_idx" ON "jobs"("employer_id");

-- CreateIndex
CREATE INDEX "jobs_status_idx" ON "jobs"("status");

-- CreateIndex
CREATE INDEX "jobs_location_type_idx" ON "jobs"("location_type");

-- CreateIndex
CREATE INDEX "jobs_job_type_idx" ON "jobs"("job_type");

-- CreateIndex
CREATE INDEX "applications_user_id_idx" ON "applications"("user_id");

-- CreateIndex
CREATE INDEX "applications_job_id_idx" ON "applications"("job_id");

-- CreateIndex
CREATE INDEX "applications_status_idx" ON "applications"("status");

-- CreateIndex
CREATE UNIQUE INDEX "idx_applications_user_job" ON "applications"("user_id", "job_id");

-- CreateIndex
CREATE INDEX "idx_j_seeker_apps_view_user_id" ON "job_seeker_applications_view"("user_id");

-- CreateIndex
CREATE INDEX "idx_j_seeker_apps_view_job_id" ON "job_seeker_applications_view"("job_id");

-- CreateIndex
CREATE INDEX "idx_employer_apps_view_job_id" ON "employer_job_applicants_view"("job_id");

-- CreateIndex
CREATE INDEX "idx_employer_apps_view_employer_id" ON "employer_job_applicants_view"("employer_id");

-- CreateIndex
CREATE INDEX "idx_employer_apps_view_applicant_id" ON "employer_job_applicants_view"("applicant_user_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
