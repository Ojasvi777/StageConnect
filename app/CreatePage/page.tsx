"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaIndustry } from "react-icons/fa";
import { registerCompany } from "../Actions/company";

export default function CreatePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    description: "",
    registrationNumber: "",
    taxId: "",
    contactPersonName: "",
    contactPersonRole: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await registerCompany(formData);

      if (result.success) {
        setSuccess(result.message || "Company registered successfully!");
        // Redirect to Employer Home page after 2 seconds
        setTimeout(() => {
          router.push("/Home");
        }, 2000);
      } else {
        setError(result.error || "Failed to register company");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans">
      <Navbar />

      <div className="flex-1 px-4 md:px-8 lg:px-16 py-12 mt-16">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#2E2E2E]">
              Register Your{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] bg-clip-text text-transparent">
                Company
              </span>
            </h1>
            <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
              Join StageConnect and discover talented performers, models, dancers, and more for your next production.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">Why Join StageConnect?</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎭</div>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">Access Top Talent</h3>
                  <p className="text-sm text-[#6B6B6B]">Browse verified profiles of actors, models, and performers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📋</div>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">Easy Audition Management</h3>
                  <p className="text-sm text-[#6B6B6B]">Post auditions and manage applications seamlessly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🤝</div>
                <div>
                  <h3 className="font-semibold text-[#2E2E2E]">Build Connections</h3>
                  <p className="text-sm text-[#6B6B6B]">Network with industry professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl shadow-lg p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm font-medium">{success}</p>
              </div>
            )}

            {/* Company Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6 flex items-center gap-2">
                <FaBuilding className="text-[#D4AF37]" />
                Company Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  >
                    <option value="">Select industry</option>
                    <option value="film">Film & Television</option>
                    <option value="theater">Theater</option>
                    <option value="fashion">Fashion & Modeling</option>
                    <option value="music">Music & Entertainment</option>
                    <option value="advertising">Advertising</option>
                    <option value="events">Event Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Company Size <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Company Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your company..."
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6 flex items-center gap-2">
                <FaEnvelope className="text-[#D4AF37]" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="company@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Contact Person Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Contact Person Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPersonRole"
                    value={formData.contactPersonRole}
                    onChange={handleChange}
                    required
                    placeholder="HR Manager, Casting Director, etc."
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Business Address */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#D4AF37]" />
                Business Address
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Mumbai"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    State/Province <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Maharashtra"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    placeholder="India"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    ZIP/Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="400001"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6 flex items-center gap-2">
                <FaIndustry className="text-[#D4AF37]" />
                Legal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Business Registration Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="CIN or Registration Number"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Tax ID / GST Number
                  </label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    placeholder="GST or Tax ID"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#2E2E2E] mb-6">
                Account Security
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Create a strong password"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-enter your password"
                    className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-5 h-5 rounded border-[#F3E6C9] text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span className="text-sm text-[#6B6B6B]">
                  I agree to the{" "}
                  <a href="#" className="text-[#D4AF37] hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#D4AF37] hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#D4AF37] text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:bg-[#C4A037] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register Company"}
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                disabled={isLoading}
                className="px-8 py-4 rounded-lg border-2 border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#FFF8E7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Already Have an Account */}
          <div className="text-center mt-8">
            <p className="text-[#6B6B6B]">
              Already have an account?{" "}
              <a href="/login" className="text-[#D4AF37] font-semibold hover:underline">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
