"use client";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import BlogFeed from "../../Components/BlogFeed";
import WriteBlogButton from "../../Components/WriteBlogButton";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";


import Link from "next/link";
import { FaHeart, FaRegHeart, FaRegCommentDots, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

// Mock data for recently viewed posts
const recentPosts = [
  {
    id: 1,
    author: "Emma Davis",
    role: "Actress",
    avatar: "https://i.pravatar.cc/150?img=47",
    content: "Had an amazing experience on set today! 🎬 The whole crew was so supportive ❤️",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
    likes: 234,
    comments: 18,
  },
  {
    id: 2,
    author: "Rahul Verma",
    role: "Theater Actor",
    avatar: "https://i.pravatar.cc/150?img=33",
    content: "Opening night was a huge success! Thank you to everyone who came to support. 🎭",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400",
    likes: 189,
    comments: 24,
  },
  {
    id: 3,
    author: "Priya Sharma",
    role: "Dancer",
    avatar: "https://i.pravatar.cc/150?img=25",
    content: "New choreography video is live! Let me know what you think 💃",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
    likes: 456,
    comments: 67,
  },
  {
    id: 4,
    author: "Arjun Kapoor",
    role: "Model",
    avatar: "https://i.pravatar.cc/150?img=15",
    content: "Behind the scenes from yesterday's fashion shoot �",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    likes: 312,
    comments: 42,
  },
];

// Mock data for applied gigs
const appliedGigs = [
  {
    id: 1,
    title: "Lead Actress for Romantic Drama",
    company: "Bollywood Productions",
    location: "Mumbai, India",
    status: "shortlisted",
    appliedDate: "2 days ago",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400",
  },
  {
    id: 2,
    title: "Fashion Week Runway Model",
    company: "Fashion Week India",
    location: "New Delhi, India",
    status: "under_review",
    appliedDate: "5 days ago",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea3c12df?w=400",
  },
  {
    id: 3,
    title: "Playback Singer for Live Concert",
    company: "Concert Masters",
    location: "Bangalore, India",
    status: "selected",
    appliedDate: "1 week ago",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
  },
];

function HomeContent() {
  const { data: session } = useSession();
  const [newBlog, setNewBlog] = useState<any>(null);

  const handleBlogCreated = (blog: any) => {
    setNewBlog(blog);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selected":
        return "bg-green-100 text-green-700";
      case "shortlisted":
        return "bg-blue-100 text-blue-700";
      case "under_review":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    return status.replace("_", " ").charAt(0).toUpperCase() + status.slice(1).replace("_", " ");
  };

  return (
    <div className="bg-gradient-to-b from-[#FFF7DF] to-white min-h-screen">
      <Navbar />

      {/* Personalized Welcome Section */}
      <section className="w-full bg-gradient-to-r from-[#FEF2CB] to-[#FFF7DF] py-12 px-6 md:px-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl text-black font-bold mb-2">
            Welcome back, {session?.user?.name || "Talent"}! 👋
          </h1>
          <p className="text-lg text-gray-700">
            Catch up on what you missed and continue building your stardom.
          </p>
        </div>
      </section>

      {/* Continue Reading - Recent Posts Horizontal Scroller */}
      <section className="px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Continue Reading</h2>
            <Link href="/Posts" className="text-sm text-[#D4AF37] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="min-w-[300px] md:min-w-[350px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow snap-start flex-shrink-0"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.author}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={post.avatar}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt={post.author}
                    />
                    <div>
                      <h3 className="font-semibold text-black">{post.author}</h3>
                      <p className="text-xs text-gray-500">{post.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-500" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRegCommentDots /> {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gigs Applied To - Horizontal Scroller */}
      <section className="px-6 md:px-12 py-10 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Your Applications</h2>
            <Link href="/Auditions" className="text-sm text-[#D4AF37] hover:underline">
              View All
            </Link>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {appliedGigs.map((gig) => (
              <div
                key={gig.id}
                className="min-w-[320px] md:min-w-[380px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 snap-start flex-shrink-0"
              >
                <div className="flex gap-4 p-5">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={gig.image}
                      alt={gig.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-black mb-1 line-clamp-1">
                      {gig.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{gig.company}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                      <FaMapMarkerAlt className="text-[#D4AF37]" />
                      {gig.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(
                          gig.status
                        )}`}
                      >
                        {getStatusText(gig.status)}
                      </span>
                      <span className="text-xs text-gray-400">{gig.appliedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section - All Blogs */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-black mb-4">
              Stories from the Spotlight
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Read inspiring stories, industry insights, and tips from talented creators in the community.
            </p>
          </div>

          {/* Write Blog Button - Only for logged-in users */}
          <div className="flex justify-center mb-8">
            <WriteBlogButton onBlogCreated={handleBlogCreated} />
          </div>

          {/* Blog Feed */}
          <div className="max-w-5xl mx-auto">
            <BlogFeed onNewBlog={newBlog} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}
