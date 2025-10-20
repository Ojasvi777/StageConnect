"use client";

import React from "react";
import "./viewprofile.css";
import Navbar from "../Components/Navbar"; // your navbar

export default function ViewProfile() {
  return (
    <div className="profile-page">
      <Navbar />

      {/* Top Section with Media */}
      <section className="top-section">
        <div className="media-left">
          <div className="main-video">🎬 Intro Reel</div>
        </div>
        <div className="media-right">
          <div className="thumbnail">🎭</div>
          <div className="thumbnail">📷</div>
          <div className="thumbnail">🎙️</div>
          <div className="thumbnail">📸</div>
        </div>
      </section>

      {/* About + Physical Attributes */}
      <section className="about-section">
        <div className="about">
          <h2>About</h2>
          <p>
            Alexandra Sterling is a versatile performer with over 8 years of
            experience in theater, film, and commercial work. Trained at
            Juilliard School, she brings depth and authenticity to every role.
          </p>
          <p>
            Known for her strong character work and emotional range, Alexandra
            excels in both dramatic and comedic roles. She is fluent in English
            and Spanish, with extensive voice-over experience.
          </p>
        </div>

        <div className="attributes">
          <h2>Physical Attributes</h2>
          <ul>
            <li><strong>Height:</strong> 5'7"</li>
            <li><strong>Weight:</strong> 130 lbs</li>
            <li><strong>Build:</strong> Athletic</li>
            <li><strong>Hair:</strong> Brown</li>
            <li><strong>Eyes:</strong> Green</li>
            <li><strong>Age:</strong> 28</li>
            <li><strong>Playing Age:</strong> 25-35</li>
            <li><strong>Ethnicities:</strong> Caucasian, Hispanic</li>
          </ul>
        </div>
      </section>

      {/* Representation & Union Membership */}
      <section className="rep-section">
        <div className="rep-card">
          <h2>Representation</h2>
          <p><strong>Talent Agent:</strong> Creative Artists Agency (LA, CA)</p>
          <p><strong>Manager:</strong> Sterling Management (NYC)</p>
        </div>
        <div className="rep-card">
          <h2>Union Membership</h2>
          <p>SAG-AFTRA (since 2018)</p>
          <p>Actors’ Equity (since 2019)</p>
        </div>
        <div className="rep-card">
          <h2>Licenses & Documents</h2>
          <p>✅ Valid Driver’s License</p>
          <p>✅ US Passport</p>
          <p>✅ Work Authorization</p>
        </div>
      </section>

      {/* Acting Samples */}
      <section className="samples">
        <h2>Acting Samples</h2>
        <div className="sample-grid">
          <div className="sample-box">🎬 Intro Reel</div>
          <div className="sample-box">🗣️ Testimonial</div>
          <div className="sample-box">📺 Commercial</div>
          <div className="sample-box">🎭 Monologue</div>
        </div>
      </section>

      {/* Credits & Experience */}
      <section className="credits">
        <h2>Credits & Experience</h2>
        <div className="credits-grid">
          <div className="credit-col">
            <h3>Theater</h3>
            <p>2023 — Hamlet — Ophelia — Dir. Michael Chen (Lincoln Center)</p>
            <p>2022 — The Glass Menagerie — Laura — Dir. Sarah Johnson (Public Theater)</p>
          </div>
          <div className="credit-col">
            <h3>Film</h3>
            <p>2024 — Urban Stories — Lead — Dir. David Kim</p>
          </div>
          <div className="credit-col">
            <h3>Television</h3>
            <p>2023 — Law & Order: SVU — Guest Star — Dir. Alex Thompson (NBC)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
