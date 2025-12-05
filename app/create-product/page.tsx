"use client";
import { useEffect, useState } from "react";
import { useCreatePostMutation } from "@/src/shared/api/postsApi";

export default function CreateProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
// TODO: Добавить валидацию формы через React Hook Form
  const [createPost, { isLoading, isError, isSuccess }] =
    useCreatePostMutation();
  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setId("");
      setUserId("");
    }
  }, [isSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      title,
      body: description,
      userId: Number(userId),
      id: Number(id),
    };
    createPost(newPost);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-black flex items-center m-5 justify-center">
        Create Product Form
      </h1>

      <form
        className="p-6 max-w-2xl mx-auto border border-gray-300 rounded-lg bg-white shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Title *
          </label>
          <input
            type="text"
            placeholder="Enter product title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={5}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Description *
          </label>
          <textarea
            placeholder="Enter product description"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-300 focus:border-transparent resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={10}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ID *
            </label>
            <input
              type="number"
              placeholder="Enter ID"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-300 focus:border-transparent"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User ID *
            </label>
            <input
              type="number"
              placeholder="Enter User ID"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-300 focus:border-transparent"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              min="1"
            />
          </div>
        </div>

        {isError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            Error creating product. Please try again.
          </div>
        )}

        {isSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            Product created successfully!
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>
    </>
  );
}
