import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { getUserAuditions, getAuditionStats } from "../../Actions/auditions";
import { AuditionsClient } from "./AuditionsClient";

export default async function AuditionsPage() {
  // No need to check auth here - the (protected) layout already handles it
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id: string })?.id;

  // Safety check (should never happen due to layout protection)
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

  // Fetch data on the server - NO client-side API calls!
  const [auditionsResult, statsResult] = await Promise.all([
    getUserAuditions(userId),
    getAuditionStats(userId),
  ]);

  if (!auditionsResult.success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-[#2E2E2E] mb-2">Error</h2>
          <p className="text-[#6B6B6B]">{auditionsResult.error || "Failed to load auditions"}</p>
        </div>
        <Footer />
      </main>
    );
  }

  const auditions = auditionsResult.data || [];
  const stats = statsResult.success ? statsResult.data : { total: 0, byStatus: {} };

  return (
    <main>
      <Navbar />
      <AuditionsClient initialAuditions={auditions} initialStats={stats} />
      <Footer />
    </main>
  );
}
