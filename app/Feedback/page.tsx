"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

interface FeedbackFormData {
  name: string;
  email: string;
  feedbackType: "bug" | "feature" | "improvement" | "other";
  title: string;
  description: string;
  rating: number;
}

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    feedbackType: "improvement",
    title: "",
    description: "",
    rating: 5,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.title.trim() ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Here you would typically send the feedback to your backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form and show success message
      setFormData({
        name: "",
        email: "",
        feedbackType: "improvement",
        title: "",
        description: "",
        rating: 5,
      });
      setSubmitted(true);

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20">
        {/* Header */}
        <div className="text-center py-12 md:py-16 px-4 bg-[#FFF2CC] shadow-sm">
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#2E2E2E]">
            We Value Your Feedback
          </h1>
          <p className="text-[#6B6B6B] mt-2 md:mt-3 text-base md:text-lg">
            Help us improve StageConnect by sharing your thoughts, suggestions,
            and bug reports
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 md:px-6 mt-8 md:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Info Cards */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="space-y-3 md:space-y-4">
                {/* Card 1 */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-[#F3E6C9] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3">💡</div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1 md:mb-2 text-sm md:text-base">
                    Feature Requests
                  </h3>
                  <p className="text-xs md:text-sm text-[#6B6B6B]">
                    Suggest new features that would make your experience better
                  </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-[#F3E6C9] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3">🐛</div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1 md:mb-2 text-sm md:text-base">
                    Report Bugs
                  </h3>
                  <p className="text-xs md:text-sm text-[#6B6B6B]">
                    Let us know if you find any issues or broken features
                  </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-[#F3E6C9] rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-2xl md:text-3xl mb-2 md:mb-3">⭐</div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1 md:mb-2 text-sm md:text-base">
                    Rate Experience
                  </h3>
                  <p className="text-xs md:text-sm text-[#6B6B6B]">
                    Share your overall satisfaction with the platform
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-xl md:rounded-2xl p-5 md:p-8 shadow-sm"
              >
                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">
                        Thank you for your feedback!
                      </h4>
                      <p className="text-sm text-green-700 mt-1">
                        We appreciate your input and will review it shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-800">Error</h4>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-[#6B6B6B] mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-3 md:px-4 py-2.5 md:py-2 text-sm md:text-base rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-[#6B6B6B] mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-3 md:px-4 py-2.5 md:py-2 text-sm md:text-base rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                    />
                  </div>

                  {/* Feedback Type */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-[#6B6B6B] mb-2">
                      Feedback Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-2 text-sm md:text-base rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                    >
                      <option value="improvement">Improvement</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-[#6B6B6B] mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Brief title of your feedback"
                      maxLength={100}
                      className="w-full px-3 md:px-4 py-2.5 md:py-2 text-sm md:text-base rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition"
                    />
                    <p className="text-xs md:text-xs text-[#B0B0B0] mt-1">
                      {formData.title.length}/100
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-[#6B6B6B] mb-2">
                      Detailed Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please provide detailed feedback or suggestions..."
                      maxLength={1000}
                      rows={4}
                      className="w-full px-3 md:px-4 py-2.5 md:py-2 text-sm md:text-base rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] placeholder-[#B0B0B0] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition resize-none"
                    />
                    <p className="text-xs md:text-xs text-[#B0B0B0] mt-1">
                      {formData.description.length}/1000
                    </p>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-[#6B6B6B] mb-3">
                      How would you rate your experience?
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, rating: star }))
                          }
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`text-3xl transition ${
                            star <= formData.rating
                              ? "text-[#D4AF37]"
                              : "text-[#E0E0E0]"
                          }`}
                        >
                          ★
                        </motion.button>
                      ))}
                      <span className="text-sm text-[#6B6B6B] ml-2">
                        {formData.rating} / 5
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {loading ? "Sending..." : "Send Feedback"}
                  </motion.button>

                  <p className="text-xs text-[#B0B0B0] text-center">
                    We read and value every piece of feedback. Thank you for
                    helping us improve!
                  </p>
                </form>
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-[#2E2E2E] mb-8">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "How long does it take to see my feedback implemented?",
                  a: "We review all feedback within 48 hours. Implementation time depends on the complexity and priority of the request.",
                },
                {
                  q: "Will I be notified if my feature request is implemented?",
                  a: "Yes! We'll send you an email notification when your suggested feature is rolled out.",
                },
                {
                  q: "How can I track the status of my bug report?",
                  a: "Our team will respond to your email with updates on bug fixes. Critical issues are prioritized.",
                },
                {
                  q: "Can I submit feedback anonymously?",
                  a: "We encourage you to provide your email so we can follow up. However, you can use a generic email if preferred.",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  className="bg-white border border-[#F3E6C9] rounded-xl p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-[#D4AF37] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[#6B6B6B]">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
