"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  FaHeart,
  FaRegHeart,
  FaRegCommentDots,
  FaShare,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import {
  getBlogs,
  toggleBlogLike,
  addBlogComment,
  getBlogComments,
} from "../Actions/blogs";

const tagsList = [
  { value: "acting", label: "Acting" },
  { value: "dancing", label: "Dancing" },
  { value: "singing", label: "Singing" },
  { value: "modeling", label: "Modeling" },
  { value: "voiceover", label: "Voiceover" },
  { value: "photography", label: "Photography" },
  { value: "tips", label: "Tips" },
  { value: "experience", label: "Experience" },
  { value: "industry_news", label: "Industry News" },
  { value: "other", label: "Other" },
];

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string | null;
  author: {
    id: string;
    name: string;
    image: string | null;
    role: string;
  };
  likes: number;
  comments: number;
  liked: boolean;
  createdAt: Date;
}

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
  createdAt: Date;
}

interface BlogFeedProps {
  onNewBlog?: any;
}

export default function BlogFeed({ onNewBlog }: BlogFeedProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "trending">("newest");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [blogData, setBlogData] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlogComments, setSelectedBlogComments] = useState<Comment[]>(
    []
  );
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  // Fetch blogs on mount and when filters change
  useEffect(() => {
    fetchBlogs();
  }, [selectedTag, sortBy]);

  // Add new blog to feed when created
  useEffect(() => {
    if (onNewBlog) {
      setBlogData((prev) => [onNewBlog, ...prev]);
    }
  }, [onNewBlog]);

  const fetchBlogs = async () => {
    setLoading(true);
    const result = await getBlogs({
      category: selectedTag as any,
      sortBy,
    });

    if (result.success && result.blogs) {
      setBlogData(result.blogs);
    }
    setLoading(false);
  };

  const handleLike = async (id: string) => {
    if (status !== "authenticated") {
      setShowLoginPopup(true);
      return;
    }

    // Optimistic update
    setBlogData((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );

    const result = await toggleBlogLike(id);

    if (!result.success) {
      // Revert on error
      setBlogData((prev) =>
        prev.map((post) =>
          post.id === id
            ? {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
              }
            : post
        )
      );
      alert(result.error || "Failed to like post");
    } else {
      // Update with actual count from server
      setBlogData((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, likes: result.likeCount || 0 } : post
        )
      );
    }
  };

  const handleOpenComments = async (blogId: string) => {
    if (status !== "authenticated") {
      setShowLoginPopup(true);
      return;
    }

    setSelectedBlogId(blogId);
    setIsCommentModalOpen(true);

    const result = await getBlogComments(blogId);
    if (result.success && result.comments) {
      setSelectedBlogComments(result.comments);
    }
  };

  const handleAddComment = async () => {
    if (!selectedBlogId || !newComment.trim()) return;

    const result = await addBlogComment(selectedBlogId, newComment);

    if (result.success && result.comment) {
      setSelectedBlogComments((prev) => [result.comment!, ...prev]);
      setNewComment("");

      // Update comment count
      setBlogData((prev) =>
        prev.map((post) =>
          post.id === selectedBlogId
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
    } else {
      alert(result.error || "Failed to add comment");
    }
  };

  const handleShare = (blogId: string) => {
    const url = `${window.location.origin}/Blog?id=${blogId}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const filteredBlogs = blogData.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - new Date(date).getTime()) / 1000
    );

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white text-black px-6 md:px-12 pb-10 font-inter">
      {/* Login Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 w-full max-w-md p-8 rounded-xl shadow-xl text-center">
            <h3 className="text-xl font-bold text-black mb-4">
              Login Required
            </h3>
            <p className="text-gray-700 mb-6">
              Only logged in users can like posts and comment.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  router.push("/login");
                }}
                className="bg-[#f5d787] hover:bg-[#e3c971] text-black font-semibold px-6 py-2 rounded-lg"
              >
                Go to Login
              </button>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="bg-gray-200 hover:bg-gray-300 text-black font-semibold px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search stories, tips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#f5d787] outline-none"
        />

        <select
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg"
          onChange={(e) => setSortBy(e.target.value as "newest" | "trending")}
          value={sortBy}
        >
          <option value="newest">Newest</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tagsList.map((tag) => (
          <button
            key={tag.value}
            onClick={() =>
              setSelectedTag(tag.value === selectedTag ? null : tag.value)
            }
            className={`px-3 py-1 rounded-full border ${
              selectedTag === tag.value
                ? "bg-[#f5d787] text-black"
                : "border-gray-300 hover:border-[#f5d787] text-black"
            } transition`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      {/* Blog Feed */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : filteredBlogs.length === 0 ? (
          <p className="text-center text-gray-500">No posts found 😅</p>
        ) : (
          filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 border border-gray-300 rounded-xl p-6 shadow-md"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="text-sm text-gray-600">
                      {post.author.role} • {formatTimeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>
                <span className="bg-yellow-100 px-2 py-1 rounded text-xs text-black capitalize">
                  {post.category.replace("_", " ")}
                </span>
              </div>

              <h2 className="text-lg font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-700 mb-3 whitespace-pre-wrap">
                {post.content}
              </p>

              {post.image && (
                <div className="w-full h-52 relative mb-4">
                  <Image
                    src={post.image}
                    alt="Blog Image"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-6 text-lg mt-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1"
                >
                  {post.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="hover:text-red-500" />
                  )}
                  <span className="text-sm">{post.likes}</span>
                </button>

                <button
                  onClick={() => handleOpenComments(post.id)}
                  className="flex items-center gap-1 hover:text-[#f5d787]"
                >
                  <FaRegCommentDots />{" "}
                  <span className="text-sm">{post.comments}</span>
                </button>

                <button
                  onClick={() => handleShare(post.id)}
                  className="hover:text-[#f5d787]"
                  title="Copy link to clipboard"
                >
                  <FaShare />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comments Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-gray-300 w-full max-w-lg p-6 rounded-xl shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Comments</h3>
              <MdClose
                className="text-2xl cursor-pointer hover:text-gray-500"
                onClick={() => {
                  setIsCommentModalOpen(false);
                  setSelectedBlogId(null);
                  setSelectedBlogComments([]);
                  setNewComment("");
                }}
              />
            </div>

            {/* Add Comment */}
            <div className="mb-4">
              <textarea
                placeholder="Write a comment..."
                rows={3}
                className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-2 resize-none text-black"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="bg-[#f5d787] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#dab95e] transition"
              >
                Add Comment
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {selectedBlogComments.length === 0 ? (
                <p className="text-center text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                selectedBlogComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {comment.author.image && (
                        <Image
                          src={comment.author.image}
                          alt={comment.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-sm">
                          {comment.author.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
