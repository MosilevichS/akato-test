"use client";
import {useGetPostsQuery} from "@/src/shared/api/postsApi";
import {useEffect, useState} from "react";

export default function Page() {
    const {
        data: posts,
        error,
        isLoading,
    } = useGetPostsQuery()
    const [actualPosts, setActualPosts] = useState(posts || []);
    useEffect(() => {
        if (posts) {
            setActualPosts(posts);
        }
    }, [posts]);
    const postDelete = (postId: number) => {
        setActualPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    if (isLoading) {
        return <div className="px-2 py-2 items-center font-light">Loading posts .... </div>
    }

    if (error) {
        return <div className="px-2 py-2 items-center font-light">Error.....</div>
    }


  return (
      <div className="ml-auto px-5 py-6 columns-8 gap-x-1 space-y-4">
          {actualPosts?.map((post) => (
              <div key={post.id} className="mb-2 px-4 py-2 border relative border-gray-300 rounded-lg bg-lime-100 w-[200px] h-[300px] break-inside-avoid">
                  <h3 className="text-black h-[50px] max-h-[50px] overflow-hidden" ><span className="text-red-400">Title:</span> {post.title}</h3>
                  <p className="text-black max-h-[170px] overflow-hidden"><span className="text-red-400 mr-2">Body:</span>{post.body}</p>
                  <span className="text-red-400 mr-4">Id:</span> <span className="text-black">{post.id}</span>
                  <button
                      className="absolute bottom-0.5 right-0.5 w-6 h-6 bg-gray-200 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors group">
                      <svg
                          className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                  </button>
                  <button
                      className="absolute bottom-0.5 left-0.5 w-6 h-6 bg-gray-200 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors group"
                  onClick={() => postDelete(post.id)}>
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

  );
}
