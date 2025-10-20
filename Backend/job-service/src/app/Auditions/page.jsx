"use client";
import React, { useState } from "react";
import styles from "./audition.module.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const auditionsData = [
  {
    title: "Voiceover for Indie Film \"Echoes\"",
    type: "Voiceover",
    status: "Under Review",
    date: "Dec 15, 2024",
    director: "Marcus Chan",
    file: "Audition_Echoes_V1.mp3",
  },
  {
    title: "Lead Role – \"Urban Dreams\"",
    type: "Acting",
    status: "Callback Scheduled",
    date: "Dec 10, 2024",
    director: "Sarah Williams",
    file: "Self_Tape_Urban_Dreams.mp4",
    callback: "Dec 20, 2024 at 2:00 PM",
    location: "StageConnect Studios, Room 2",
  },
  {
    title: "Background Vocalist – \"Midnight Sessions\"",
    type: "Singing",
    status: "Accepted",
    date: "Dec 5, 2024",
    producer: "Alex Rodriguez",
    file: "Vocal_Demo_Midnight.mp3",
  },
  {
    title: "Supporting Role – \"City Lights\"",
    type: "Acting",
    status: "Not Selected",
    date: "Nov 28, 2024",
    director: "James Thompson",
    file: "Audition_City_Lights.mp4",
  },
];

const MyAuditionsPage = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredAuditions = auditionsData.filter((audition) => {
    return (
      (statusFilter === "All" || audition.status === statusFilter) &&
      (typeFilter === "All" || audition.type === typeFilter)
    );
  });

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.header}>
        <h1>🎭 My Auditions</h1>
        <div className={styles.filters}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Under Review</option>
            <option>Callback Scheduled</option>
            <option>Accepted</option>
            <option>Not Selected</option>
          </select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option>All</option>
            <option>Acting</option>
            <option>Singing</option>
            <option>Voiceover</option>
          </select>
        </div>
      </div>

      <div className={styles.auditionList}>
        {filteredAuditions.map((audition, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardTop}>
              <div>
                <h2>{audition.title}</h2>
                <p>
                  🎬 {audition.type} · Submitted {audition.date}
                </p>
                <p>
                  👤 {audition.director || audition.producer}
                </p>
              </div>
              <span className={`${styles.status} ${styles[audition.status.replace(" ", "")]}`}>
                {audition.status}
              </span>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.filePreview}>📎 {audition.file}</div>
              {audition.status === "Under Review" && (
                <button className={styles.primary}>Message Director</button>
              )}
              {audition.status === "Callback Scheduled" && (
                <>
                  <p>📅 Callback: {audition.callback}</p>
                  <p>📍 {audition.location}</p>
                  <button className={styles.primary}>Upload Callback Video</button>
                </>
              )}
              {audition.status === "Accepted" && (
                <>
                  <div className={styles.successBox}>
                    ✅ You’ve been selected for this role!
                  </div>
                  <button className={styles.success}>View Contract</button>
                </>
              )}
              {audition.status === "Not Selected" && (
                <button className={styles.danger}>View Feedback</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default MyAuditionsPage;
