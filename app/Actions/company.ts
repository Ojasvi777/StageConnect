"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";
import { Role } from "./enums";

/**
 * Validate company registration data
 */
function validateCompanyData(data: CompanyRegistrationInput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields validation
  if (!data.companyName?.trim()) {
    errors.push("Company name is required");
  }
  if (!data.industry?.trim()) {
    errors.push("Industry is required");
  }
  if (!data.companySize?.trim()) {
    errors.push("Company size is required");
  }
  if (!data.email?.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Invalid email format");
  }
  if (!data.phone?.trim()) {
    errors.push("Phone number is required");
  }
  if (!data.contactPersonName?.trim()) {
    errors.push("Contact person name is required");
  }
  if (!data.contactPersonRole?.trim()) {
    errors.push("Contact person role is required");
  }
  if (!data.address?.trim()) {
    errors.push("Address is required");
  }
  if (!data.city?.trim()) {
    errors.push("City is required");
  }
  if (!data.state?.trim()) {
    errors.push("State/Province is required");
  }
  if (!data.country?.trim()) {
    errors.push("Country is required");
  }
  if (!data.zipCode?.trim()) {
    errors.push("ZIP/Postal code is required");
  }
  if (!data.description?.trim()) {
    errors.push("Company description is required");
  }
  if (!data.password || data.password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (data.password !== data.confirmPassword) {
    errors.push("Passwords do not match");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if email already exists
 */
async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return !!existingUser;
  } catch (error) {
    console.error("Error checking email:", error);
    throw new Error("Failed to check email availability");
  }
}

/**
 * Create user account with hashed password
 */
async function createUserAccount(
  email: string,
  name: string,
  password: string
) {
  try {
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name,
        password: hashedPassword,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user account:", error);
    throw new Error("Failed to create user account");
  }
}

/**
 * Create company profile
 */
async function createCompanyProfile(userId: string, data: CompanyRegistrationInput) {
  try {
    const profile = await prisma.profile.create({
      data: {
        user_id: userId,
        role: Role.employer,
        gig_count: 0,
        phone_number: data.phone,
        
        // Company information
        company_name: data.companyName,
        company_description: data.description,
        industry: data.industry,
        company_size: data.companySize,
        website: data.website || null,
        
        // Contact information
        contact_person_name: data.contactPersonName,
        contact_person_email: data.email,
        contact_person_role: data.contactPersonRole,
        
        // Address information
        company_address: data.address,
        company_city: data.city,
        company_state: data.state,
        company_country: data.country,
        company_zip_code: data.zipCode,
        
        // Legal information
        registration_number: data.registrationNumber || null,
        tax_id: data.taxId || null,
        
        // Verification
        is_verified: false,
      },
    });

    return profile;
  } catch (error) {
    console.error("Error creating company profile:", error);
    throw new Error("Failed to create company profile");
  }
}

/**
 * Register a new company
 * Main function that orchestrates the registration process
 */
export async function registerCompany(
  data: CompanyRegistrationInput
): Promise<ActionResponse<{ userId: string; profileId: string }>> {
  try {
    // Step 1: Validate input data
    const validation = validateCompanyData(data);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      };
    }

    // Step 2: Check if email already exists
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    // Step 3: Create user account
    const user = await createUserAccount(
      data.email,
      data.companyName,
      data.password
    );

    // Step 4: Create company profile
    const profile = await createCompanyProfile(user.id, data);

    // Step 5: Revalidate paths
    revalidatePath("/");
    revalidatePath("/login");

    return {
      success: true,
      data: {
        userId: user.id,
        profileId: profile.user_id,
      },
      message: "Company registered successfully! Please sign in to continue.",
    };
  } catch (error) {
    console.error("Error in company registration:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to register company",
    };
  }
}

/**
 * Get company profile by user ID
 */
export async function getCompanyProfile(userId: string): Promise<ActionResponse<any>> {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        user_id: userId,
        role: Role.employer,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!profile) {
      return {
        success: false,
        error: "Company profile not found",
      };
    }

    return {
      success: true,
      data: profile,
    };
  } catch (error) {
    console.error("Error fetching company profile:", error);
    return {
      success: false,
      error: "Failed to fetch company profile",
    };
  }
}

/**
 * Update company profile
 */
export async function updateCompanyProfile(
  userId: string,
  data: Partial<CompanyRegistrationInput>
): Promise<ActionResponse<any>> {
  try {
    // Build update object with only provided fields
    const updateData: any = {};

    if (data.companyName) updateData.company_name = data.companyName;
    if (data.industry) updateData.industry = data.industry;
    if (data.companySize) updateData.company_size = data.companySize;
    if (data.description) updateData.company_description = data.description;
    if (data.website !== undefined) updateData.website = data.website || null;
    if (data.phone) updateData.phone_number = data.phone;
    if (data.contactPersonName) updateData.contact_person_name = data.contactPersonName;
    if (data.contactPersonRole) updateData.contact_person_role = data.contactPersonRole;
    if (data.address) updateData.company_address = data.address;
    if (data.city) updateData.company_city = data.city;
    if (data.state) updateData.company_state = data.state;
    if (data.country) updateData.company_country = data.country;
    if (data.zipCode) updateData.company_zip_code = data.zipCode;
    if (data.registrationNumber !== undefined) {
      updateData.registration_number = data.registrationNumber || null;
    }
    if (data.taxId !== undefined) updateData.tax_id = data.taxId || null;

    const profile = await prisma.profile.update({
      where: {
        user_id: userId,
        role: Role.employer,
      },
      data: updateData,
    });

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      data: profile,
      message: "Company profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating company profile:", error);
    return {
      success: false,
      error: "Failed to update company profile",
    };
  }
}

/**
 * Verify company (admin function)
 */
export async function verifyCompany(
  userId: string,
  isVerified: boolean
): Promise<ActionResponse<any>> {
  try {
    const profile = await prisma.profile.update({
      where: {
        user_id: userId,
        role: Role.employer,
      },
      data: {
        is_verified: isVerified,
      },
    });

    revalidatePath(`/profile/${userId}`);

    return {
      success: true,
      data: profile,
      message: `Company ${isVerified ? "verified" : "unverified"} successfully`,
    };
  } catch (error) {
    console.error("Error verifying company:", error);
    return {
      success: false,
      error: "Failed to verify company",
    };
  }
}

// Type definitions
export interface CompanyRegistrationInput {
  companyName: string;
  industry: string;
  companySize: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  description: string;
  registrationNumber?: string;
  taxId?: string;
  contactPersonName: string;
  contactPersonRole: string;
  password: string;
  confirmPassword: string;
}

interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
