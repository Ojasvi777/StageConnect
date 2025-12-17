"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { createBlog } from "../Actions/blogs";

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

interface WriteBlogButtonProps {
	onBlogCreated?: (blog: any) => void;
}

export default function WriteBlogButton({
	onBlogCreated,
}: WriteBlogButtonProps) {
	const { status } = useSession();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showLoginPopup, setShowLoginPopup] = useState(false);

	const [newPost, setNewPost] = useState({
		title: "",
		category: "",
		content: "",
	});

	const handleOpenWriteModal = () => {
		if (status !== "authenticated") {
			setShowLoginPopup(true);
			return;
		}
		setIsModalOpen(true);
	};

	const handleCreatePost = async () => {
		if (!newPost.title || !newPost.content) {
			alert("Please fill in title and content");
			return;
		}

		const result = await createBlog({
			title: newPost.title,
			content: newPost.content,
			category: (newPost.category || "experience") as any,
		});

		if (result.success && result.blog) {
			setNewPost({ title: "", category: "", content: "" });
			setIsModalOpen(false);
			if (onBlogCreated) {
				onBlogCreated(result.blog);
			}
		} else {
			alert(result.error || "Failed to create blog");
		}
	};

	return (
		<>
			{/* Login Popup */}
			{showLoginPopup && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white border border-gray-300 w-full max-w-md p-8 rounded-xl shadow-xl text-center">
						<h3 className="text-xl font-bold text-black mb-4">
							Login Required
						</h3>
						<p className="text-gray-700 mb-6">
							Only logged in users can post blogs.
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

			{/* Write Blog Button */}
			<button
				onClick={handleOpenWriteModal}
				className="ml-auto flex items-center gap-2 bg-[#f5d787] hover:bg-[#e3c971] text-black font-semibold px-4 py-2 rounded-lg shadow-lg"
			>
				<FaPlus /> Write Blog
			</button>

			{/* Write Blog Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white border border-gray-300 w-full max-w-lg p-6 rounded-xl shadow-xl">
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-bold text-black">Create Blog</h3>
							<MdClose
								className="text-2xl cursor-pointer hover:text-gray-500"
								onClick={() => setIsModalOpen(false)}
							/>
						</div>

						<input
							type="text"
							placeholder="Blog title"
							className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-3 text-black"
							value={newPost.title}
							onChange={(e) =>
								setNewPost({ ...newPost, title: e.target.value })
							}
						/>

						<select
							value={newPost.category}
							onChange={(e) =>
								setNewPost({ ...newPost, category: e.target.value })
							}
							className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-3 text-black"
						>
							<option value="">Select category</option>
							{tagsList.map((tag) => (
								<option key={tag.value} value={tag.value}>
									{tag.label}
								</option>
							))}
						</select>

						<textarea
							placeholder="Write your story..."
							rows={5}
							className="w-full bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg mb-3 resize-none text-black"
							value={newPost.content}
							onChange={(e) =>
								setNewPost({ ...newPost, content: e.target.value })
							}
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
		</>
	);
}
