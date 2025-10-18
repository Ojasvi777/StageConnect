import Navbar from "./nav";
import "./sample.css";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Where Talent Meets Opportunity</h1>
          <p>
            Step into the spotlight. Connect with industry professionals. Transform your passion into your profession.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Join as Talent</button>
            <button className="secondary-btn">Hire Talent</button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <h2>Find Your Next Star</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search by skills, roles, or location..." />
          <button className="search-btn">🔍</button>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Discover Talent Categories</h2>
        <div className="category-grid">
          <div className="category-card">🎤 Singers</div>
          <div className="category-card">🎬 Actors</div>
          <div className="category-card">🎥 Filmmakers</div>
          <div className="category-card">💃 Dancers</div>
          <div className="category-card">🎙 Voice Artists</div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="spotlight">
        <h2>In the Spotlight</h2>
        <div className="spotlight-grid">
          <div className="spotlight-card">
            <Image src="/spotlight1.jpg" alt="Sarah" width={220} height={200} />
            <h3>Sarah Chen</h3>
            <p>Lead Actress</p>
            <span>Booked 3 major roles this month</span>
          </div>
          <div className="spotlight-card">
            <Image src="/spotlight2.jpg" alt="Marcus" width={220} height={200} />
            <h3>Marcus Rivera</h3>
            <p>Music Producer</p>
            <span>Signed with major record label</span>
          </div>
          <div className="spotlight-card">
            <Image src="/spotlight3.jpg" alt="Emma" width={220} height={200} />
            <h3>Emma Rodriguez</h3>
            <p>Film Director</p>
            <span>Won Best Director at Sundance</span>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <h2>Your Journey to Stardom</h2>
        <div className="journey-steps">
          <div className="step">
            <h3>1</h3>
            <p>Create Your Profile</p>
          </div>
          <div className="step">
            <h3>2</h3>
            <p>Showcase Your Work</p>
          </div>
          <div className="step">
            <h3>3</h3>
            <p>Get Discovered</p>
          </div>
        </div>
      </section>

      {/* Featured Auditions */}
      <section className="auditions">
        <h2>Featured Auditions</h2>
        <div className="audition-grid">
          <div className="audition-card open">
            <h3>Lead Role - Drama Series</h3>
            <p>Netflix Original Series seeking lead actress</p>
            <span className="tag open">Open</span>
            <p className="salary">$50K - $100K</p>
            <button>Apply Now</button>
          </div>
          <div className="audition-card closing">
            <h3>Music Video Director</h3>
            <p>Major label artist seeking creative director</p>
            <span className="tag closing">Closing Soon</span>
            <p className="salary">$25K - $40K</p>
            <button>Apply Now</button>
          </div>
          <div className="audition-card filled">
            <h3>Voice Over Artist</h3>
            <p>Animated film voice over opportunity</p>
            <span className="tag filled">Filled</span>
            <p className="salary">$12K - $30K</p>
            <button disabled>Closed</button>
          </div>
        </div>
      </section>
    </div>
  );
}
