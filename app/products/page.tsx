"use client";
import {useDeletePostMutation, useGetPostsQuery, useLikedPostMutation} from "@/src/shared/api/postsApi";
import {twMerge} from "tailwind-merge";
import {useState} from "react";

export default function Page() {
    const {
        data: posts,
        error,
        isLoading,
    } = useGetPostsQuery()
    const [likedPost] = useLikedPostMutation();
    const [deletePost] = useDeletePostMutation()

    const [filteredPosts, setFilteredPosts] = useState(false);

    const postDelete = (postId: number) => {
        deletePost(postId);
    };

    const postLike = async (postId: number, currentlyLiked: boolean) => {
        likedPost({
            postId,
            liked: !currentlyLiked
        });
    };

    if (isLoading) {
        return <div className="px-2 py-2 items-center font-light">Loading posts .... </div>
    }

    if (error) {
        return <div className="px-2 py-2 items-center font-light">Error.....</div>
    }

    return (
        <>
            <div className="w-full relative flex items-center justify-center px-5 py-5 border-b border-gray-200">
                <h1 className="text-black text-3xl font-bold text-center">Product's page</h1>
                <button
                    className="absolute right-5 w-10 h-10 text-gray-500 hover:text-blue-500 transition-colors"
                    onClick={() => setFilteredPosts(!filteredPosts)}
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
                    </svg>
                </button>
            </div>

            <div className="px-5 py-6 columns-8  gap-4 space-y-4">
                {posts?.filter(post => filteredPosts ? post.liked : true).map((post) => (
                    <div key={post.id}
                         className="mb-4 px-4 py-3 border relative border-gray-300 rounded-lg bg-lime-100 h-[300px] break-inside-avoid">
                        <h3 className="text-black font-semibold h-12 overflow-hidden mb-2">
                            <span className="text-red-400">Title:</span> {post.title}
                        </h3>
                        <p className="text-black h-32 overflow-hidden text-sm mb-3">
                            <span className="text-red-400 mr-1">Body:</span>{post.body}
                        </p>
                        <div className="flex justify-between items-center">
                            <span className="text-red-400">Id:</span>
                            <span className="text-black font-medium">{post.id}</span>
                        </div>

                        <button
                            className={twMerge(
                                "absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center transition-colors group",
                                post.liked
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-gray-200 hover:bg-red-500"
                            )}
                            onClick={() => postLike(post.id, post.liked)}
                        >
                            <svg
                                className={twMerge(
                                    "w-3 h-3 transition-colors",
                                    post.liked
                                        ? "text-white"
                                        : "text-gray-500 group-hover:text-white"
                                )}
                                fill={post.liked ? "currentColor" : "none"}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                        </button>

                        <button
                            className="absolute bottom-2 left-2 w-6 h-6 bg-gray-200 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors group"
                            onClick={() => postDelete(post.id)}
                        >
                            <svg
                                className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}