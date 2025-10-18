"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] font-sans">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-6 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-[#D4AF37]">Starlink</h1>
        <div className="space-x-8 text-sm font-medium">
          <a href="#discover" className="hover:text-[#E58BB4] transition">Discover</a>
          <a href="#stories" className="hover:text-[#E58BB4] transition">Stories</a>
          <a href="#join" className="hover:text-[#E58BB4] transition">Join</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-32 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Fame isn’t found. <span className="text-[#D4AF37]">It’s built.</span>
        </motion.h1>

        <p className="mt-6 text-lg md:text-xl text-[#6B6B6B] max-w-2xl">
          Enter the platform where ambition meets opportunity.  
          Connect, shine, and become the star you were meant to be.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-10 flex items-center gap-2 bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>

      {/* FEATURE SECTION */}
      <section id="discover" className="mt-32 px-6 md:px-20 grid md:grid-cols-3 gap-10">
        {[
          {
            title: "Create Your Profile",
            desc: "Showcase your talent in acting, music, fashion, or content creation.",
            icon: "🎬",
          },
          {
            title: "Get Discovered",
            desc: "Connect with casting directors, brands, and industry professionals.",
            icon: "✨",
          },
          {
            title: "Collaborate & Shine",
            desc: "Work with other creators and build your personal brand to fame.",
            icon: "🚀",
          },
        ].map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center hover:shadow-md transition"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-[#2E2E2E]">{f.title}</h3>
            <p className="text-[#6B6B6B]">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIAL SECTION */}
      <section id="stories" className="mt-36 text-center px-6 md:px-20">
        <h3 className="text-3xl font-semibold text-[#D4AF37] mb-10">
          Real Stories. Real Stardom.
        </h3>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              name: "Aisha Verma",
              quote: "I uploaded one short video — and landed my first brand deal. Starlink changed my trajectory.",
            },
            {
              name: "Rohan Malhotra",
              quote: "It gave me visibility I never thought possible. The dream started to look real.",
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

      {/* CALL TO ACTION */}
      <section id="join" className="mt-36 text-center py-24">
        <h3 className="text-4xl font-semibold mb-4 text-[#2E2E2E]">
          Who’s gonna be the next star?
        </h3>
        <p className="text-[#6B6B6B] mb-8">
          Your moment starts now. Build your fanbase. Find your spotlight.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition"
        >
          Join the Platform
        </motion.button>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 py-10 text-center text-sm text-gray-500 border-t border-gray-100">
        © {new Date().getFullYear()} Starlink. All rights reserved.
      </footer>
    </div>
  );
}
