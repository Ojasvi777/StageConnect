"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, Film, Trophy } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] font-sans">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-6 border-b border-gray-100 bg-white/70 backdrop-blur-md fixed w-full top-0 z-50">
        <h1 className="text-3xl font-extrabold text-[#7C3AED] tracking-tight">
          StageConnect
        </h1>
        <div className="space-x-8 text-sm md:text-base font-medium">
          <a href="#features" className="hover:text-[#7C3AED] transition">Features</a>
          <a href="#stories" className="hover:text-[#7C3AED] transition">Stories</a>
          <a href="#opportunities" className="hover:text-[#7C3AED] transition">Opportunities</a>
          <a href="#join" className="hover:text-[#7C3AED] transition">Join</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center justify-center pt-48 pb-32 px-6 md:px-20 bg-gradient-to-b from-[#F9F5FF] to-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Where <span className="text-[#7C3AED]">Talent</span> Meets <span className="text-[#E58BB4]">Opportunity</span>
        </motion.h1>

        <p className="mt-6 text-lg md:text-xl text-[#6B6B6B] max-w-2xl">
          The ultimate entertainment networking hub — connect, collaborate, and grow your career in acting, music, filmmaking, or content creation.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-10 flex items-center gap-2 bg-[#7C3AED] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#692ED0] transition"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* FEATURE SECTION */}
      <section id="features" className="mt-20 px-6 md:px-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Showcase Your Talent",
            desc: "Upload your reels, music, or creative work — and get noticed by top brands, agencies, and directors.",
            icon: <Film className="w-10 h-10 text-[#7C3AED]" />,
          },
          {
            title: "Connect & Collaborate",
            desc: "Network with fellow artists, join teams, and grow your professional relationships in the entertainment industry.",
            icon: <Users className="w-10 h-10 text-[#7C3AED]" />,
          },
          {
            title: "Auditions & Events",
            desc: "Find verified auditions, gigs, and industry events curated for your skillset — all in one platform.",
            icon: <Trophy className="w-10 h-10 text-[#7C3AED]" />,
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center hover:shadow-md transition"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">{f.title}</h3>
            <p className="text-[#6B6B6B]">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-32 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-semibold text-[#7C3AED] mb-10">
          How StageConnect Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              step: "1",
              title: "Create Your Profile",
              desc: "Sign up and showcase who you are — your skills, your portfolio, and your creative journey.",
            },
            {
              step: "2",
              title: "Engage & Network",
              desc: "Follow other creators, share your updates, and build meaningful connections across the industry.",
            },
            {
              step: "3",
              title: "Find Opportunities",
              desc: "Apply to gigs, auditions, and competitions that fit your talent profile — and watch your career grow.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="text-[#7C3AED] font-bold text-4xl mb-4">{s.step}</div>
              <h4 className="text-xl font-semibold mb-2 text-[#2E2E2E]">{s.title}</h4>
              <p className="text-[#6B6B6B]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section id="stories" className="mt-36 text-center px-6 md:px-20">
        <h3 className="text-3xl font-semibold text-[#7C3AED] mb-10">
          Success Stories from Our Creators
        </h3>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              name: "Aisha Verma – Actor",
              quote: "I got cast in a short film just two weeks after joining StageConnect. It gave me visibility I could only dream of.",
            },
            {
              name: "Rohan Malhotra – Musician",
              quote: "Collaborated with other artists through StageConnect — our single hit 1M views! The community here is unmatched.",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <p className="text-[#6B6B6B] italic mb-4">“{p.quote}”</p>
              <span className="font-semibold text-[#E58BB4]">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* OPPORTUNITY / SPOTLIGHT SECTION */}
      <section id="opportunities" className="mt-36 bg-gradient-to-r from-[#7C3AED]/10 to-[#E58BB4]/10 py-24 text-center px-6 md:px-20 rounded-3xl mx-4 md:mx-20">
        <h3 className="text-4xl font-semibold mb-4 text-[#2E2E2E]">
          Spotlight & Opportunities
        </h3>
        <p className="text-[#6B6B6B] mb-10 max-w-2xl mx-auto">
          Discover trending creators, featured auditions, and brand collaborations happening this week on StageConnect.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#7C3AED] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#692ED0] transition"
        >
          Explore Now
        </motion.button>
      </section>

      {/* CALL TO ACTION */}
      <section id="join" className="mt-36 text-center py-24">
        <h3 className="text-4xl font-semibold mb-4 text-[#2E2E2E]">
          Your Stage Awaits 🎤
        </h3>
        <p className="text-[#6B6B6B] mb-8">
          Join the platform built for creators, dreamers, and stars of tomorrow.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#7C3AED] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#692ED0] transition"
        >
          Join StageConnect
        </motion.button>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 py-10 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} StageConnect. All rights reserved.
      </footer>
    </div>
  );
}
