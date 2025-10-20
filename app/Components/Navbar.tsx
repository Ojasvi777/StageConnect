"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiBell, FiMessageCircle } from "react-icons/fi";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#0b0b0b] border-b border-[#b08b36]/40 flex items-center justify-between px-8 py-4 text-[#f1e8d9] font-inter">
      {/* Logo */}
      <div className="text-2xl font-bold select-none">
       <Link href="/"> <span className="text-[#f5d787]">Stage</span></Link>
      <Link href="/"><span className="text-[#fff5e1]">Connect</span></Link>
      
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/Sample1" className="hover:text-[#f5d787] transition">Home</Link>
        <Link href="/AI" className="hover:text-[#f5d787] transition">AI</Link>
        <Link href="/Sample2" className="hover:text-[#f5d787] transition">Sample4</Link>
        <Link href="/Findtalent" className="hover:text-[#f5d787] transition">Find Talent</Link>
        <Link href="/Sample" className="hover:text-[#f5d787] transition">Sample</Link>

        {/* Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="hover:text-[#f5d787] transition"
          >
            Talent Categories ▼
          </button>
          {showDropdown && (
            <ul className="absolute left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#b08b36]/40 rounded-lg shadow-lg">
              {["Actors", "Singers", "Dancers", "Voiceover Artists", "Models", "View More"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/talent-categories/${item.toLowerCase().replace(/ /g, "")}`}
                      className="block px-4 py-2 text-sm hover:bg-[#2a2a2a] hover:text-[#f5d787] rounded-md transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <Link href="/Profile" className="hover:text-[#f5d787] transition">
          Profile
        </Link>
      </div>

      {/* Buttons / Icons */}
      <div className="flex items-center space-x-3">
        {isLoggedIn ? (
          <>
            <FiBell className="text-xl hover:text-[#f5d787] cursor-pointer" />
            <FiMessageCircle className="text-xl hover:text-[#f5d787] cursor-pointer" />
          </>
        ) : (
          <>
            <Link href="/login">
              <button className="border border-[#f5d787] text-[#f5d787] px-4 py-2 rounded-md hover:bg-[#f5d787] hover:text-black transition">
                Login
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-[#f5d787] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#e3c46b] transition">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
