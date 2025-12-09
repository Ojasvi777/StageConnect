/*
  Warnings:

  - Added the required column `gig_count` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TalentCategory" ADD VALUE 'script_writer';
ALTER TYPE "TalentCategory" ADD VALUE 'fashion_designer';

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "gig_count" INTEGER NOT NULL;
