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
  qualifications?: string[]
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

// Helper function to get token safely
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  baseQuery: fetchBaseQuery({
     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
     prepareHeaders: (headers) => {
       const token = getToken();
       if (token) {
         headers.set('Authorization', `Bearer ${token}`);
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

    // Add this endpoint to get single doctor by ID
    getDoctorById: builder.query<DoctorResponse, string>({
      query: (doctorId) => `/api/user/doctors/${doctorId}`,
      providesTags: ['Doctor'],
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
            method: 'DELETE',
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
} = doctorApi