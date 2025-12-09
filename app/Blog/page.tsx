"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots, FaShare, FaBookmark, FaRegBookmark, FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
// Sample tags for filter
const tagsList = ["Acting", "Dancing", "Singing", "Modeling", "Voiceover", "Photography", "Tips", "Experience"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [blogData, setBlogData] = useState([
    {
      id: 1,
      author: "Aditi Sharma",
      role: "Actor",
      tag: "Acting",
      date: "2h ago",
      title: "How I cracked my first film audition",
      content: "Being consistent and attending local theatre events helped me so much!",
      image: "/images/audition.jpg" as string | null,
      liked: false,
      bookmarked: false,
      likes: 24,
      comments: 4,
    },
    {
      id: 2,
      author: "Rohan Verma",
      role: "Dancer",
      tag: "Dancing",
      date: "1 day ago",
      title: "Choreography tips for beginners 🔥",
      content: "Always start with body control and footwork drills.",
      image: "/images/dance.jpg" as string | null,
      liked: true,
      bookmarked: true,
      likes: 87,
      comments: 12,
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    tag: "",
    content: "",
  });

  const handleLike = (id: number) => {
    setBlogData(prev =>
      prev.map(post =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleBookmark = (id: number) => {
    setBlogData(prev =>
      prev.map(post =>
        post.id === id ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const filteredBlogs = blogData.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) &&
    (!selectedTag || post.tag === selectedTag)
  );

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return alert("Write something first!");

    setBlogData((prev) => [
      {
        id: blogData.length + 1,
        author: "You",
        role: "Creator",
        tag: newPost.tag || "Experience",
        date: "Just now",
        title: newPost.title,
        content: newPost.content,
        image: null,
        liked: false,
        bookmarked: false,
        likes: 0,
        comments: 0,
      },
      ...prev,
    ]);

    setNewPost({ title: "", tag: "", content: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-12 py-10 font-inter">

      {/* Search + Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">

        <input
          type="text"
          placeholder="Search stories, tips..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#f5d787] outline-none"
        />

        <select
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="newest">Newest</option>
          <option value="trending">Trending</option>
        </select>
         <button
          onClick={() => setIsModalOpen(true)}
 className="ml-auto flex items-center gap-2 bg-[#f5d787] hover:bg-[#e3c971] text-black font-semibold px-4 py-2 rounded-lg shadow-lg"
        >
          <FaPlus /> Write Blog
        </button>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tagsList.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`px-3 py-1 rounded-full border ${
              selectedTag === tag
                ? "bg-[#f5d787] text-black"
                : "border-gray-300 hover:border-[#f5d787] text-black"
            } transition`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Blog Feed */}
      <div className="flex flex-col gap-6">
        {filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No posts found 😅</p>
        ) : (
          filteredBlogs.map(post => (
            <div key={post.id} className="bg-gray-50 border border-gray-300 rounded-xl p-6 shadow-md">

              {/* Header Row */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-gray-600">{post.role} • {post.date}</p>
                </div>
                <span className="bg-yellow-100 px-2 py-1 rounded text-xs text-black">{post.tag}</span>
              </div>

              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-700 mb-3">{post.content}</p>

              {post.image && typeof post.image === "string" && (
                <div className="w-full h-52 relative mb-4">
                  <Image src={post.image} alt="Blog Image" fill className="object-cover rounded-lg" />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-6 text-lg mt-2">
                <button onClick={() => handleLike(post.id)} className="flex items-center gap-1">
                  {post.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="hover:text-red-500" />
                  )}
                  <span className="text-sm">{post.likes}</span>
                </button>

                <button className="flex items-center gap-1 hover:text-[#f5d787]">
                  <FaRegCommentDots /> <span className="text-sm">{post.comments}</span>
                </button>

                <button className="hover:text-[#f5d787]">
                  <FaShare />
                </button>

                <button onClick={() => handleBookmark(post.id)}>
                  {post.bookmarked ? (
                    <FaBookmark className="text-[#f5d787]" />
                  ) : (
                    <FaRegBookmark className="hover:text-[#f5d787]" />
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Write Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 w-full max-w-lg p-6 rounded-xl shadow-xl">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Create Blog</h3>
              <MdClose
                className="text-2xl cursor-pointer hover:text-gray-300"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <input
              type="text"
              placeholder="Blog title"
              className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-3 text-black"
              value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
            />

            <select
              value={newPost.tag}
              onChange={e => setNewPost({ ...newPost, tag: e.target.value })}
              className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-3 text-black"
            >
              <option value="">Select category</option>
              {tagsList.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>

            <textarea
              placeholder="Write your story..."
              rows={5}
              className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-3 resize-none text-black"
              value={newPost.content}
              onChange={e => setNewPost({ ...newPost, content: e.target.value })}
            />

            <button
              onClick={handleCreatePost}
              className="bg-[#f5d787] text-black font-semibold px-4 py-2 rounded-lg w-full hover:bg-[#dab95e] transition"
            >
              Publish
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
