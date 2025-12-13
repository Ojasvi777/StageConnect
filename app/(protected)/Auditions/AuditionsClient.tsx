"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, TrendingUp } from "lucide-react";
import { withdrawAudition, deleteAudition } from "../../Actions/auditions";
import { useRouter } from "next/navigation";

type AuditionStatus = "submitted" | "under_review" | "shortlisted" | "audition_scheduled" | "selected" | "rejected" | "withdrawn";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface AuditionData {
  audition_id: string;
  status: AuditionStatus;
  submitted_at: Date;
  cover_letter: string | null;
  audition_notes: string | null;
  rating: number | null;
  job: {
    job_id: string;
    title: string;
    location_type: string;
    city: string | null;
    event_date: Date | null;
    compensation_min: number | null | { toNumber?: () => number };
    compensation_max: number | null | { toNumber?: () => number };
    profile: {
      company_name: string | null;
      contact_person_name: string | null;
      user: {
        name: string | null;
      };
    };
  };
  portfolio: {
    title: string | null;
    media_url: string;
    media_type: string;
  } | null;
}

type Stats = {
  total: number;
  byStatus?: Record<string, number>;
};

export function AuditionsClient({ 
  initialAuditions, 
  initialStats 
}: { 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialAuditions: any[];
  initialStats: Stats | undefined;
}) {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const stats = initialStats || { total: 0, byStatus: {} };

  const handleWithdraw = async (auditionId: string) => {
    if (!confirm("Are you sure you want to withdraw this audition?")) return;
    
    const result = await withdrawAudition(auditionId);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to withdraw audition");
    }
  };

  const handleDelete = async (auditionId: string) => {
    if (!confirm("Are you sure you want to delete this audition? This cannot be undone.")) return;
    
    const result = await deleteAudition(auditionId);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete audition");
    }
  };

  const filteredAuditions = initialAuditions.filter(
    (audition) =>
      statusFilter === "All" || audition.status === statusFilter
  );

  const getStatusColor = (status: AuditionStatus) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "under_review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shortlisted":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "audition_scheduled":
        return "bg-[#D4AF37] text-white border-[#D4AF37]";
      case "selected":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "withdrawn":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatStatus = (status: AuditionStatus) => {
    return status.split("_").map((word: string) => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number | null | undefined | { toNumber?: () => number }) => {
    if (!amount) return "N/A";
    const numAmount = typeof amount === 'object' && 'toNumber' in amount ? amount.toNumber?.() ?? 0 : Number(amount);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(numAmount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20 px-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center py-10 bg-[#FFF2CC] px-6 rounded-2xl shadow-sm mt-6">
        <div>
          <h1 className="text-4xl font-extrabold text-[#2E2E2E]">🎭 My Auditions</h1>
          <p className="text-[#6B6B6B] mt-2">
            Total: {stats.total} auditions
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white text-[#2E2E2E] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="audition_scheduled">Audition Scheduled</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#F3E6C9] rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-[#D4AF37]" />
            <div>
              <p className="text-sm text-[#6B6B6B]">Total</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#F3E6C9] rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-[#6B6B6B]">Pending</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">
                {(stats.byStatus?.submitted || 0) + (stats.byStatus?.under_review || 0)}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#F3E6C9] rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-[#6B6B6B]">Scheduled</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">
                {stats.byStatus?.audition_scheduled || 0}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="bg-white border border-[#F3E6C9] rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div>
              <p className="text-sm text-[#6B6B6B]">Selected</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">
                {stats.byStatus?.selected || 0}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AUDITION LIST */}
      <div className="mt-10 flex flex-col gap-6 max-w-5xl mx-auto">
        {filteredAuditions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#6B6B6B]">
              {statusFilter === "All" 
                ? "No auditions yet. Start applying to jobs!" 
                : `No auditions with status: ${formatStatus(statusFilter as AuditionStatus)}`
              }
            </p>
          </div>
        ) : (
          filteredAuditions.map((audition) => (
            <motion.div
              key={audition.audition_id}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* TOP SECTION */}
              <div className="flex justify-between items-start flex-wrap gap-3">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">
                    {audition.job.title}
                  </h2>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    🏢 {audition.job.profile.company_name || audition.job.profile.user.name}
                  </p>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    📅 Submitted {formatDate(audition.submitted_at)}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#6B6B6B]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {audition.job.city || "Remote"}
                    </span>
                    {audition.job.event_date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(audition.job.event_date)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      audition.status
                    )}`}
                  >
                    {formatStatus(audition.status)}
                  </span>
                  {audition.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{audition.rating}/5</span>
                    </div>
                  )}
                </div>
              </div>

              {/* COMPENSATION */}
              {(audition.job.compensation_min || audition.job.compensation_max) && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    💰 Compensation: {formatCurrency(audition.job.compensation_min)} - {formatCurrency(audition.job.compensation_max)}
                  </p>
                </div>
              )}

              {/* COVER LETTER */}
              {audition.cover_letter && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#2E2E2E] mb-2">Cover Letter</h3>
                  <p className="text-sm text-[#6B6B6B] bg-gray-50 p-3 rounded-lg">
                    {audition.cover_letter}
                  </p>
                </div>
              )}

              {/* AUDITION NOTES */}
              {audition.audition_notes && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#2E2E2E] mb-2">Employer Notes</h3>
                  <p className="text-sm text-[#6B6B6B] bg-blue-50 p-3 rounded-lg border border-blue-200">
                    {audition.audition_notes}
                  </p>
                </div>
              )}

              {/* PORTFOLIO REFERENCE */}
              {audition.portfolio && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-[#2E2E2E] mb-2">Submitted Portfolio</h3>
                  <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <span className="text-2xl">
                      {audition.portfolio.media_type === "video" && "🎥"}
                      {audition.portfolio.media_type === "image" && "📷"}
                      {audition.portfolio.media_type === "audio" && "🎵"}
                      {audition.portfolio.media_type === "document" && "📄"}
                    </span>
                    <span className="text-sm text-[#6B6B6B]">
                      {audition.portfolio.title}
                    </span>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="mt-6 flex gap-3 flex-wrap">
                {audition.status !== "withdrawn" && audition.status !== "selected" && (
                  <button
                    onClick={() => handleWithdraw(audition.audition_id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-sm font-medium"
                  >
                    Withdraw Application
                  </button>
                )}
                {(audition.status === "rejected" || audition.status === "withdrawn") && (
                  <button
                    onClick={() => handleDelete(audition.audition_id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
                <a
                  href={`/Jobs/${audition.job.job_id}`}
                  className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#C5A028] transition text-sm font-medium"
                >
                  View Job Details
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
