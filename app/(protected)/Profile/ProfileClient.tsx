"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Users, Video, Briefcase, Instagram, Youtube, Award, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProfileClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  isOwnProfile: boolean;
}

export default function ProfileClient({ user, stats, highlights, isOwnProfile }: ProfileClientProps) {
  const profile = user.profile;
  const fullName = profile?.first_name && profile?.last_name 
    ? `${profile.first_name} ${profile.last_name}` 
    : user.name || "User";

  const talentCategoryDisplay = profile?.talent_category 
    ? profile.talent_category.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())
    : "Talent";

  const specializations = profile?.specializations as string[] | null;
  const languages = profile?.languages as string[] | null;
  const skills = profile?.skills as string[] | null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20">
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
      </div>

      {/* PROFILE HEADER */}
      <div className="max-w-5xl mx-auto mt-24 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-extrabold text-[#2E2E2E]">
            {fullName}
          </h1>
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
          {profile?.bio && (
            <p className="mt-3 text-[#6B6B6B] italic">
              &ldquo;{profile.bio}&rdquo;
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-3">
          {!isOwnProfile && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition"
              >
                Follow
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF8E7] transition"
              >
                Message
              </motion.button>
            </>
          )}
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

      {/* AUDITIONS SECTION */}
      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
          <Award className="text-[#D4AF37]" /> Auditions
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {stats.auditionsCount > 0 ? (
            // This can be populated with real audition data when available
            Array.from({ length: Math.min(3, stats.auditionsCount) }).map((_, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">
                  Audition {i + 1}
                </h4>
                <p className="text-[#6B6B6B]">Details coming soon...</p>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-[#6B6B6B]">No auditions yet. Check back later!</p>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">About</h2>
        <p className="text-[#4A4A4A] leading-relaxed">
          {profile?.bio || "No bio available yet."}
        </p>
        
        {/* Hashtags/Tags based on profile data */}
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
          {!profile?.talent_category && !specializations && !skills && (
            <>
              <span className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9]">
                #Talent
              </span>
              <span className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9]">
                #Creative
              </span>
            </>
          )}
        </div>
        
        {/* Skills & Languages */}
        <div className="mt-6 space-y-4">
          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#2E2E2E] mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9] text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {languages && languages.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[#2E2E2E] mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#FCE4EC] text-[#E58BB4] font-medium rounded-full border border-[#F8D4E4] text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
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
      </section>

      {/* HIGHLIGHTS */}
      {highlights && highlights.length > 0 && (
        <section className="max-w-5xl mx-auto mt-16 px-6">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
            <Award className="text-[#D4AF37]" /> Highlights
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">
                  {highlight.title}
                </h4>
                <p className="text-[#6B6B6B]">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {user.experiences && user.experiences.length > 0 && (
        <section className="max-w-5xl mx-auto mt-16 px-6">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
            <Briefcase className="text-[#D4AF37]" /> Experience
          </h2>
          <div className="space-y-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {user.experiences.slice(0, 3).map((exp: any) => (
              <motion.div
                key={exp.experience_id}
                whileHover={{ x: 5 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
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
                  <p className="text-[#4A4A4A] mt-3">{exp.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* PORTFOLIO */}
      {user.portfolioItems && user.portfolioItems.length > 0 && (
        <section className="max-w-5xl mx-auto mt-16 px-6">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
            <Video className="text-[#D4AF37]" /> Portfolio
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {user.portfolioItems.map((item: any) => (
              <motion.div
                key={item.portfolio_id}
                whileHover={{ scale: 1.03 }}
                className="relative w-full h-52 rounded-2xl overflow-hidden shadow-sm border border-gray-100"
              >
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
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CONNECTIONS */}
      <section className="max-w-5xl mx-auto mt-16 px-6 text-center">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex justify-center items-center gap-2">
          <Users className="text-[#D4AF37]" /> Connections
        </h2>
        {stats.connectionsCount > 0 ? (
          <>
            <div className="flex justify-center gap-4 flex-wrap">
              {Array.from({ length: Math.min(5, stats.connectionsCount) }).map((_, i) => (
                <Image
                  key={i}
                  src={`https://ui-avatars.com/api/?name=User+${i + 1}&background=D4AF37&color=fff&size=80`}
                  alt={`Connection ${i + 1}`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
                />
              ))}
            </div>
            <p className="mt-4 text-[#6B6B6B]">Connected with {stats.connectionsCount}+ creators</p>
          </>
        ) : (
          <p className="text-[#6B6B6B]">No connections yet. Start networking!</p>
        )}
      </section>

      {/* EDUCATION */}
      {user.educations && user.educations.length > 0 && (
        <section className="max-w-5xl mx-auto mt-16 px-6">
          <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6">Education</h2>
          <div className="space-y-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {user.educations.slice(0, 3).map((edu: any) => (
              <motion.div
                key={edu.education_id}
                whileHover={{ x: 5 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
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
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT SECTION */}
      <section className="max-w-5xl mx-auto mt-24 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[#2E2E2E] mb-4">
          Let&apos;s Collaborate 💬
        </h2>
        <p className="text-[#6B6B6B] mb-8">
          Reach out for creative projects, auditions, or partnerships.
        </p>
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
          >
            <MessageCircle className="inline-block mr-2" /> Message
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#D4AF37] text-[#D4AF37] px-8 py-3 rounded-full font-semibold hover:bg-[#FFF8E7] transition"
          >
            <Mail className="inline-block mr-2" /> Email
          </motion.button>
        </div>
      </section>
    </div>
  );
}
