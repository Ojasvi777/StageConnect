"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Video, Briefcase, Instagram, Youtube, Edit2, Save, X, Plus, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { updateProfile, deleteExperience, deleteEducation } from "../Actions/profile";
import { deletePortfolioItem } from "../Actions/portfolio";
import { useRouter } from "next/navigation";
import ExperienceModal from "./ExperienceModal";
import EducationModal from "./EducationModal";

interface EditableProfileClientProps {
  user: any;
  stats: {
    gigCount: number;
    auditionsCount: number;
    portfolioCount: number;
    connectionsCount: number;
  };
  highlights: Array<{
    title: string;
    description: string;
    type: "portfolio" | "achievement";
  }>;
}

export default function EditableProfileClient({ user, stats }: EditableProfileClientProps) {
  const router = useRouter();
  const profile = user.profile;
  
  // Edit mode states
  const [isEditingBasicInfo, setIsEditingBasicInfo] = useState(false);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Modal states
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingEducation, setEditingEducation] = useState<any>(null);
  
  // Form states
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [address, setAddress] = useState(profile?.address || "");
  const [instagram, setInstagram] = useState(profile?.instagram_profile || "");
  const [youtube, setYoutube] = useState(profile?.youtube_profile || "");
  const [phoneNumber, setPhoneNumber] = useState(profile?.phone_number || "");

  const fullName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : user.name || "User";

  const talentCategoryDisplay = profile?.talent_category 
    ? profile.talent_category.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
    : "Talent";

  const specializations = profile?.specializations as string[] | null;
  const languages = profile?.languages as string[] | null;
  const skills = profile?.skills as string[] | null;

  const handleSaveBasicInfo = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await updateProfile(user.id, {
        firstName,
        lastName,
        address,
        phoneNumber,
        instagramProfile: instagram,
        youtubeProfile: youtube,
      });

      if (result.success) {
        setSuccess("Profile updated successfully!");
        setIsEditingBasicInfo(false);
        router.refresh();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error saving basic info:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      const result = await updateProfile(user.id, {
        bio,
      });

      if (result.success) {
        setSuccess("Bio updated successfully!");
        setIsEditingAbout(false);
        router.refresh();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to update bio");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error saving about:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelBasicInfo = () => {
    setFirstName(profile?.first_name || "");
    setLastName(profile?.last_name || "");
    setAddress(profile?.address || "");
    setPhoneNumber(profile?.phone_number || "");
    setInstagram(profile?.instagram_profile || "");
    setYoutube(profile?.youtube_profile || "");
    setIsEditingBasicInfo(false);
  };

  const handleCancelAbout = () => {
    setBio(profile?.bio || "");
    setIsEditingAbout(false);
  };

  const handleDeleteExperience = async (experienceId: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    setError(null);
    try {
      const result = await deleteExperience(experienceId);
      
      if (result.success) {
        setSuccess("Experience deleted successfully!");
        router.refresh();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to delete experience");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error deleting experience:", err);
    }
  };

  const handleDeleteEducation = async (educationId: string) => {
    if (!confirm("Are you sure you want to delete this education?")) {
      return;
    }

    setError(null);
    try {
      const result = await deleteEducation(educationId);
      
      if (result.success) {
        setSuccess("Education deleted successfully!");
        router.refresh();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to delete education");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error deleting education:", err);
    }
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    setError(null);
    try {
      const result = await deletePortfolioItem(portfolioId);
      
      if (result.success) {
        setSuccess("Portfolio item deleted successfully!");
        router.refresh();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(result.error || "Failed to delete portfolio item");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error deleting portfolio item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20">
      {/* Success/Error Messages */}
      {success && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-xl">✓</span>
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span className="text-xl">⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* HEADER / COVER */}
      <div className="relative h-64 w-full bg-[#FFF2CC] flex items-end justify-center">
        <motion.img
          src={user.image || "https://placehold.co/120x120"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-md absolute -bottom-16 object-cover"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Edit profile picture button */}
        <button 
          className="absolute -bottom-10 right-1/2 translate-x-20 bg-[#D4AF37] text-white p-2 rounded-full shadow-md hover:bg-[#B8941F] transition"
          title="Edit profile picture"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* PROFILE HEADER */}
      <div className="max-w-5xl mx-auto mt-24 px-6">
        <div className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-[#D4AF37]">Basic Information</h3>
            {!isEditingBasicInfo && (
              <button
                onClick={() => setIsEditingBasicInfo(true)}
                className="flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941F] transition"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            )}
          </div>

          {isEditingBasicInfo ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B6B6B] mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B6B6B] mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B6B6B] mb-1">Location</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="City, State, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B6B6B] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B6B6B] mb-1">Instagram Profile</label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#6B6B6B] mb-1">YouTube Profile</label>
                <input
                  type="url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="https://youtube.com/@username"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveBasicInfo}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelBasicInfo}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-lg font-semibold hover:bg-[#FFF8E7] transition disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-extrabold text-[#2E2E2E]">{fullName}</h1>
                <p className="text-[#D4AF37] font-medium text-lg">
                  {talentCategoryDisplay}
                  {specializations && specializations.length > 0 && (
                    <span className="text-[#6B6B6B] text-base"> • {specializations.join(", ")}</span>
                  )}
                </p>
                {(profile?.address || user.email) && (
                  <div className="flex justify-center md:justify-start items-center gap-3 mt-2 text-[#6B6B6B]">
                    <MapPin className="w-4 h-4" />
                    <span>{profile?.address || user.email}</span>
                  </div>
                )}
                {profile?.phone_number && (
                  <p className="text-[#6B6B6B] mt-1">📱 {profile.phone_number}</p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-4 justify-center md:justify-start">
                {profile?.instagram_profile && (
                  <a 
                    href={profile.instagram_profile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941F] transition"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">Instagram</span>
                  </a>
                )}
                {profile?.youtube_profile && (
                  <a 
                    href={profile.youtube_profile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#E58BB4] hover:text-[#D16B9A] transition"
                  >
                    <Youtube className="w-5 h-5" />
                    <span className="text-sm">YouTube</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#E58BB4] text-[#E58BB4] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF0F5] transition"
          >
            <Briefcase className="inline-block w-4 h-4 mr-2" /> {stats.gigCount} Gigs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF8E7] transition"
          >
            <Users className="inline-block w-4 h-4 mr-2" />{stats.connectionsCount} Connections
          </motion.button>
          <Link href="/Auditions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition"
            >
              {stats.auditionsCount} Auditions
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="max-w-5xl mx-auto mt-8 px-6">
        <div className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-semibold text-[#D4AF37]">About</h2>
            {!isEditingAbout && (
              <button
                onClick={() => setIsEditingAbout(true)}
                className="flex items-center gap-2 text-[#D4AF37] hover:text-[#B8941F] transition"
              >
                <Edit2 className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            )}
          </div>

          {isEditingAbout ? (
            <div className="space-y-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
                placeholder="Tell us about yourself, your experience, and what makes you unique..."
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveAbout}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelAbout}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-lg font-semibold hover:bg-[#FFF8E7] transition disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[#4A4A4A] leading-relaxed">
                {profile?.bio || "No bio available yet. Click edit to add your bio."}
              </p>
              
              {/* Hashtags/Tags */}
              <div className="flex flex-wrap gap-3 mt-4">
                {profile?.talent_category && (
                  <span className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9]">
                    #{talentCategoryDisplay.replace(/\s+/g, '')}
                  </span>
                )}
                {specializations && specializations.slice(0, 3).map((spec: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9]"
                  >
                    #{spec.replace(/\s+/g, '')}
                  </span>
                ))}
                {skills && skills.slice(0, 2).map((skill: string, i: number) => (
                  <span
                    key={`skill-${i}`}
                    className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9]"
                  >
                    #{skill.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Skills & Languages */}
          <div className="mt-6 space-y-4">
            {skills && skills.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-[#2E2E2E]">Skills</h3>
                  <button className="text-[#D4AF37] hover:text-[#B8941F] text-sm flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9] text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button className="hover:text-red-500 transition">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {languages && languages.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-[#2E2E2E]">Languages</h3>
                  <button className="text-[#E58BB4] hover:text-[#D16B9A] text-sm flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#FCE4EC] text-[#E58BB4] font-medium rounded-full border border-[#F8D4E4] text-sm flex items-center gap-2"
                    >
                      {lang}
                      <button className="hover:text-red-500 transition">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="max-w-5xl mx-auto mt-8 px-6">
        <div className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#D4AF37] flex items-center gap-2">
              <Briefcase className="text-[#D4AF37]" /> Experience
            </h2>
            <button 
              onClick={() => {
                setEditingExperience(null);
                setShowExperienceModal(true);
              }}
              className="flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </button>
          </div>
          
          {user.experiences && user.experiences.length > 0 ? (
            <div className="space-y-4">
              {user.experiences.map((exp: any) => (
                <div
                  key={exp.experience_id}
                  className="border border-[#F3E6C9] rounded-lg p-4 hover:shadow-sm transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#2E2E2E]">{exp.title}</h4>
                      {exp.company_name && (
                        <p className="text-[#D4AF37] font-medium">{exp.company_name}</p>
                      )}
                      {exp.project_name && (
                        <p className="text-[#6B6B6B] text-sm">Project: {exp.project_name}</p>
                      )}
                      <p className="text-[#6B6B6B] text-sm mt-1">
                        {new Date(exp.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} 
                        {" - "}
                        {exp.end_date 
                          ? new Date(exp.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                          : "Present"}
                      </p>
                      {exp.description && (
                        <p className="text-[#4A4A4A] mt-2 text-sm">{exp.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingExperience(exp);
                          setShowExperienceModal(true);
                        }}
                        className="text-[#D4AF37] hover:text-[#B8941F] p-2" 
                        title="Edit experience"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteExperience(exp.experience_id)}
                        className="text-red-400 hover:text-red-600 p-2"
                        title="Delete experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#6B6B6B]">
              <p>No experience added yet. Click &ldquo;Add Experience&rdquo; to get started.</p>
            </div>
          )}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="max-w-5xl mx-auto mt-8 px-6">
        <div className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#D4AF37] flex items-center gap-2">
              <Video className="text-[#D4AF37]" /> Portfolio
            </h2>
            <button className="flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition">
              <Plus className="w-4 h-4" />
              Add Portfolio Item
            </button>
          </div>

          {user.portfolioItems && user.portfolioItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {user.portfolioItems.map((item: any) => (
                <div
                  key={item.portfolio_id}
                  className="relative group"
                >
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    <Image
                      src={item.thumbnail_url || item.media_url || "https://placehold.co/400x250?text=Portfolio"}
                      alt={item.title || "Portfolio item"}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                    {item.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white font-semibold">{item.title}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-2">
                    <button 
                      className="bg-white text-[#D4AF37] p-2 rounded-full shadow-md hover:bg-[#FFF8E7]"
                      title="Edit portfolio item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeletePortfolio(item.portfolio_id)}
                      className="bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50"
                      title="Delete portfolio item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#6B6B6B]">
              <p>No portfolio items yet. Click &ldquo;Add Portfolio Item&rdquo; to showcase your work.</p>
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="max-w-5xl mx-auto mt-8 px-6">
        <div className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#D4AF37]">Education</h2>
            <button 
              onClick={() => {
                setEditingEducation(null);
                setShowEducationModal(true);
              }}
              className="flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>

          {user.educations && user.educations.length > 0 ? (
            <div className="space-y-4">
              {user.educations.map((edu: any) => (
                <div
                  key={edu.education_id}
                  className="border border-[#F3E6C9] rounded-lg p-4 hover:shadow-sm transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#2E2E2E]">{edu.degree}</h4>
                      <p className="text-[#D4AF37] font-medium">{edu.institution_name}</p>
                      {edu.field_of_study && (
                        <p className="text-[#6B6B6B] text-sm">{edu.field_of_study}</p>
                      )}
                      <p className="text-[#6B6B6B] text-sm mt-1">
                        {new Date(edu.start_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })} 
                        {" - "}
                        {edu.end_date 
                          ? new Date(edu.end_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                          : "Present"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingEducation(edu);
                          setShowEducationModal(true);
                        }}
                        className="text-[#D4AF37] hover:text-[#B8941F] p-2"
                        title="Edit education"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEducation(edu.education_id)}
                        className="text-red-400 hover:text-red-600 p-2"
                        title="Delete education"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-[#6B6B6B]">
              <p>No education added yet. Click &ldquo;Add Education&rdquo; to get started.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <ExperienceModal
        isOpen={showExperienceModal}
        onClose={() => {
          setShowExperienceModal(false);
          setEditingExperience(null);
        }}
        userId={user.id}
        experience={editingExperience}
      />

      <EducationModal
        isOpen={showEducationModal}
        onClose={() => {
          setShowEducationModal(false);
          setEditingEducation(null);
        }}
        userId={user.id}
        education={editingEducation}
      />
    </div>
  );
}
