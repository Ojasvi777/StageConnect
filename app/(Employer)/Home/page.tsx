"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import {
  FaUsers,
  FaEye,
  FaArrowUp,
  FaBriefcase,
  FaFileAlt,
  FaChartLine,
  FaUserCheck,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getCompanyAnalytics, getCompanyJobs } from "../../Actions/analytics";
import Link from "next/link";

interface CompanyAnalytics {
  profileViews: number;
  connections: number;
  connectionsGrowth: number;
  activeJobs: number;
  totalApplications: number;
  viewsGrowth: number;
  monthlyViews: { month: string; views: number }[];
  applicationsByStatus: { status: string; count: number }[];
  recentActivity: {
    type: string;
    title: string;
    date: Date;
    metadata?: {
      status?: string;
      [key: string]: unknown;
    };
  }[];
}

interface Job {
  job_id: string;
  title: string;
  location: string;
  status: string;
  description: string;
  city?: string;
  state?: string;
  applicationCount?: number;
  newApplications?: number;
  posted_at: string | Date;
}

function EmployerHomeContent() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<CompanyAnalytics | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userId = (session?.user as { id: string })?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const [analyticsResult, jobsResult] = await Promise.all([
          getCompanyAnalytics(userId),
          getCompanyJobs(userId),
        ]);

        if (analyticsResult.success && analyticsResult.data) {
          setAnalytics(analyticsResult.data);
        }

        if (jobsResult.success && jobsResult.data) {
          setJobs(jobsResult.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [session]);

  const maxViews = analytics
    ? Math.max(...analytics.monthlyViews.map((m) => m.views))
    : 1;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#FEF2CB] to-[#FFF7DF] py-12 px-6 md:px-12 mt-16 border-b-2 border-[#F3E6C9]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-[#2E2E2E] font-bold mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] bg-clip-text text-transparent">
              {session?.user?.name || "Company"}
            </span>
            ! 👋
          </h1>
          <p className="text-lg text-[#6B6B6B]">
            Track your performance and manage your talent acquisition.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#D4AF37]"></div>
        </div>
      ) : !analytics ? (
        <div className="flex-1 text-center py-20">
          <p className="text-[#6B6B6B] text-lg">Unable to load analytics data</p>
        </div>
      ) : (
        <div className="flex-1 px-6 md:px-12 py-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Profile Views */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-xl flex items-center justify-center shadow-md">
                    <FaEye className="text-white text-2xl" />
                  </div>
                  <span className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                    <FaArrowUp className="mr-1" />
                    +{analytics.viewsGrowth}%
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[#2E2E2E] mb-1">
                  {analytics.profileViews.toLocaleString()}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-medium">
                  Profile Views
                </p>
              </div>

              {/* Connections */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8] rounded-xl flex items-center justify-center shadow-md">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                  <span className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                    <FaArrowUp className="mr-1" />
                    +{analytics.connectionsGrowth}%
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[#2E2E2E] mb-1">
                  {analytics.connections.toLocaleString()}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-medium">
                  Connections
                </p>
              </div>

              {/* Active Jobs */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#9B59B6] to-[#C39BD3] rounded-xl flex items-center justify-center shadow-md">
                    <FaBriefcase className="text-white text-2xl" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#2E2E2E] mb-1">
                  {analytics.activeJobs}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-medium">Active Jobs</p>
              </div>

              {/* Total Applications */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#E74C3C] to-[#F1948A] rounded-xl flex items-center justify-center shadow-md">
                    <FaFileAlt className="text-white text-2xl" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-[#2E2E2E] mb-1">
                  {analytics.totalApplications.toLocaleString()}
                </h3>
                <p className="text-sm text-[#6B6B6B] font-medium">
                  Total Applications
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Views Chart */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-lg flex items-center justify-center">
                    <FaChartLine className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">
                    Profile Views Trend
                  </h3>
                </div>
                <div className="space-y-5">
                  {analytics.monthlyViews.map((data, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6B6B6B] font-semibold">
                          {data.month}
                        </span>
                        <span className="text-[#2E2E2E] font-bold">
                          {data.views.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] h-3 rounded-full transition-all duration-700 ease-out shadow-sm"
                          style={{ width: `${(data.views / maxViews) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications by Status */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8] rounded-lg flex items-center justify-center">
                    <FaUserCheck className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">
                    Applications Status
                  </h3>
                </div>
                <div className="space-y-5">
                  {analytics.applicationsByStatus.length > 0 ? (
                    analytics.applicationsByStatus.map((item, index) => {
                      const colors = [
                        {
                          bg: "bg-blue-100",
                          text: "text-blue-700",
                          bar: "from-blue-400 to-blue-600",
                        },
                        {
                          bg: "bg-green-100",
                          text: "text-green-700",
                          bar: "from-green-400 to-green-600",
                        },
                        {
                          bg: "bg-yellow-100",
                          text: "text-yellow-700",
                          bar: "from-yellow-400 to-yellow-600",
                        },
                        {
                          bg: "bg-purple-100",
                          text: "text-purple-700",
                          bar: "from-purple-400 to-purple-600",
                        },
                        {
                          bg: "bg-red-100",
                          text: "text-red-700",
                          bar: "from-red-400 to-red-600",
                        },
                      ];
                      const color = colors[index % colors.length];
                      const percentage =
                        (item.count / analytics.totalApplications) * 100;

                      return (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span
                              className={`${color.bg} ${color.text} px-3 py-1 rounded-full text-xs font-bold`}
                            >
                              {item.status}
                            </span>
                            <span className="text-[#2E2E2E] font-bold">
                              {item.count}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                            <div
                              className={`bg-gradient-to-r ${color.bar} h-2.5 rounded-full transition-all duration-700 ease-out`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-[#6B6B6B]">No applications yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity & Posted Jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#9B59B6] to-[#C39BD3] rounded-lg flex items-center justify-center">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2E2E2E]">
                    Recent Activity
                  </h3>
                </div>
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {analytics.recentActivity.length > 0 ? (
                    analytics.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#FFF7DF] transition-all border border-transparent hover:border-[#F3E6C9]"
                      >
                        <div className="w-11 h-11 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                          <FaFileAlt className="text-white text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#2E2E2E] font-semibold line-clamp-2">
                            {activity.title}
                          </p>
                          <p className="text-xs text-[#6B6B6B] mt-1">
                            {new Date(activity.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                          {activity.metadata?.status?.replace("_", " ")}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-[#6B6B6B]">No recent activity</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Posted Jobs */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#E74C3C] to-[#F1948A] rounded-lg flex items-center justify-center">
                      <FaBriefcase className="text-white text-lg" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2E2E2E]">
                      Posted Jobs
                    </h3>
                  </div>
                  <Link
                    href="/Jobs"
                    className="text-sm text-[#D4AF37] hover:text-[#B8941F] font-bold hover:underline transition-colors"
                  >
                    View All →
                  </Link>
                </div>
                <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <div
                        key={job.job_id}
                        className="p-4 rounded-xl border-2 border-[#F3E6C9] hover:shadow-lg transition-all bg-white/70 hover:bg-white"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-[#2E2E2E] line-clamp-1 flex-1">
                            {job.title}
                          </h4>
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-bold ml-2 whitespace-nowrap ${
                              job.status === "active"
                                ? "bg-green-100 text-green-700"
                                : job.status === "draft"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {job.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-3">
                          {job.description}
                        </p>
                        {job.city && (
                          <p className="text-xs text-[#6B6B6B] flex items-center gap-1 mb-3">
                            <FaMapMarkerAlt className="text-[#D4AF37]" />
                            {job.city}
                            {job.state && `, ${job.state}`}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1 text-[#6B6B6B] font-semibold">
                              <FaFileAlt className="text-[#D4AF37]" />
                              {job.applicationCount} applications
                            </span>
                            {(job.newApplications ?? 0) > 0 && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full font-bold shadow-sm">
                                {job.newApplications} new
                              </span>
                            )}
                          </div>
                          <span className="text-[#6B6B6B]">
                            {new Date(job.posted_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <FaBriefcase className="text-white text-3xl" />
                      </div>
                      <p className="text-[#6B6B6B] mb-4 font-medium">
                        No jobs posted yet
                      </p>
                      <Link
                        href="/Jobs/create"
                        className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all hover:scale-105"
                      >
                        Post Your First Job
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-[#FEF2CB] to-[#FFF7DF] border-2 border-[#F3E6C9] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#2E2E2E] mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href="/Jobs/create"
                  className="flex items-center gap-4 p-5 bg-white rounded-xl hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-[#D4AF37]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-xl flex items-center justify-center shadow-md">
                    <FaBriefcase className="text-white text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2E2E2E] text-lg">
                      Post a Job
                    </h4>
                    <p className="text-sm text-[#6B6B6B]">Find top talent</p>
                  </div>
                </Link>

                <Link
                  href="/Findtalent"
                  className="flex items-center gap-4 p-5 bg-white rounded-xl hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-[#4A90E2]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8] rounded-xl flex items-center justify-center shadow-md">
                    <FaUsers className="text-white text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2E2E2E] text-lg">
                      Browse Talent
                    </h4>
                    <p className="text-sm text-[#6B6B6B]">
                      Discover professionals
                    </p>
                  </div>
                </Link>

                <Link
                  href="/Profile"
                  className="flex items-center gap-4 p-5 bg-white rounded-xl hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-[#9B59B6]"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#9B59B6] to-[#C39BD3] rounded-xl flex items-center justify-center shadow-md">
                    <FaUserCheck className="text-white text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2E2E2E] text-lg">
                      Edit Profile
                    </h4>
                    <p className="text-sm text-[#6B6B6B]">
                      Update company info
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b8941f;
        }
      `}</style>
    </div>
  );
}

export default function EmployerHome() {
  return (
    <SessionProvider>
      <EmployerHomeContent />
    </SessionProvider>
  );
}
