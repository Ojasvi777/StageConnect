"use client";

import React, { useState } from "react";
import Image from "next/image";

type Reply = {
  id: number;
  author: string;
  avatar?: string;
  text: string;
  liked?: boolean;
  likes?: number;
};

type Comment = {
  id: number;
  author: string;
  avatar?: string;
  text: string;
  liked?: boolean;
  likes?: number;
  replies?: Reply[];
};

type PostBrief = {
  id: number;
  name: string;
  avatar: string;
  content: string;
  images?: string[];
  liked?: boolean;
  likes: number;
  reposted?: boolean;
  reposts: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  post?: PostBrief | null;
  comments: Comment[];
  onAddComment: (postId: number, text: string) => void;
  onAddReply: (postId: number, commentId: number, text: string) => void;
  onToggleCommentLike: (postId: number, commentId: number) => void;
  onToggleReplyLike: (postId: number, commentId: number, replyId: number) => void;
  onTogglePostLike?: (postId: number) => void;
  onToggleRepost?: (postId: number) => void;
};

export default function CommentModal({
  open,
  onClose,
  post,
  comments,
  onAddComment,
  onAddReply,
  onToggleCommentLike,
  onToggleReplyLike,
  onTogglePostLike,
  onToggleRepost,
}: Props) {
  const [text, setText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  if (!open) return null;

  const submitComment = () => {
    if (!post) return;
    if (!text.trim()) return;
    onAddComment(post.id, text.trim());
    setText("");
  };

  const submitReply = (commentId: number) => {
    if (!post) return;
    if (!replyText.trim()) return;
    onAddReply(post.id, commentId, replyText.trim());
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />

      <div className="relative w-full max-w-5xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-lg font-semibold">Comments</h3>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Post preview on left */}
          <div className="md:w-1/3 p-4 border-r">
            {post ? (
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={post.avatar || "/default-avatar.png"}
                    width={48}
                    height={48}
                    className="rounded-full"
                    alt={post.name}
                  />
                  <div>
                    <div className="font-semibold">{post.name}</div>
                  </div>
                </div>

                <p className="mt-3 text-gray-700">{post.content}</p>
                {post.images?.[0] && (
                  <Image
                    src={post.images[0]}
                    width={400}
                    height={300}
                    alt="Post image"
                    className="w-full mt-3 rounded-md"
                  />
                )}

                <div className="mt-4 text-sm flex items-center gap-4">
                  <button onClick={() => onTogglePostLike && onTogglePostLike(post.id)}>
                    {post.liked ? "💔 Unlike" : "❤️ Like"} ({post.likes})
                  </button>
                  <button onClick={() => onToggleRepost && onToggleRepost(post.id)}>
                    {post.reposted ? "Undo Repost" : "🔁 Repost"} ({post.reposts})
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Post not available</div>
            )}
          </div>

          {/* Comments column */}
          <div className="md:w-2/3 p-4">
            <div className="max-h-[60vh] overflow-auto space-y-4">
              {comments.length === 0 && (
                <p className="text-gray-500">No comments yet — be the first to comment.</p>
              )}

              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <Image
                    src={c.avatar || "/default-avatar.png"}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={c.author}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{c.author}</div>
                        <div className="text-sm text-gray-700">{c.text}</div>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-3">
                        <button onClick={() => onToggleCommentLike(post?.id ?? 0, c.id)}>
                          {c.liked ? "♥" : "♡"}
                        </button>
                        <span>{c.likes ?? 0}</span>
                      </div>
                    </div>

                    {/* Replies */}
                    <div className="mt-2 ml-0 pl-0">
                      {(c.replies || []).map((r) => (
                        <div key={r.id} className="flex items-start gap-2 mt-2">
                          <Image
                            src={r.avatar || "/default-avatar.png"}
                            width={32}
                            height={32}
                            className="rounded-full"
                            alt={r.author}
                          />
                          <div className="flex-1 text-sm">
                            <div className="font-semibold">{r.author}</div>
                            <div className="text-gray-700">{r.text}</div>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <button onClick={() => onToggleReplyLike(post?.id ?? 0, c.id, r.id)}>
                              {r.liked ? "♥" : "♡"}
                            </button>
                            <span>{r.likes ?? 0}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 text-sm flex items-center gap-3">
                      <button
                        onClick={() => setReplyingTo((prev) => (prev === c.id ? null : c.id))}
                        className="text-blue-600"
                      >
                        Reply
                      </button>
                    </div>

                    {replyingTo === c.id && (
                      <div className="mt-2 flex gap-2">
                        <input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-md"
                          placeholder={`Reply to ${c.author}`}
                        />
                        <button onClick={() => submitReply(c.id)} className="bg-blue-600 text-white px-3 py-1 rounded-md">Reply</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Composer for new comment */}
            <div className="mt-4 border-t pt-3">
              <div className="flex gap-2">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <button onClick={submitComment} className="bg-blue-600 text-white px-4 py-2 rounded-md">Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
