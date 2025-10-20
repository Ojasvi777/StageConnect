"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";

const auditionsData = [
  {
    title: 'Voiceover for Indie Film "Echoes"',
    type: "Voiceover",
    status: "Under Review",
    date: "Dec 15, 2024",
    director: "Marcus Chan",
    file: "Audition_Echoes_V1.mp3",
  },
  {
    title: 'Lead Role – "Urban Dreams"',
    type: "Acting",
    status: "Callback Scheduled",
    date: "Dec 10, 2024",
    director: "Sarah Williams",
    file: "Self_Tape_Urban_Dreams.mp4",
    callback: "Dec 20, 2024 at 2:00 PM",
    location: "StageConnect Studios, Room 2",
  },
  {
    title: 'Background Vocalist – "Midnight Sessions"',
    type: "Singing",
    status: "Accepted",
    date: "Dec 5, 2024",
    producer: "Alex Rodriguez",
    file: "Vocal_Demo_Midnight.mp3",
  },
  {
    title: 'Supporting Role – "City Lights"',
    type: "Acting",
    status: "Not Selected",
    date: "Nov 28, 2024",
    director: "James Thompson",
    file: "Audition_City_Lights.mp4",
  },
];

export default function AuditionsPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredAuditions = auditionsData.filter(
    (audition) =>
      (statusFilter === "All" || audition.status === statusFilter) &&
      (typeFilter === "All" || audition.type === typeFilter)
  );

  return (
    <main>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20 px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 bg-[#FFF2CC] px-6 rounded-2xl shadow-sm mt-6">
          <h1 className="text-4xl font-extrabold text-[#2E2E2E]">🎭 My Auditions</h1>
          <div className="flex gap-4 mt-4 md:mt-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white text-[#2E2E2E] focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option>All</option>
              <option>Under Review</option>
              <option>Callback Scheduled</option>
              <option>Accepted</option>
              <option>Not Selected</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white text-[#2E2E2E] focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option>All</option>
              <option>Acting</option>
              <option>Singing</option>
              <option>Voiceover</option>
            </select>
          </div>
        </div>

        {/* AUDITION LIST */}
        <div className="mt-10 flex flex-col gap-6 max-w-5xl mx-auto">
          {filteredAuditions.map((audition, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#F3E6C9] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* TOP SECTION */}
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#2E2E2E]">{audition.title}</h2>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    🎬 {audition.type} · Submitted {audition.date}
                  </p>
                  <p className="text-sm text-[#6B6B6B] mt-1">
                    👤 {audition.director || audition.producer}
                  </p>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase border ${
                    audition.status === "Under Review"
                      ? "bg-[#F3E6C9] text-[#2E2E2E] border-[#F3E6C9]"
                      : audition.status === "Callback Scheduled"
                      ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                      : audition.status === "Accepted"
                      ? "bg-[#4CAF50] text-white border-[#4CAF50]"
                      : "bg-[#EF4444] text-white border-[#EF4444]"
                  }`}
                >
                  {audition.status}
                </span>
              </div>

              {/* CARD BODY */}
              <div className="mt-4 space-y-3">
                <div className="text-sm text-[#6B6B6B]">📎 {audition.file}</div>

                {audition.status === "Under Review" && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                  >
                    Message Director
                  </motion.button>
                )}

                {audition.status === "Callback Scheduled" && (
                  <>
                    <p className="text-sm text-[#6B6B6B]">
                      📅 <span className="font-medium">{audition.callback}</span>
                    </p>
                    <p className="text-sm text-[#6B6B6B]">
                      📍 {audition.location}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                    >
                      Upload Callback Video
                    </motion.button>
                  </>
                )}

                {audition.status === "Accepted" && (
                  <>
                    <div className="bg-[#E8F5E9] border border-[#C8E6C9] text-[#2E7D32] px-3 py-2 rounded-lg text-sm">
                      ✅ You’ve been selected for this role!
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      className="bg-[#4CAF50] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                    >
                      View Contract
                    </motion.button>
                  </>
                )}

                {audition.status === "Not Selected" && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#EF4444] text-white px-4 py-2 rounded-lg font-semibold shadow-sm hover:shadow-md transition"
                  >
                    View Feedback
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
