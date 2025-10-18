import React from "react";
import "./Findtalent.css";
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import Link from 'next/link';


export default function FindTalent() {
  return (
     <div className="find-talent-container">
      <Navbar/>
      <h1 className="page-title">Find Talent</h1>
      <p className="subtitle">
        Search and filter entertainment professionals
      </p>

      {/* Category Tabs */}
      <div className="category-tabs">
        <button className="active">Actors & Performers</button>
        <button>Singers</button>
        <button>Dancers</button>
        <button>Models</button>
        <button>Voiceover Artists</button>
        <button>Crew</button>
        <button>Content Creators</button>
      </div>
<div className="filter-panel">

      {/* Popular Searches */}
      <div className="popular-searches">
        <span className="tag">Female Models</span>
        <span className="tag">NYC Actors</span>
        <span className="tag">Hip-Hop Dancers</span>
        <span className="tag">Union Voiceover Artists</span>
      </div>
</div>

      <div className="content">
        {/* Filters */}
        <aside className="filters">
          <label>Name Search</label>
          <input type="text" placeholder="Search by name..." />

          <label>Role Type</label>
          <select>
            <option>Actor</option>
            <option>Singer</option>
            <option>Dancer</option>
            <option>Model</option>
            <option>Voiceover Artist</option>
          </select>

          <label>Location</label>
          <input type="text" placeholder="City, Country or Remote" />

          <label>Gender</label>
          <select>
            <option>Any</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Age Range</label>
          <div className="age-range">
            <input type="number" placeholder="Min" />
            <input type="number" placeholder="Max" />
          </div>

          <label>Union Details</label>
          <select>
            <option>Any</option>
          </select>

          <label>Available Assets</label>
          <div className="checkbox-group">
            <label><input type="checkbox" /> Headshot/Photo</label>
            <label><input type="checkbox" /> Video Reel</label>
            <label><input type="checkbox" /> Audio Reel</label>
            <label><input type="checkbox" /> Portfolio Link</label>
          </div>

          <label>Physical Attributes</label>
          <select>
            <option>Ethnicity (Any)</option>
          </select>
          <select>
            <option>Hair Color</option>
          </select>
          <select>
            <option>Eye Color</option>
          </select>

          <label>Height</label>
          <div className="age-range">
            <input type="number" placeholder="Min Height" />
            <input type="number" placeholder="Max Height" />
          </div>

          <label>Other Requirements</label>
          <div className="checkbox-group">
            <label><input type="checkbox" /> Has Passport</label>
            <label><input type="checkbox" /> Driver’s Licence</label>
            <label><input type="checkbox" /> Can Self Record</label>
            <label><input type="checkbox" /> Willing to Travel</label>
          </div>

          <button className="view-results">View Results</button>
          <button className="clear-all">Clear All</button>
        </aside>

        {/* Search Results */}
        <main className="results">
          <div className="results-header">
            <div className="active-filters">
              <span className="tag">Female</span>
              <span className="tag">New York, NY</span>
              <span className="tag">Has Headshot</span>
            </div>
            <span className="profile-count">1,247 profiles found</span>
          </div>

          <div className="profile-card">
            <img
              src="/profile.jpg"
              alt="Sarah Johnson"
              className="profile-img"
            />
            <div className="profile-info">
              <h3>Sarah Johnson</h3>
              <p>Actress & Model</p>
              <p className="location">New York, NY</p>
              <div className="profile-icons">
                <span>📷</span>
                <span>🎥</span>
              </div>
              <Link href="/ViewProfile"><button className="view-profile">View Profile</button></Link>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}
