"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";

/**
 * Get the role of the currently authenticated user
 */
export async function getCurrentUserRole(): Promise<string | null> {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return null;
    }

    const userId = (session.user as any).id;
    
    const profile = await prisma.profile.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });

    return profile?.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

/**
 * Get the role of a specific user by ID
 */
export async function getUserRole(userId: string): Promise<string | null> {
  try {
    const profile = await prisma.profile.findUnique({
      where: { user_id: userId },
      select: { role: true },
    });

    return profile?.role || null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

/**
 * Check if the current user is an employer
 */
export async function isEmployer(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role === "employer";
}

/**
 * Check if the current user is talent
 */
export async function isTalent(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role === "talent";
}
