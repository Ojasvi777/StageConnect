"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  getActiveJobs,
  hasUserApplied,
} from "../Actions/jobs";
import { submitAudition } from "../Actions/auditions";
import { getUserPortfolio } from "../Actions/portfolio";
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  Users,
  Clock,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

type Job = {
  job_id: string;
  title: string;
  description: string;
  talent_category: string;
  location_type: string;
  city: string | null;
  state: string | null;
  job_type: string;
  compensation_min: any;
  compensation_max: any;
  application_deadline: Date;
  event_date: Date | null;
  posted_at: Date;
  profile: {
    company_name: string | null;
    company_logo_url: string | null;
    user: {
      name: string | null;
    };
  };
  _count: {
    auditions: number;
  };
};

type Portfolio = {
  portfolio_id: string;
  title: string | null;
  description: string | null;
  media_url: string;
  media_type: string;
  thumbnail_url: string | null;
};

export default function JobsPage() {
  const { data: session, status } = useSession();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [applicationData, setApplicationData] = useState({
    portfolioId: "",
    coverLetter: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    loadJobs();
    if (status === "authenticated" && session?.user) {
      loadPortfolio();
    }
  }, [status, session]);

  const loadJobs = async () => {
    setLoading(true);
    const result = await getActiveJobs();

    if (result.success && result.data) {
      setJobs(result.data as any);
      setError(null);
      
      // Check application status for each job
      if (status === "authenticated" && session?.user) {
        checkApplicationStatuses(result.data as any);
      }
    } else {
      setError(result.error || "Failed to load jobs");
    }
    setLoading(false);
  };

  const checkApplicationStatuses = async (jobsList: Job[]) => {
    if (!session?.user || !(session.user as any)?.id) return;
    
    const statuses: { [key: string]: boolean } = {};
    
    for (const job of jobsList) {
      const result = await hasUserApplied((session.user as any).id, job.job_id);
      if (result.success && result.data !== undefined) {
        statuses[job.job_id] = result.data;
      }
    }
    
    setApplicationStatus(statuses);
  };

  const loadPortfolio = async () => {
    if (!session?.user || !(session.user as any)?.id) return;

    const result = await getUserPortfolio((session.user as any).id);
    if (result.success && result.data) {
      setPortfolio(result.data as any);
    }
  };

  const handleApplyClick = async (job: Job) => {
    if (status !== "authenticated") {
      alert("Please sign in to apply for jobs");
      return;
    }

    setSelectedJob(job);
    setShowApplicationModal(true);
    setApplicationData({ portfolioId: "", coverLetter: "" });
  };

  const handleSubmitApplication = async () => {
    if (!session?.user || !(session.user as any)?.id || !selectedJob) return;

    setSubmitting(true);
    const result = await submitAudition({
      userId: (session.user as any).id,
      jobId: selectedJob.job_id,
      portfolioId: applicationData.portfolioId || undefined,
      coverLetter: applicationData.coverLetter || undefined,
    });

    if (result.success) {
      alert("Application submitted successfully!");
      setShowApplicationModal(false);
      setApplicationStatus({
        ...applicationStatus,
        [selectedJob.job_id]: true,
      });
    } else {
      alert(result.error || "Failed to submit application");
    }
    setSubmitting(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCategory = (category: string) => {
    return category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const isDeadlineSoon = (deadline: Date) => {
    const daysUntilDeadline = Math.ceil(
      (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilDeadline <= 7;
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-12 h-12 animate-spin text-[#D4AF37]" />
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC]">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[60vh] px-6">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-[#2E2E2E] mb-2">Error</h2>
          <p className="text-[#6B6B6B]">{error}</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20 px-6">
        {/* HEADER */}
        <div className="py-10 bg-[#FFF2CC] px-6 rounded-2xl shadow-sm mt-6">
          <h1 className="text-4xl font-extrabold text-[#2E2E2E]">
            🎬 Browse Opportunities
          </h1>
          <p className="text-[#6B6B6B] mt-2">
            Discover auditions and gigs that match your talent
          </p>
        </div>

        {/* JOBS GRID */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {jobs.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-[#6B6B6B]">
                No active jobs available at the moment
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <motion.div
                key={job.job_id}
                whileHover={{ y: -6 }}
                className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col"
              >
                {/* Company Logo */}
                {job.profile.company_logo_url && (
                  <img
                    src={job.profile.company_logo_url}
                    alt={job.profile.company_name || "Company"}
                    className="w-12 h-12 rounded-lg mb-3 object-cover"
                  />
                )}

                {/* Job Title */}
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-2">
                  {job.title}
                </h3>

                {/* Company Name */}
                <p className="text-sm text-[#6B6B6B] mb-3">
                  🏢 {job.profile.company_name || job.profile.user.name}
                </p>

                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] text-xs font-semibold rounded-full border border-[#F3E6C9] mb-3 w-fit">
                  {formatCategory(job.talent_category)}
                </span>

                {/* Job Details */}
                <div className="space-y-2 text-sm text-[#6B6B6B] flex-grow">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>
                      {formatCategory(job.location_type)}
                      {job.city && ` · ${job.city}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                    <span>{formatCategory(job.job_type)}</span>
                  </div>

                  {job.compensation_min && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                      <span>
                        ${job.compensation_min.toString()}
                        {job.compensation_max &&
                          ` - $${job.compensation_max.toString()}`}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span
                      className={
                        isDeadlineSoon(job.application_deadline)
                          ? "text-red-500 font-semibold"
                          : ""
                      }
                    >
                      Apply by {formatDate(job.application_deadline)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                    <span>{job._count.auditions} applicants</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  {applicationStatus[job.job_id] ? (
                    <button
                      disabled
                      className="w-full bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Already Applied
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleApplyClick(job)}
                      className="w-full bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                    >
                      Apply Now
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {showApplicationModal && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowApplicationModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#2E2E2E]">
                    Apply for {selectedJob.title}
                  </h2>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    {selectedJob.profile.company_name || selectedJob.profile.user.name}
                  </p>
                </div>
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Job Description */}
              <div className="mb-6 p-4 bg-[#FFF8E7] rounded-lg border border-[#F3E6C9]">
                <h3 className="font-semibold text-[#2E2E2E] mb-2">
                  Job Description
                </h3>
                <p className="text-sm text-[#6B6B6B] whitespace-pre-wrap">
                  {selectedJob.description}
                </p>
              </div>

              {/* Portfolio Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2E2E2E] mb-2">
                  Select Portfolio Item (Optional)
                </label>
                <select
                  value={applicationData.portfolioId}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      portfolioId: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                >
                  <option value="">None</option>
                  {portfolio.map((item) => (
                    <option key={item.portfolio_id} value={item.portfolio_id}>
                      {item.title || "Untitled"} - {formatCategory(item.media_type)}
                    </option>
                  ))}
                </select>
                {portfolio.length === 0 && (
                  <p className="text-xs text-[#6B6B6B] mt-1">
                    You don&apos;t have any portfolio items yet
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#2E2E2E] mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value,
                    })
                  }
                  placeholder="Tell the employer why you're perfect for this role..."
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:ring-2 focus:ring-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  disabled={submitting}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitApplication}
                  disabled={submitting}
                  className="flex-1 bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
