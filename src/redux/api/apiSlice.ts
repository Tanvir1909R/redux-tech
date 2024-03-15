import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/tech-net"}),
    tagTypes:['comments'],
    endpoints:(builder)=>({
        getProducts: builder.query({
            query: () => "/products"
        }),
        singleProduct: builder.query({
            query: (id) => `/product/${id}`
        }),
        postComment:builder.mutation({
            query: ({data,id})=>({
                url:`/comment/${id}`,
                method:"POST",
                body:data
            }),
            invalidatesTags:["comments"]
        }),
        singleComment:builder.query({
            query:(id) => `/comment/${id}`,
            providesTags:["comments"]
        })
    })
})

export const {useGetProductsQuery,useSingleProductQuery,usePostCommentMutation,useSingleCommentQuery} = api

export default api