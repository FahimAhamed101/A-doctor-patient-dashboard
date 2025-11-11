// redux/features/medications/medicationsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Medication {
  _id: string;
  name: string;
  dosage: string;
  reminderTime: string;
  notify: boolean;
  instructions?: string;
}

export interface MedicationsResponse {
  success: boolean;
  medications: Medication[];
}

export const medicationsApi = createApi({
  reducerPath: 'medicationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Medications'],
  endpoints: (builder) => ({
    getMedications: builder.query<MedicationsResponse, void>({
      query: () => '/user/medications',
      providesTags: ['Medications'],
    }),
  }),
});

export const { useGetMedicationsQuery } = medicationsApi;