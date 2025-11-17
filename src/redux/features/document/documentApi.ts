import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface DocumentCategory {
  _id: string;
  name: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Document {
  _id: string;
  name: string;
  categoryId: string;
  date: string;
  documentUrl: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateCategoryRequest {
  name: string;
}

interface ApiResponse<T> {
  data: T;
}

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Document', 'Category'],
  endpoints: (builder) => ({
    getDocumentCategories: builder.query<ApiResponse<DocumentCategory[]>, void>({
      query: () => '/api/user/documents/categories',
      providesTags: ['Category'],
    }),

    createDocumentCategory: builder.mutation<ApiResponse<DocumentCategory>, CreateCategoryRequest>({
      query: (category) => ({
        url: '/api/user/documents/categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),

    createDocument: builder.mutation<ApiResponse<Document>, FormData>({
      query: (formData) => ({
        url: '/api/user/documents',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Document'],
    }),

    getDocuments: builder.query<ApiResponse<Document[]>, void>({
      query: () => '/api/user/documents',
      providesTags: ['Document'],
    }),

    deleteDocument: builder.mutation<void, string>({
      query: (documentId) => ({
        url: `/api/user/documents/${documentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Document'],
    }),
  }),
});

export const {
  useGetDocumentCategoriesQuery,
  useCreateDocumentCategoryMutation,
  useCreateDocumentMutation,
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
} = documentApi;