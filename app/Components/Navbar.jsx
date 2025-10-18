"use client";
import { FiBell, FiMessageCircle } from 'react-icons/fi';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
    useEffect(() => {
    const user = localStorage.getItem('user'); // or use auth context
    if (user) setIsLoggedIn(true);
  }, []);
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-blue">Stage</span>
        <span className="logo-purple">Connect</span>
      </div>
      <Link href="/Sample1" className="nav-item">Home</Link>
      <Link href="/AI" className="nav-item">AI</Link>
      <Link href="/Findtalent" className="nav-item">Find Talent</Link>
            <Link href="/Sample" className="nav-item">Sample</Link>

      <div className="dropdown" ref={dropdownRef}>
        <div className="dropdown-title" onClick={() => setShowDropdown(!showDropdown)}>
          Talent Categories ▼
        </div>
        {showDropdown && (
          <ul className="dropdown-menu">
            <li><Link href="/talent-categories/actors">Actors</Link></li>
            <li><Link href="/talent-categories/singers">Singers</Link></li>
            <li><Link href="/talent-categories/dancers">Dancers</Link></li>
            <li><Link href="/talent-categories/voiceover">VoiceOver Artists</Link></li>
            <li><Link href="/talent-categories/models">Models</Link></li>
            <li><Link href="/talent-categories/models">View More</Link></li>
          </ul>
        )}
      </div>
        <Link href="/Profile" className="nav-item">Profile</Link>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <FiBell size={20} color="white" className="icon" />
            <FiMessageCircle size={20} color="white" className="icon" />
          </>
        ) : (
          <>
            <Link href="/login"><button className="btn login-btn">Login</button></Link>
            <Link href="/login"><button className="btn signup-btn">Sign Up</button></Link>
          </>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
