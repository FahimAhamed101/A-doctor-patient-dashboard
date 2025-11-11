// lib/features/medical/medicalApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Allergy {
  _id?: string;
  name: string;
  severity: string;
}

export interface Medication {
  reminderTime: string;
  _id?: string;
  name: string;
  dosage: string;
  notify?: boolean; // Make it optional
}

export interface ExistingCondition {
  _id?: string;
  name: string;
}

export interface LifestyleFactor {
  _id?: string;
  type: string;
}

export interface MedicalInfo {
  _id?: string;
  allergies: Allergy[];
  medications: Medication[];
  existingConditions: ExistingCondition[];
  lifestyleFactors: LifestyleFactor[];
}

export interface MedicalInfoResponse {
  data: MedicalInfo;
}

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
};

export const medicalApi = createApi({
  reducerPath: 'medicalApi',
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
  tagTypes: ['MedicalInfo'],
  endpoints: (builder) => ({
    getMedicalInfo: builder.query<MedicalInfoResponse, void>({
      query: () => '/api/user/me/medical-info',
      providesTags: ['MedicalInfo'],
    }),
    updateMedicalInfo: builder.mutation<MedicalInfoResponse, MedicalInfo>({
      query: (medicalInfo) => ({
        url: '/api/user/me/medical-info',
        method: 'PUT',
        body: medicalInfo,
      }),
      invalidatesTags: ['MedicalInfo'],
    }),
  }),
});

export const { useGetMedicalInfoQuery, useUpdateMedicalInfoMutation } = medicalApi;