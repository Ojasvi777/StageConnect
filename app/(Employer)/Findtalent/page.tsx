"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Image from "next/image";
import { getAllTalentProfiles, getTalentsByCategory } from "../../Actions/talent";
import { TalentCategory } from "../../Actions/enums";
import type { TalentProfile } from "../../Actions/types";

export default function FindTalentPage() {
  const categoryMapping: Record<string, TalentCategory | null> = {
    "All": null,
    "Actors & Performers": TalentCategory.actor,
    "Singers": TalentCategory.singer,
    "Dancers": TalentCategory.dancer,
    "Models": TalentCategory.model,
    "Voiceover Artists": TalentCategory.voice_artist,
    "Crew": null, // Add to enum if needed
    "Content Creators": null,
    "Photographers": null,
    "Fashion Designers": null,
    "Makeup Artists": null,
    "Writers": null,
    "Directors": null,
    "Producers": null,
    "Choreographers": null,
    "Casting Directors": null,
    "Musicians": TalentCategory.musician,
    "Comedians": null,
  };

  const categories = Object.keys(categoryMapping);

  const specialtyOptions: Record<string, string[]> = {
    "Singers": ["Classical", "Pop", "Hip Hop", "Jazz", "R&B", "Folk", "Rock", "Indie", "Bollywood"],
    "Dancers": ["Classical", "Contemporary", "Hip Hop", "Kathak", "Bharatanatyam", "Street Jazz", "Salsa", "Freestyle"],
    "Actors & Performers": ["Drama", "Comedy", "Action", "Thriller", "Romantic", "Theater"],
    "Musicians": ["Classical", "Jazz", "Rock", "Electronic", "Folk", "Orchestral", "String"],
    "Comedians": ["Stand-up", "Improv", "Sketch", "Dark Comedy"],
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRoleTypes, setSelectedRoleTypes] = useState<string[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [talents, setTalents] = useState<TalentProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allTalents, setAllTalents] = useState<TalentProfile[]>([]); // Store unfiltered data
  
  // Filter states
  const [nameSearch, setNameSearch] = useState<string>("");
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("Any");
  const [ageMin, setAgeMin] = useState<string>("");
  const [ageMax, setAgeMax] = useState<string>("");
  const [heightRange, setHeightRange] = useState({ min: "", max: "" });
  const [weightRange, setWeightRange] = useState({ min: "", max: "" });
  const [specialty, setSpecialty] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [availability, setAvailability] = useState<string>("");
  const [filters, setFilters] = useState<Record<string, boolean>>({
    Female: false,
    "Mumbai, India": false,
    "Has Headshot": false,
  });

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  const toggleFilter = (key: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: !prev[key] };
      
      // Apply quick filter logic
      if (key === "Female" && !prev[key]) {
        setGenderFilter("Female");
      } else if (key === "Female" && prev[key]) {
        setGenderFilter("Any");
      }
      
      if (key === "Mumbai, India" && !prev[key]) {
        setLocationSearch("Mumbai");
      } else if (key === "Mumbai, India" && prev[key]) {
        setLocationSearch("");
      }
      
      if (key === "Has Headshot" && !prev[key]) {
        // Filter for profiles with portfolio items
        // This will be applied in the applyFilters function
      }
      
      return newFilters;
    });
  };

  // Fetch talents on component mount and when categories change
  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true);
      try {
        // If no categories selected or "All" is selected, get all talents
        if (selectedCategories.length === 0) {
          const result = await getAllTalentProfiles();
          if (result.success) {
            setAllTalents(result.data);
            setTalents(result.data);
            setTotalCount(result.count);
          } else {
            setAllTalents([]);
            setTalents([]);
            setTotalCount(0);
          }
        } else {
          // Fetch talents for each selected category and combine
          const talentPromises = selectedCategories.map(async (cat) => {
            const selectedCategory = categoryMapping[cat];
            if (selectedCategory) {
              return await getTalentsByCategory(selectedCategory);
            }
            return { success: false, data: [], count: 0 };
          });

          const results = await Promise.all(talentPromises);
          const allData = results.flatMap(r => r.success ? r.data : []);
          
          // Remove duplicates based on user_id
          const uniqueTalents = Array.from(
            new Map(allData.map(item => [item.user_id, item])).values()
          );

          setAllTalents(uniqueTalents);
          setTalents(uniqueTalents);
          setTotalCount(uniqueTalents.length);
        }
      } catch (error) {
        console.error("Error in fetchTalents:", error);
        setAllTalents([]);
        setTalents([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTalents();
  }, [selectedCategories]);

  // Apply filters function
  const applyFilters = () => {
    let filtered = [...allTalents];

    // Name search filter
    if (nameSearch.trim()) {
      const searchLower = nameSearch.toLowerCase();
      filtered = filtered.filter((talent) => {
        const fullName = getDisplayName(talent).toLowerCase();
        const firstName = talent.first_name?.toLowerCase() || "";
        const lastName = talent.last_name?.toLowerCase() || "";
        return (
          fullName.includes(searchLower) ||
          firstName.includes(searchLower) ||
          lastName.includes(searchLower)
        );
      });
    }

    // Location filter
    if (locationSearch.trim()) {
      const locationLower = locationSearch.toLowerCase();
      filtered = filtered.filter((talent) =>
        talent.address?.toLowerCase().includes(locationLower)
      );
    }

    // Gender filter
    if (genderFilter !== "Any") {
      // Note: You'll need to add a gender field to your Profile model
      // For now, this is a placeholder
      // filtered = filtered.filter((talent) => talent.gender === genderFilter);
    }

    // Age range filter
    if (ageMin || ageMax) {
      filtered = filtered.filter((talent) => {
        if (!talent.age) return false;
        const min = ageMin ? parseInt(ageMin) : 0;
        const max = ageMax ? parseInt(ageMax) : 999;
        return talent.age >= min && talent.age <= max;
      });
    }

    // Height range filter
    if (heightRange.min || heightRange.max) {
      filtered = filtered.filter((talent) => {
        if (!talent.height) return false;
        const min = heightRange.min ? parseInt(heightRange.min) : 0;
        const max = heightRange.max ? parseInt(heightRange.max) : 999;
        return talent.height >= min && talent.height <= max;
      });
    }

    // Weight range filter
    if (weightRange.min || weightRange.max) {
      filtered = filtered.filter((talent) => {
        if (!talent.weight) return false;
        const min = weightRange.min ? parseInt(weightRange.min) : 0;
        const max = weightRange.max ? parseInt(weightRange.max) : 999;
        return talent.weight >= min && talent.weight <= max;
      });
    }

    // Role Type filter
    if (selectedRoleTypes.length > 0) {
      filtered = filtered.filter((talent) => {
        const talentCat = getCategoryDisplay(talent.talent_category);
        return selectedRoleTypes.some(role => 
          role === "All" || talentCat.toLowerCase().includes(role.toLowerCase())
        );
      });
    }

    // Has Headshot filter (portfolio items)
    if (filters["Has Headshot"]) {
      filtered = filtered.filter((talent) => 
        talent.user.portfolioItems && talent.user.portfolioItems.length > 0
      );
    }

    setTalents(filtered);
    setTotalCount(filtered.length);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setNameSearch("");
    setLocationSearch("");
    setGenderFilter("Any");
    setAgeMin("");
    setAgeMax("");
    setHeightRange({ min: "", max: "" });
    setWeightRange({ min: "", max: "" });
    setSpecialty("");
    setExperience("");
    setAvailability("");
    setSelectedRoleTypes([]);
    setFilters({
      Female: false,
      "Mumbai, India": false,
      "Has Headshot": false,
    });
    setTalents(allTalents);
    setTotalCount(allTalents.length);
  };

  // Auto-apply filters when quick filters change
  useEffect(() => {
    if (allTalents.length > 0) {
      applyFilters();
    }
  }, [filters]);

  const getProfileImage = (talent: TalentProfile) => {
    // Priority: user image > first profile photo > placeholder
    if (talent.user.image) return talent.user.image;
    if (talent.profile_photos && Array.isArray(talent.profile_photos) && talent.profile_photos.length > 0) {
      return talent.profile_photos[0];
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      talent.first_name || talent.user.name || "User"
    )}&background=D4AF37&color=fff&size=96`;
  };

  const getDisplayName = (talent: TalentProfile) => {
    if (talent.first_name && talent.last_name) {
      return `${talent.first_name} ${talent.last_name}`;
    }
    return talent.user.name || "Anonymous User";
  };

  const getCategoryDisplay = (category: string | null) => {
    if (!category) return "Talent";
    return category.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-linear-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20">
      {/* HEADER */}
      <div className="text-center py-16 bg-[#FFF2CC] shadow-sm">
        <h1 className="text-4xl font-extrabold text-[#2E2E2E]">Find Talent</h1>
        <p className="text-[#6B6B6B] mt-2 text-lg">
          Search and connect with talented entertainment professionals
        </p>
      </div>

      {/* CATEGORY TABS */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 place-items-center">
          {(showAllCategories ? categories : categories.slice(0, 6)).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => toggleCategory(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border transition flex items-center justify-center gap-2 ${
                selectedCategories.includes(tab) || (tab === "All" && selectedCategories.length === 0)
                  ? "bg-[#D4AF37] text-white border-[#D4AF37] shadow-md"
                  : "bg-white border border-[#F3E6C9] text-[#D4AF37] hover:bg-[#FFF8E7]"
              }`}
            >
              <span>{tab}</span>
            </motion.button>
          ))}
        </div>
        {!showAllCategories && categories.length > 6 && (
          <div className="text-center mt-6">
            <motion.button
              onClick={() => setShowAllCategories(true)}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition"
            >
              View More →
            </motion.button>
          </div>
        )}
        {showAllCategories && categories.length > 6 && (
          <div className="text-center mt-6">
            <motion.button
              onClick={() => setShowAllCategories(false)}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition"
            >
              View Less ←
            </motion.button>
          </div>
        )}
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
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#F3E6C9] bg-white text-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-2">
            Role Type
          </label>
          <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
            {categories.map((role) => (
              <label key={role} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRoleTypes.includes(role)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRoleTypes((prev) => [...prev, role]);
                    } else {
                      setSelectedRoleTypes((prev) =>
                        prev.filter((r) => r !== role)
                      );
                    }
                  }}
                  className="w-4 h-4 accent-[#D4AF37] rounded"
                />
                <span className="text-sm text-[#6B6B6B] hover:text-[#D4AF37]">
                  {role}
                </span>
              </label>
            ))}
          </div>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Location
          </label>
          <input
            type="text"
            placeholder="City, Country or Remote"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Gender
          </label>
          <select 
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Age Range
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Min"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value)}
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="number"
              placeholder="Max"
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value)}
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Height (cm)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Min"
              value={heightRange.min}
              onChange={(e) => setHeightRange({ ...heightRange, min: e.target.value })}
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="number"
              placeholder="Max"
              value={heightRange.max}
              onChange={(e) => setHeightRange({ ...heightRange, max: e.target.value })}
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Weight (kg)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Min"
              value={weightRange.min}
              onChange={(e) => setWeightRange({ ...weightRange, min: e.target.value })}
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
            <input
              type="number"
              placeholder="Max"
              value={weightRange.max}
              onChange={(e) => setWeightRange({ ...weightRange, max: e.target.value })}
              className="w-1/2 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          {selectedCategories.length > 0 && (
            <>
              <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
                Specialty / Genre
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="">Any</option>
                {Array.from(
                  new Set(
                    selectedCategories.flatMap(
                      (cat) => specialtyOptions[cat] || []
                    )
                  )
                ).map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </>
          )}

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Experience Level
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">Any</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Professional">Professional</option>
          </select>

          <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
            Availability
          </label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full mb-3 p-2 rounded-lg border border-[#F3E6C9] bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">Any</option>
            <option value="Available Now">Available Now</option>
            <option value="1-3 Months">1-3 Months</option>
            <option value="Flexible">Flexible</option>
            <option value="Not Available">Not Available</option>
          </select>

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
              onClick={applyFilters}
              className="bg-[#D4AF37] text-white py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
            >
              View Results
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={clearAllFilters}
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
              {loading ? "Loading..." : `${totalCount} profile${totalCount !== 1 ? 's' : ''} found`}
            </span>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37]"></div>
            </div>
          )}

          {/* NO RESULTS */}
          {!loading && talents.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#6B6B6B] text-lg">No talent profiles found in this category.</p>
              <p className="text-[#6B6B6B] text-sm mt-2">Try selecting a different category or adjusting your filters.</p>
            </div>
          )}

          {/* PROFILE CARDS */}
          <div className="space-y-4">
            {!loading && talents.map((talent) => (
              <Link key={talent.user_id} href={`/Profile?userId=${talent.user_id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white border border-[#F3E6C9] rounded-2xl p-5 flex gap-5 items-start shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <Image
                    src={getProfileImage(talent)}
                    alt={getDisplayName(talent)}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded-xl border border-[#F3E6C9] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-[#2E2E2E] truncate">
                      {getDisplayName(talent)}
                    </h3>
                    <p className="text-[#D4AF37] font-medium">
                      {getCategoryDisplay(talent.talent_category)}
                    </p>
                    
                    {talent.address && (
                      <div className="flex items-center gap-2 text-[#6B6B6B] mt-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{talent.address}</span>
                      </div>
                    )}

                    {talent.bio && (
                      <p className="text-[#6B6B6B] text-sm mt-2 line-clamp-2">
                        {talent.bio}
                      </p>
                    )}

                    {/* Portfolio Media Icons */}
                    {talent.user.portfolioItems && talent.user.portfolioItems.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {talent.user.portfolioItems.slice(0, 3).map((item) => (
                          <span key={item.portfolio_id} title={item.media_type}>
                            {item.media_type === "image" && "📷"}
                            {item.media_type === "video" && "🎥"}
                            {item.media_type === "audio" && "🎵"}
                            {item.media_type === "document" && "📄"}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Additional Info */}
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#6B6B6B]">
                      {talent.age && (
                        <span className="px-2 py-1 bg-[#FFF8E7] rounded">
                          Age: {talent.age}
                        </span>
                      )}
                      {talent.hourly_rate && (
                        <span className="px-2 py-1 bg-[#FFF8E7] rounded">
                          ₹{talent.hourly_rate}/hr
                        </span>
                      )}
                      {talent.gig_count > 0 && (
                        <span className="px-2 py-1 bg-[#FFF8E7] rounded">
                          {talent.gig_count} gig{talent.gig_count !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="mt-4 bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                    >
                      View Profile
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      </div>
      <Footer />
    </main>
 

  );
}
