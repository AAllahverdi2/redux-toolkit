import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://northwind.vercel.app/api/' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => 'categories',
        }),
        getCategoryDetail: builder.query({
            query: (id) => `categories/${id}`,
        }),
        updateCategory: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `categories/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `categories/${id}`,
                method: 'DELETE',
            }),
        }),
        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: 'categories',
                method: 'POST',
                body: newCategory,
            }),
        }),
    }),
})

export const { useGetCategoriesQuery, useGetCategoryDetailQuery, useUpdateCategoryMutation, useDeleteCategoryMutation, useAddCategoryMutation } = categoriesApi
