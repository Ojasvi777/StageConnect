import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { getUserProfile, getProfileStats, getProfileHighlights } from "../../Actions/profile";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  // Get the current user session
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  // Safety check
  if (!userId) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-[#2E2E2E] mb-2">Error</h2>
          <p className="text-[#6B6B6B]">Unable to retrieve user session</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Fetch all profile data on the server
  const [profileResult, statsResult, highlightsResult] = await Promise.all([
    getUserProfile(userId),
    getProfileStats(userId),
    getProfileHighlights(userId),
  ]);

  if (!profileResult.success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-[#2E2E2E] mb-2">Error</h2>
          <p className="text-[#6B6B6B]">{profileResult.error || "Failed to load profile"}</p>
        </div>
        <Footer />
      </main>
    );
  }

  const user = profileResult.data;
  const stats = statsResult.success && statsResult.data
    ? statsResult.data 
    : { gigCount: 0, auditionsCount: 0, portfolioCount: 0, connectionsCount: 0 };
  const highlights = highlightsResult.success && highlightsResult.data ? highlightsResult.data : [];

  return (
    <main>
      <Navbar />
      <ProfileClient user={user} stats={stats} highlights={highlights} />
      <Footer />
    </main>
  );
}
