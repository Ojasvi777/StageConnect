"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  FaUsers,
  FaEye,
  FaArrowUp,
  FaBriefcase,
  FaFileAlt,
  FaChartLine,
  FaUserCheck,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { getCompanyAnalytics, getCompanyJobs } from "../Actions/analytics";
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
    metadata?: any;
  }[];
}

export default function CompanyDashboard() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<CompanyAnalytics | null>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const userId = (session?.user as any)?.id;
      if (!userId) return;

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load analytics data</p>
      </div>
    );
  }

  const maxViews = Math.max(...analytics.monthlyViews.map((m) => m.views));

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profile Views */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-xl flex items-center justify-center">
              <FaEye className="text-white text-xl" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <FaArrowUp className="mr-1" />
              +{analytics.viewsGrowth}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
            {analytics.profileViews.toLocaleString()}
          </h3>
          <p className="text-sm text-[#6B6B6B]">Profile Views</p>
        </div>

        {/* Connections */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8] rounded-xl flex items-center justify-center">
              <FaUsers className="text-white text-xl" />
            </div>
            <span className="flex items-center text-green-600 text-sm font-semibold">
              <FaArrowUp className="mr-1" />
              +{analytics.connectionsGrowth}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
            {analytics.connections.toLocaleString()}
          </h3>
          <p className="text-sm text-[#6B6B6B]">Connections</p>
        </div>

        {/* Active Jobs */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#9B59B6] to-[#C39BD3] rounded-xl flex items-center justify-center">
              <FaBriefcase className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
            {analytics.activeJobs}
          </h3>
          <p className="text-sm text-[#6B6B6B]">Active Jobs</p>
        </div>

        {/* Total Applications */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#E74C3C] to-[#F1948A] rounded-xl flex items-center justify-center">
              <FaFileAlt className="text-white text-xl" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#2E2E2E] mb-1">
            {analytics.totalApplications.toLocaleString()}
          </h3>
          <p className="text-sm text-[#6B6B6B]">Total Applications</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Views Chart */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <FaChartLine className="text-[#D4AF37] text-xl" />
            <h3 className="text-xl font-bold text-[#2E2E2E]">
              Profile Views Trend
            </h3>
          </div>
          <div className="space-y-4">
            {analytics.monthlyViews.map((data, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#6B6B6B] font-medium">{data.month}</span>
                  <span className="text-[#2E2E2E] font-semibold">
                    {data.views}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(data.views / maxViews) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications by Status */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <FaUserCheck className="text-[#4A90E2] text-xl" />
            <h3 className="text-xl font-bold text-[#2E2E2E]">
              Applications Status
            </h3>
          </div>
          <div className="space-y-4">
            {analytics.applicationsByStatus.length > 0 ? (
              analytics.applicationsByStatus.map((item, index) => {
                const colors = [
                  { bg: "bg-blue-100", text: "text-blue-700", bar: "from-blue-400 to-blue-600" },
                  { bg: "bg-green-100", text: "text-green-700", bar: "from-green-400 to-green-600" },
                  { bg: "bg-yellow-100", text: "text-yellow-700", bar: "from-yellow-400 to-yellow-600" },
                  { bg: "bg-purple-100", text: "text-purple-700", bar: "from-purple-400 to-purple-600" },
                  { bg: "bg-red-100", text: "text-red-700", bar: "from-red-400 to-red-600" },
                ];
                const color = colors[index % colors.length];
                const percentage = (item.count / analytics.totalApplications) * 100;

                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`${color.bg} ${color.text} px-3 py-1 rounded-full text-xs font-semibold`}>
                        {item.status}
                      </span>
                      <span className="text-[#2E2E2E] font-semibold">
                        {item.count}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${color.bar} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-[#6B6B6B] py-8">No applications yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity & Posted Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <FaClock className="text-[#9B59B6] text-xl" />
            <h3 className="text-xl font-bold text-[#2E2E2E]">Recent Activity</h3>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {analytics.recentActivity.length > 0 ? (
              analytics.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaFileAlt className="text-white text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#2E2E2E] font-medium line-clamp-2">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {activity.metadata?.status?.replace("_", " ")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-[#6B6B6B] py-8">No recent activity</p>
            )}
          </div>
        </div>

        {/* Posted Jobs */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-[#E74C3C] text-xl" />
              <h3 className="text-xl font-bold text-[#2E2E2E]">Posted Jobs</h3>
            </div>
            <Link
              href="/Jobs"
              className="text-sm text-[#D4AF37] hover:underline font-semibold"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job.job_id}
                  className="p-4 rounded-lg border border-[#F3E6C9] hover:shadow-md transition-shadow bg-white/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-[#2E2E2E] line-clamp-1">
                      {job.title}
                    </h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        job.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] line-clamp-2 mb-3">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-[#6B6B6B]">
                        <FaFileAlt className="text-[#D4AF37]" />
                        {job.applicationCount} applications
                      </span>
                      {job.newApplications > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full">
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
              <div className="text-center py-8">
                <p className="text-[#6B6B6B] mb-4">No jobs posted yet</p>
                <Link
                  href="/Jobs/create"
                  className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Post Your First Job
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#FEF2CB] to-[#FFF7DF] border border-[#F3E6C9] rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-[#2E2E2E] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/Jobs/create"
            className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F7D76A] rounded-lg flex items-center justify-center">
              <FaBriefcase className="text-white text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-[#2E2E2E]">Post a Job</h4>
              <p className="text-xs text-[#6B6B6B]">Find top talent</p>
            </div>
          </Link>

          <Link
            href="/Findtalent"
            className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#4A90E2] to-[#7CB9E8] rounded-lg flex items-center justify-center">
              <FaUsers className="text-white text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-[#2E2E2E]">Browse Talent</h4>
              <p className="text-xs text-[#6B6B6B]">Discover professionals</p>
            </div>
          </Link>

          <Link
            href="/Profile"
            className="flex items-center gap-3 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#9B59B6] to-[#C39BD3] rounded-lg flex items-center justify-center">
              <FaUserCheck className="text-white text-xl" />
            </div>
            <div>
              <h4 className="font-semibold text-[#2E2E2E]">Edit Profile</h4>
              <p className="text-xs text-[#6B6B6B]">Update company info</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
