"use client";
import {useGetPostsQuery} from "@/src/shared/api/postsApi";

export default function Page() {
    const {
        data: posts,
        error,
        isLoading,
    } = useGetPostsQuery()

    if (isLoading) {
        return <div className="px-2 py-2 items-center font-light">Загрузка постов...</div>
    }

    if (error) {
        return <div className="px-2 py-2 items-center font-light">Ошибка.....</div>
    }


  return (
      <div className="px-4">
          {posts?.map((post) => (
              <div key={post.id} className="mb-2 px-4 py-2 border relative border-gray-300 rounded-lg bg-lime-100">
                  <h3 className="text-black"><span className="text-red-400">Title:</span> {post.title}</h3>
                  <p className="text-black"><span className="text-red-400 mr-2">Body:</span>{post.body}</p>
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
              </div>
          ))}
      </div>

  );
}
