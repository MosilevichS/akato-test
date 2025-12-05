"use client";

import { useGetPostsQuery } from "@/src/shared/api/postsApi";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// TODO: Как обрабатывать динамические роуты в NEXT JS
export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: posts } = useGetPostsQuery();
  // TODO: Поправить типизацию, не использовать any так как это по факту отключает работу typescript
  const [product, setProduct] = useState<any>(null);

  // TODO: Тут надо убрать хуки так как в серверных страницах их нельзя использовать
  useEffect(() => {
    if (posts && id) {
      const foundProduct = posts.find((post) => post.id === +id);

      setProduct(foundProduct);
      if (!foundProduct) {
        notFound();
      }
    }
  }, [posts, id]);
  // TODO: Добавить страницу что продукт не найден и кнопку по которой пользователь может вернуться на страницу продуктов
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10">
        Wrong product. ID: {id}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-200 rounded-lg flex items-center justify-center h-96">
          <span className="text-gray-500">Some picture goes here</span>
        </div>
        <div className="flex flex-col">
          {/* TODO: Посмотреть стили tailwind */}
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-red-400 text-2xl">Title:</span>{" "}
              {product.title}
            </h3>
            <p className="text-1xl font-bold mb-4">
              <span className="text-red-400 text-3xl">Description: </span>
              {product.body}
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-2xl">ID:</span>
                <span className="  text-2xl">{product.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400 text-2xl">UserId:</span>
                <span className="  text-2xl">{product.userId}</span>
              </div>
            </div>
          </div>

          <button className="bg-green-600 mt-auto text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors w-full">
            Some action button
          </button>
        </div>
      </div>
    </div>
  );
}
