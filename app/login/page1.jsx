// app/login/page.jsx
"use client";

import React, { useState } from "react";
import "./login.css";
import Navbar from "../Components/Navbar1";
import Footer from "../Components/Footer";

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="auth-container">
        <div className="left-panel">
          <h1>
            Welcome to <span className="gradient-text">StageConnect</span>
          </h1>
          <p>
            The future of live performance networking. Connect with industry professionals,
            manage your shows with AI, and elevate your stage presence.
          </p>
          <ul>
            <li>🎭 Professional Networking</li>
            <li>🤖 AI-Powered Stage Management</li>
            <li>📅 Event Organization Tools</li>
          </ul>
        </div>

        <div className="right-panel">
          <div className="toggle-btns">
            <button className={isSignIn ? "active" : ""} onClick={() => setIsSignIn(true)}>
              Sign In
            </button>
            <button className={!isSignIn ? "active" : ""} onClick={() => setIsSignIn(false)}>
              Sign Up
            </button>
          </div>

          <div className="form-box">
            {isSignIn ? (
              <>
                <h2>Welcome Back</h2>
                <p>Sign in to your StageConnect account</p>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div className="options">
                  <label><input type="checkbox" /> Remember me</label>
                  <a href="#">Forgot password?</a>
                </div>
                <button className="primary-btn">Sign In</button>
              </>
            ) : (
              <>
                <h2>Create Account</h2>
                <p>Sign up for StageConnect</p>
                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="primary-btn">Sign Up</button>
              </>
            )}

            <div className="or-line">Or continue with</div>
            <div className="social-btns">
              <button>🔴 Google</button>
              <button>🔵 LinkedIn</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
