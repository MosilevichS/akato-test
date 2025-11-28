import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

interface Post {
    userId: number
    id: number
    title: string
    body: string
    liked: boolean
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com/',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts?_limit=12',
            providesTags: ['Post'],
            transformResponse: (response: Post[]) => {
                return response.map(post => ({
                    ...post,
                    liked: false
                }));
            },
        }),
        createPost: builder.mutation<Post, Partial<Post>>({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
            invalidatesTags: ['Post'],
        }),
        LikedPost: builder.mutation<void, { postId: number; liked: boolean }>({
            query: () => ({url: '', method: 'POST'}),
            onQueryStarted: ({postId, liked}, {dispatch}) => {
                dispatch(
                    postsApi.util.updateQueryData('getPosts', undefined, draft => {
                        const post = draft.find(p => p.id === postId);
                        if (post) {
                            post.liked = liked;
                        }
                    })
                );
            },
        }),
        deletePost: builder.mutation<void, number>({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'DELETE',
            }),
            onQueryStarted: (postId, {dispatch}) => {
                dispatch(
                    postsApi.util.updateQueryData('getPosts', undefined, draft => {
                        return draft.filter(post => post.id !== postId);
                    })
                );
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useCreatePostMutation,
    useLikedPostMutation,
    useDeletePostMutation
} = postsApi