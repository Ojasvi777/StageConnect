"use client";

import React from "react";
import Image from "next/image";
import "./LP.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const LP = () => {
  const [text, setText] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBeforeDelete = 1000;
  const pauseBeforeNextWord = 300;

  const words = ["Tech", "Passion", "Innovation", "Talent"];

  React.useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      if (charIndex < currentWord.length) {
        setTimeout(() => {
          setText(currentWord.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      }
    } else {
      if (charIndex > 0) {
        setTimeout(() => {
          setText(currentWord.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setTimeout(() => setCharIndex(0), pauseBeforeNextWord);
      }
    }
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div className="landing-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Connect Your Stage with{" "}
            <span className="highlight-blue">{text}</span>
            <span className="cursor">|</span>
          </h1>

          <p className="hero-description">
            Transform your stage management with cutting-edge AI technology and
            connect with industry professionals worldwide.
          </p>
          <div className="hero-buttons">
            <button className="btn trial-btn">Start Free Trial</button>
            <a
              href="https://youtu.be/mOFoh9FUR8w?si=ewuzeuItVSeBYCNL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn demo-btn">Watch Demo</button>
            </a>
          </div>
        </div>
        <div className="hero-right">
          <Image
            src="/images/dashboard.png"
            alt="Dashboard"
            width={1000}
            height={500}
            className="hero-image"
          />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-box">
          <h3 className="feature-title">AI Analytics</h3>
          <p className="feature-description">
            Advanced AI-powered analytics to optimize your performance and
            audience engagement.
          </p>
        </div>
        <div className="feature-box">
          <h3 className="feature-title">Real-time Processing</h3>
          <p className="feature-description">
            Process and analyze stage data in real-time for immediate insights
            and adjustments.
          </p>
        </div>
        <div className="feature-box">
          <h3 className="feature-title">Secure Platform</h3>
          <p className="feature-description">
            Enterprise-grade security to protect your data and creative assets.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <div className="testimonial-box">
          <p className="testimonial-author">
            Sarah Martinez{" "}
            <span className="testimonial-role">- Stage Director</span>
          </p>
          <p className="testimonial-text">
            Just wrapped up an amazing show using StageConnect’s AI analytics.
            The real-time audience engagement metrics were game-changing! ✨🎤
          </p>
          <div className="testimonial-stats">
            <span>2.5K ❤️</span>
            <span>148 💬</span>
            <span>Share ↗</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LP;
