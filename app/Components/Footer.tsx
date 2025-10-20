"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] text-[#f1e8d9] border-t border-[#b08b36]/40 py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            <span className="text-[#f5d787]">Stage</span>
            <span className="text-[#fff5e1]">Connect</span>
          </h2>
          <p className="text-sm text-[#e5dbc8] leading-relaxed">
            Empowering performers and creators with AI-driven tools and
            professional connections to elevate the world of entertainment.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-[#f5d787] mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-[#f1e8d9]/80">
            <li>
              <Link href="/about" className="hover:text-[#f5d787] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#f5d787] transition">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#f5d787] transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-[#f5d787] mb-3">Legal</h4>
          <ul className="space-y-2 text-[#f1e8d9]/80">
            <li>
              <Link href="/privacy" className="hover:text-[#f5d787] transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#f5d787] transition">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect / Socials */}
        <div>
          <h4 className="text-lg font-semibold text-[#f5d787] mb-3">Connect</h4>
          <ul className="space-y-2 text-[#f1e8d9]/80">
            <li>
              <Link href="#" className="hover:text-[#f5d787] transition">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#f5d787] transition">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#f5d787] transition">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom Text */}
      <div className="max-w-6xl mx-auto mt-10 border-t border-[#b08b36]/20 pt-6 text-center text-sm text-[#f1e8d9]/60">
        © {new Date().getFullYear()} <span className="text-[#f5d787] font-medium">StageConnect</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
