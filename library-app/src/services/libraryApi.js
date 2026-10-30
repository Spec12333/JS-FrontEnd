import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BOOKS_PER_PAGE = 4;
export const libraryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (page) => `/books?_page=${page}&_limit=${BOOKS_PER_PAGE}`,
      transformResponse: (response, meta) => ({
        books: response,
        total: Number(meta.response.headers.get("X-Total-Count")),
      }),
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    getAuthors: builder.query({
      query: () => "/authors",
      providesTags: ["Books"],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, newBody }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: newBody,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useGetAuthorsQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = libraryApi;
