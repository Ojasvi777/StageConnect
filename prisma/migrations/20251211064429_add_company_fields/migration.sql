-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "company_address" VARCHAR(255),
ADD COLUMN     "company_city" VARCHAR(100),
ADD COLUMN     "company_country" VARCHAR(100),
ADD COLUMN     "company_size" VARCHAR(50),
ADD COLUMN     "company_state" VARCHAR(100),
ADD COLUMN     "company_zip_code" VARCHAR(20),
ADD COLUMN     "contact_person_role" VARCHAR(200),
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "registration_number" VARCHAR(100),
ADD COLUMN     "tax_id" VARCHAR(100);
