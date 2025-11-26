import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Post {
    userId: number
    id: number
    title: string
    body: string
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts?_limit=10',
            providesTags: ['Post'],
        }),
        createPost: builder.mutation<Post, Partial<Post>>({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['Post'],
        }),
    }),
});
export const {
    useGetPostsQuery,
    useCreatePostMutation,
} = postsApi