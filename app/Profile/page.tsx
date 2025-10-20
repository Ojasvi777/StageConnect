"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Users, Video, Award, MessageCircle, Briefcase } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Link from "next/link";
import Image from "next/image";
export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans pb-20">
        <Navbar />

      {/* HEADER / COVER */}
      <div className="relative h-64 w-full bg-[#FFF2CC] flex items-end justify-center">
        <motion.img
          src="https://placehold.co/120x120"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-md absolute -bottom-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* PROFILE HEADER */}
      <div className="max-w-5xl mx-auto mt-24 px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-extrabold text-[#2E2E2E]">
            Aisha Verma
          </h1>
          <p className="text-[#D4AF37] font-medium text-lg">
            Actor | Model | Content Creator
          </p>
          <div className="flex justify-center md:justify-start items-center gap-3 mt-2 text-[#6B6B6B]">
            <MapPin className="w-4 h-4" />
            <span>Mumbai, India</span>
          </div>
          <p className="mt-3 text-[#6B6B6B] italic">
            “Turning dreams into reality, one frame at a time ✨”
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition"
          >
            Follow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#E58BB4] text-[#E58BB4] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF0F5] transition"
          >
            <Briefcase className="inline-block w-4 h-4 mr-2" /> 17 Gigs
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF8E7] transition"
          >
            <Users className="inline-block w-4 h-4 mr-2" />124 Connections
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF8E7] transition"
          >
             Message
          </motion.button>
       <Link href="/Auditions">
        <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:shadow-md transition"
          >
            Auditions
         </motion.button></Link>  
        </div>
      </div>

{/*Auditions*/}
<section className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
          <Award className="text-[#D4AF37]" /> Auditions
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "1st Runner-up - VIT Stage Play 2023",
              desc: "Awarded for outstanding acting performance.",
            },
            {
              title: "Brand Collaboration - Nykaa",
              desc: "Featured in Nykaa’s festive campaign.",
            },
            {
              title: "Short Film - 'Reflections'",
              desc: "Played lead role in award-winning indie film.",
            },
          ].map((h, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">
                {h.title}
              </h4>
              <p className="text-[#6B6B6B]">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-4">About</h2>
        <p className="text-[#4A4A4A] leading-relaxed">
          A passionate performer with over 4 years of experience in theatre and
          digital media. From stage drama to web series, I bring characters to
          life through authenticity and emotion. Collaborated with brands like
          Nykaa and Spotify for creative campaigns.
        </p>
        <div className="flex flex-wrap gap-3 mt-4">
          {["#Acting", "#Modeling", "#Storytelling", "#Collaboration"].map(
            (tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#FFF8E7] text-[#D4AF37] font-medium rounded-full border border-[#F3E6C9]"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
          <Award className="text-[#D4AF37]" /> Highlights
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "1st Runner-up - VIT Stage Play 2023",
              desc: "Awarded for outstanding acting performance.",
            },
            {
              title: "Brand Collaboration - Nykaa",
              desc: "Featured in Nykaa’s festive campaign.",
            },
            {
              title: "Short Film - 'Reflections'",
              desc: "Played lead role in award-winning indie film.",
            },
          ].map((h, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold text-[#2E2E2E] mb-2">
                {h.title}
              </h4>
              <p className="text-[#6B6B6B]">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex items-center gap-2">
          <Video className="text-[#D4AF37]" /> Portfolio
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative w-full h-52 rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              <Image
                src={`https://placehold.co/400x250?text=Project+${i}`}
                alt={`Project ${i}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONNECTIONS */}
      <section className="max-w-5xl mx-auto mt-16 px-6 text-center">
        <h2 className="text-2xl font-semibold text-[#D4AF37] mb-6 flex justify-center items-center gap-2">
          <Users className="text-[#D4AF37]" /> Connections
        </h2>
        <div className="flex justify-center gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              src={`https://placehold.co/80x80?text=C${i}`}
              alt={`Connection ${i}`}
              className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
            />
          ))}
        </div>
        <p className="mt-4 text-[#6B6B6B]">Connected with 120+ creators</p>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-5xl mx-auto mt-24 px-6 text-center">
        <h2 className="text-3xl font-semibold text-[#2E2E2E] mb-4">
          Let’s Collaborate 💬
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
        <Footer />
    </div>
  );
}
