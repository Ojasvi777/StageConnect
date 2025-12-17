"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRole } from "../Components/RoleProvider";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function HomePage() {
  const { data: session, status } = useSession();
  const { role, loading: roleLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    // Wait for session and role to load
    if (status === "loading" || roleLoading) {
      return;
    }

    // If not authenticated, redirect to login
    if (!session) {
      router.push("/login");
      return;
    }

    // Redirect based on role
    if (role === "employer") {
      router.push("/employer/dashboard");
    } else if (role === "talent") {
      router.push("/talent/home");
    }
  }, [session, status, role, roleLoading, router]);

  // Show loading state
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-[#6B6B6B] text-lg">Loading your dashboard...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
