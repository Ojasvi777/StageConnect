"use client";
import Link from "next/link";
import "./nav.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
  <span className="logo-stage">Stage</span>
  <span className="logo-connect">Connect</span>
</div>
<ul className="navbar-links">
        <li><Link href="#">Find Talent</Link></li>
        <li><Link href="#">Browse Jobs</Link></li>
        <li><Link href="#">About</Link></li>
      </ul>
      <div className="navbar-actions">
        <button className="signin-btn">Sign In</button>
      </div>
    </nav>
  );
}
