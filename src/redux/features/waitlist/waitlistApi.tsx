// waitlistApi.ts - Updated with join endpoint
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface WaitlistItem {
  _id: string;
  userId: string;
  doctorId: {
    _id: string;
    fullName: string;
    discipline: string;
  } | null;
  preference: string;
  lookaheadDays: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface JoinWaitlistRequest {
  doctorId: string;
  preference: 'next_available' | 'specific_date';
  specificDate?: string; // Only for specific_date preference
}

export interface RemoveWaitlistResponse {
  success: boolean;
  message: string;
  data: WaitlistItem;
}

export interface JoinWaitlistResponse {
  success: boolean;
  message: string;
  data: WaitlistItem;
}

export const waitlistApi = createApi({
  reducerPath: 'waitlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/waitlist`,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ['Waitlist'],
  endpoints: (builder) => ({
    getMyWaitlist: builder.query<WaitlistItem[], void>({
      query: () => '/my',
      providesTags: ['Waitlist'],
    }),
    joinWaitlist: builder.mutation<JoinWaitlistResponse, JoinWaitlistRequest>({
      query: (waitlistData) => ({
        url: '/join',
        method: 'POST',
        body: waitlistData,
      }),
      invalidatesTags: ['Waitlist'],
    }),
    removeFromWaitlist: builder.mutation<RemoveWaitlistResponse, string>({
      query: (waitlistId) => ({
        url: `/${waitlistId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Waitlist'],
    }),
  }),
});

export const { 
  useGetMyWaitlistQuery, 
  useJoinWaitlistMutation,
  useRemoveFromWaitlistMutation 
} = waitlistApi;