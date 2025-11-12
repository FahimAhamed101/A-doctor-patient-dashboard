// lib/api/doctorApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Doctor {
  _id: string
  fullName: string
  discipline: string
  isFavorite: boolean
  profilePicture?: string
  organization?: string
  timesAvailable?: number
  isVerified?: boolean
  email?: string
  mobile?: string
  clinicName?: string
  officeLocation?: string[]
  popularReasonsToVisit?: string[]
  qualifications?: Array<{ [key: string]: string }> | string[]
  status?: string
  googleMapUrl?: string[]
  role?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
  
}

// API Response interfaces
export interface DoctorsResponse {
  data: Doctor[]
}

export interface DoctorResponse {
  data: Doctor
}

export interface FavoriteResponse {
  success: boolean
  message: string
  data?: Doctor
}

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Doctor'],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => '/api/user/doctors',
      transformResponse: (response: DoctorsResponse): Doctor[] => {
        return response.data || []
      },
      providesTags: ['Doctor'],
    }),

      // Fix this endpoint - it should return Doctor directly
    getDoctorById: builder.query<Doctor, string>({
      query: (doctorId) => `/api/user/doctors/${doctorId}`,
      transformResponse: (response: DoctorResponse): Doctor => {
        return response.data;
      },
      providesTags: (result, error, id) => [{ type: 'Doctor', id }],
    }),
    
    // Add to favorites
    addToFavorites: builder.mutation<FavoriteResponse, { doctorId: string }>({
      query: ({ doctorId }) => ({
        url: '/api/user/favorites',
        method: 'POST',
        body: { doctorId },
      }),
      invalidatesTags: ['Doctor'],
    }),

    // Remove from favorites
    removeFromFavorites: builder.mutation<FavoriteResponse, { doctorId: string }>({
      query: ({ doctorId }) => ({
        url: '/api/user/favorites',
          method: 'POST',
        body: { doctorId },
      }),
      invalidatesTags: ['Doctor'],
    }),

    // Toggle favorite
    toggleFavorite: builder.mutation<FavoriteResponse, { doctorId: string; isFavorite: boolean }>({
      query: ({ doctorId, isFavorite }) => {
        if (isFavorite) {
          return {
            url: '/api/user/favorites',
            method: 'POST',
            body: { doctorId },
          }
        }
        return {
          url: '/api/user/favorites',
                 method: 'POST',
          body: { doctorId },
        }
      },
      invalidatesTags: ['Doctor'],
    }),

    // Get favorite doctors
    getFavorites: builder.query<Doctor[], void>({
      query: () => '/api/user/favorites',
      transformResponse: (response: DoctorsResponse): Doctor[] => {
        return response.data || []
      },
      providesTags: ['Doctor'],
    }),
  }),
})

export const { 
  useGetDoctorsQuery, 
  useGetDoctorByIdQuery,
  useToggleFavoriteMutation,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useGetFavoritesQuery 
} = doctorApi;