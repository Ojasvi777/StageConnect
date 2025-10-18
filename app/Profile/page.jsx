"use client";
import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import Image from "next/image";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Link from "next/link";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isOwnProfile = true;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-150px 0px -50% 0px",
        threshold: 0.5,
      }
    );

    const sectionIds = ["overview", "media", "projects", "endorsements"];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <Image
              src="/profile-pic.jpg"
              alt="Maya Rivera"
              className={styles.avatar}
              width={100}
              height={100}
            />
            <div className={styles.profileInfo}>
              <h1>Maya Rivera</h1>
              <p>R&B Singer & Songwriter</p>
              <div className={styles.statusRow}>
                <span>📍 Los Angeles, CA</span>
                <span className={styles.openToWork}>Open to work</span>
                <span>🌐 847 Connections</span>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <Link href="/connections">
                <button className={styles.connectionsButton}>👥 Connections</button>
              </Link>
              <Link href="/Auditions">
                <button className={styles.myAuditionsButton}>🎭 My Auditions</button>
              </Link>
            </div>
          </div>

          <div className={styles.tabs}>
            {["overview", "media", "projects", "endorsements"].map((tab) => (
              <span
                key={tab}
                onClick={() => scrollToSection(tab)}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </span>
            ))}
          </div>

          <div id="overview" className={styles.sectionCard}>
            <h2>About</h2>
            <p>
              Passionate R&B artist with 8+ years of experience in vocal performance and songwriting.
              Known for soulful melodies and powerful stage presence. Looking to collaborate on original
              projects and live performances.
            </p>
            <div className={styles.tags}>
              <span>#R&B</span>
              <span>#Soul</span>
              <span>#Songwriting</span>
              <span>#LivePerformance</span>
            </div>
          </div>

          <div id="media" className={styles.sectionCard}>
            <h2>Media Showcase</h2>
            <div className={styles.mediaGrid}>
              <div className={styles.mediaCard}>
                <div className={styles.video}>🎥</div>
                <p>Midnight Sessions</p>
                <span>Live Performance</span>
              </div>
              <div className={styles.mediaCard}>
                <div className={styles.video}>🎙️</div>
                <p>Unplugged Stories</p>
                <span>Studio Recording</span>
              </div>
            </div>
          </div>

          <div id="projects" className={styles.sectionCard}>
            <h2>Projects</h2>
            <ul>
              <li>Collaborated on the "Echo Vibes" EP (2023)</li>
              <li>Lead Vocalist - "Urban Dreams" stage show</li>
            </ul>
          </div>

          <div id="endorsements" className={styles.sectionCard}>
            <h2>Endorsements</h2>
            <p>
              “Maya brings emotion to every performance. A true artist with a rare gift.” — Director, Urban Dreams
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
