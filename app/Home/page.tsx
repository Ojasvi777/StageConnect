"use client";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CommentModal from "../Components/CommentModal";
import Image from "next/image";
import { useState } from "react";

interface Reply {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  liked: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  liked: boolean;
  replies?: Reply[];
}

interface Post {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  images: string[];
  liked: boolean;
  likes: number;
  comments: number;
  reposted: boolean;
  reposts: number;
  commentsList: Comment[];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      name: "Emma Davis",
      role: "Actress • Mumbai, IN",
      avatar: "https://i.pravatar.cc/150?img=47",
      content:
        "Had an amazing experience on set today! 🎬 The whole crew was so supportive ❤️ #ActingLife",
      images: ["https://via.placeholder.com/500x300"],
      liked: false,
      likes: 234,
      comments: 18,
      reposted: false,
      reposts: 4,
      commentsList: [
        {
          id: 101,
          author: "Aisha",
          avatar: "https://i.pravatar.cc/150?img=12",
          text: "Amazing! Loved working with you.",
          likes: 4,
          liked: false,
          replies: [
            { id: 201, author: "Rohit", avatar: "https://i.pravatar.cc/150?img=5", text: "Congrats! 👏", likes: 2, liked: false },
          ],
        },
      ],
    },
  ]);

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  // Comments modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activePostId, setActivePostId] = useState<number | null>(null);

  const openComments = (postId: number) => {
    setActivePostId(postId);
    setModalOpen(true);
  };

  const handleRepost = (id: number) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              reposted: !p.reposted,
              reposts: p.reposted ? Math.max(0, p.reposts - 1) : p.reposts + 1,
            }
          : p
      )
    );
  };

  // Comment/reply handlers
  const addComment = (postId: number, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              commentsList: [
                {
                  id: Date.now(),
                  author: "You",
                  avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
                  text,
                  likes: 0,
                  liked: false,
                  replies: [],
                },
                ...(p.commentsList || []),
              ],
              comments: (p.comments || 0) + 1,
            }
          : p
      )
    );
  };

  const addReply = (postId: number, commentId: number, text: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const comments = (p.commentsList || []).map((c: Comment) =>
          c.id === commentId
            ? {
                ...c,
                replies: [
                  { id: Date.now(), author: "You", avatar: `https://i.pravatar.cc/150?u=${Date.now()}`, text, likes: 0, liked: false },
                  ...(c.replies || []),
                ],
              }
            : c
        );
        return { ...p, commentsList: comments, comments: (p.comments || 0) + 1 };
      })
    );
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const comments = (p.commentsList || []).map((c: Comment) =>
          c.id === commentId ? { ...c, liked: !c.liked, likes: c.liked ? Math.max(0, (c.likes || 1) - 1) : (c.likes || 0) + 1 } : c
        );
        return { ...p, commentsList: comments };
      })
    );
  };

  const toggleReplyLike = (postId: number, commentId: number, replyId: number) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const comments = (p.commentsList || []).map((c: Comment) => {
          if (c.id !== commentId) return c;
          const replies = (c.replies || []).map((r: Reply) =>
            r.id === replyId ? { ...r, liked: !r.liked, likes: r.liked ? Math.max(0, (r.likes || 1) - 1) : (r.likes || 0) + 1 } : r
          );
          return { ...c, replies };
        });
        return { ...p, commentsList: comments };
      })
    );
  };

  const handleShare = () => {
    alert("Share feature coming soon! 🚀");
  };

  return (
    <div className="bg-[#FFF7DF] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="w-full text-center bg-[#FEF2CB] py-20 shadow-sm">
        <h1 className="text-4xl text-black font-bold">Welcome to StageConnect</h1>
        <p className="text-black mt-3 max-w-2xl mx-auto">
          Share your journey, discover talent & connect with entertainment professionals.
        </p>
      </section>

      {/* Feed */}
      <main className="flex justify-center mt-10 px-3">
        <div className="w-full max-w-3xl space-y-6">

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl p-5 shadow-md border border-gray-200"
            >
              {/* User */}
              <div className="flex items-center gap-3">
                <Image
                  src={post.avatar}
                  width={48}
                  height={48}
                  className="rounded-full"
                  alt={post.name}
                />
                <div>
                  <h3 className="font-semibold text-lg">{post.name}</h3>
                  <p className="text-gray-500 text-sm">{post.role}</p>
                </div>
              </div>

              {/* Content */}
              <p className="mt-4 text-gray-700">{post.content}</p>

              {post.images?.length > 0 && (
                <Image
                  src={post.images[0]}
                  width={600}
                  height={360}
                  alt="Post image"
                  className="w-full mt-4 rounded-xl"
                />
              )}

              {/* Stats */}
              <div className="flex justify-between mt-4 text-sm text-black font-medium">
                <span>❤️ {post.likes} Likes</span>
                <span onClick={() => openComments(post.id)} className="cursor-pointer">💬 {post.comments} Comments • 🔁 {post.reposts} Reposts</span>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-4 gap-3 mt-5 text-sm text-black">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center justify-center gap-2 py-2 rounded-full hover:bg-gray-500 transition"
                >
                  {post.liked ? "💔 Unlike" : "❤️ Like"}
                </button>

                <button
                  onClick={() => openComments(post.id)}
                  className="flex items-center justify-center gap-2 py-2 rounded-full hover:bg-gray-500 transition"
                >
                  💬 Comment
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 py-2 rounded-full hover:bg-gray-500 transition"
                >
                  📤 Share
                </button>

                <button
                  onClick={() => handleRepost(post.id)}
                  className="flex items-center justify-center gap-2 py-2 rounded-full hover:bg-gray-500 transition"
                >
                  🔁 Repost
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <CommentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        post={posts.find((p) => p.id === activePostId) ?? null}
        comments={posts.find((p) => p.id === activePostId)?.commentsList || []}
        onAddComment={addComment}
        onAddReply={addReply}
        onToggleCommentLike={toggleCommentLike}
        onToggleReplyLike={toggleReplyLike}
        onTogglePostLike={(id) => toggleLike(id)}
        onToggleRepost={(id) => handleRepost(id)}
      />

      <Footer />
    </div>
  );
}
