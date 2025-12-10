"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BlogFeed from "../Components/BlogFeed";
import WriteBlogButton from "../Components/WriteBlogButton";

export default function BlogPage() {
  const [newBlog, setNewBlog] = useState<any>(null);

  const handleBlogCreated = (blog: any) => {
    setNewBlog(blog);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header with Write Button */}
        <div className="px-6 md:px-12 pt-10 pb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-black">Blog</h1>
            {/* Only WriteBlogButton needs session */}
            <SessionProvider>
              <WriteBlogButton onBlogCreated={handleBlogCreated} />
            </SessionProvider>
          </div>
        </div>

        {/* Blog Feed - wrapped in SessionProvider for like/comment interactions */}
        <SessionProvider>
          <BlogFeed onNewBlog={newBlog} />
        </SessionProvider>
      </div>
      <Footer />
    </>
  );
}
