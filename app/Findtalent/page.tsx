"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Image from "next/image";
export default function FindTalentPage() {
  const categories = [
    "Actors & Performers",
    "Singers",
    "Dancers",
    "Models",
    "Voiceover Artists",
    "Crew",
    "Content Creators",
  ];

  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [filters, setFilters] = useState<Record<string, boolean>>({
    Female: false,
    "Mumbai, India": false,
    "Has Headshot": false,
  });

  const toggleFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20">
      {/* HEADER */}
      <div className="text-center py-16 bg-[#FFF2CC] shadow-sm">
        <h1 className="text-4xl font-extrabold text-[#2E2E2E]">Find Talent</h1>
        <p className="text-[#6B6B6B] mt-2 text-lg">
          Search and connect with talented entertainment professionals
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 px-6">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
              activeCategory === tab
                ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                : "bg-white border border-[#F3E6C9] text-[#D4AF37] hover:bg-[#FFF8E7]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FILTER & RESULTS SECTION */}
      <div className="max-w-6xl mx-auto mt-12 px-6 flex flex-col lg:flex-row gap-8">
        {/* FILTER SIDEBAR */}
        <aside className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl p-6 w-full lg:w-1/4 shadow-sm">
          <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">Filters</h2>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Name Search
          </label>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Role Type
          </label>
          <select className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]">
            {categories.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="City, Country or Remote"
            className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Gender
          </label>
          <select className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]">
            <option>Any</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Age Range
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {/* FILTER CHIPS */}
          <h3 className="text-sm font-medium text-[#6B6B6B] mb-2 mt-4">
            Quick Filters
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.keys(filters).map((key) => (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                  filters[key]
                    ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                    : "bg-[#FFF8E7] text-[#D4AF37] border border-[#F3E6C9] hover:bg-[#FFF2CC]"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="bg-[#D4AF37] text-white py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
            >
              View Results
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() =>
                setFilters({
                  Female: false,
                  "Mumbai, India": false,
                  "Has Headshot": false,
                })
              }
              className="bg-white border border-[#D4AF37] text-[#D4AF37] py-2 rounded-lg font-semibold hover:bg-[#FFF8E7] transition"
            >
              Clear All
            </motion.button>
          </div>
        </aside>

  {/* SEARCH RESULTS */}
  <section className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-wrap gap-2">
              {Object.keys(filters)
                .filter((key) => filters[key])
                .map((key) => (
                  <span
                    key={key}
                    className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] rounded-full text-sm font-medium border border-[#F3E6C9]"
                  >
                    {key}
                  </span>
                ))}
            </div>
            <span className="text-[#6B6B6B] text-sm">
              1,247 profiles found
            </span>
          </div>

          {/* PROFILE CARD */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border border-[#F3E6C9] rounded-2xl p-5 flex gap-5 items-center shadow-sm hover:shadow-md transition"
          >
            <Image
              src="/profile.jpg"
              alt="Sarah Johnson"
              className="w-24 h-24 object-cover rounded-xl border border-[#F3E6C9]"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#2E2E2E]">
                Sarah Johnson
              </h3>
              <p className="text-[#D4AF37] font-medium">{activeCategory}</p>
              <div className="flex items-center gap-2 text-[#6B6B6B] mt-1">
                <MapPin className="w-4 h-4" /> <span>New York, NY</span>
              </div>
              <div className="flex gap-2 mt-3">
                <span>📷</span>
                <span>🎥</span>
              </div>
              <Link href="/ViewProfile">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                >
                  View Profile
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
      </div>
      <Footer />
    </main>
 

  );
}
