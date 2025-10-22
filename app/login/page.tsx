"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8E7] via-white to-[#FCE4EC] text-[#1E1E1E] font-sans">
      <Navbar />

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 px-8 md:px-16 lg:px-24 py-16 flex-1">
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-center max-w-lg">
          <h1 className="text-4xl font-bold mb-3 text-[#2E2E2E]">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#F7D76A] bg-clip-text text-transparent">
              StageConnect
            </span>
          </h1>
          <p className="text-[#6B6B6B] mb-6 leading-relaxed">
            The future of live performance networking. Connect with industry professionals,
            manage your shows with AI, and elevate your stage presence.
          </p>
          <ul className="space-y-3 text-[#2E2E2E] font-medium">
            <li>🎭 Professional Networking</li>
            <li>🤖 AI-Powered Stage Management</li>
            <li>📅 Event Organization Tools</li>
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#F3E6C9] rounded-2xl shadow-lg p-8 flex flex-col items-center">
          {/* TOGGLE BUTTONS */}
          <div className="flex w-full mb-6 border border-[#F3E6C9] rounded-full overflow-hidden">
            <button
              onClick={() => setIsSignIn(true)}
              className={`flex-1 py-2 font-semibold transition-all ${
                isSignIn
                  ? "bg-[#D4AF37] text-white"
                  : "bg-transparent text-[#D4AF37] hover:bg-[#FFF8E7]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`flex-1 py-2 font-semibold transition-all ${
                !isSignIn
                  ? "bg-[#D4AF37] text-white"
                  : "bg-transparent text-[#D4AF37] hover:bg-[#FFF8E7]"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* FORM BOX */}
          <div className="w-full max-w-md space-y-4 text-center">
            {isSignIn ? (
              <>
                <h2 className="text-2xl font-semibold text-[#2E2E2E]">
                  Welcome Back
                </h2>
                <p className="text-[#6B6B6B] mb-3">
                  Sign in to your StageConnect account
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <div className="flex justify-between items-center text-sm text-[#6B6B6B]">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" /> Remember me
                  </label>
                  <a href="#" className="hover:text-[#D4AF37]">
                    Forgot password?
                  </a>
                </div>
                <button className="w-full mt-2 bg-[#D4AF37] text-white py-2 rounded-lg font-semibold hover:shadow-md transition">
                  Sign In
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-[#2E2E2E]">
                  Create Account
                </h2>
                <p className="text-[#6B6B6B] mb-3">
                  Sign up for StageConnect
                </p>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] bg-white focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
                <button className="w-full mt-2 bg-[#D4AF37] text-white py-2 rounded-lg font-semibold hover:shadow-md transition">
                  Sign Up
                </button>
              </>
            )}

            <div className="text-[#6B6B6B] text-sm mt-4">Or continue with</div>

            <div className="flex gap-4 justify-center mt-2">
              <button 
                onClick={handleGoogleSignIn}
                className="bg-[#FFF8E7] text-[#2E2E2E] px-4 py-2 rounded-lg border border-[#F3E6C9] hover:bg-[#FFF2CC] transition"
              >
                🔴 Google
              </button>
              <button className="bg-[#FFF8E7] text-[#2E2E2E] px-4 py-2 rounded-lg border border-[#F3E6C9] hover:bg-[#FFF2CC] transition">
                🔵 LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
