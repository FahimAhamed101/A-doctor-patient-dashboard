import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/onboarding`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Onboarding'],
  endpoints: (builder) => ({
    updatePersonalInfo: builder.mutation({
      query: (formData: FormData) => ({
        url: '/personal-info',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Onboarding'],
    }),
    updateMedicalInfo: builder.mutation({
  query: (medicalData) => ({
    url: '/medical-info',
    method: 'POST',
    body: medicalData,
  }),
  invalidatesTags: ['Onboarding'],
}),
updateInsuranceInfo: builder.mutation({
  query: (formData: FormData) => ({
    url: '/insurance-info',
    method: 'POST',
    body: formData,
    // Remove Content-Type header for FormData to let browser set it automatically
    headers: {}
  }),
  invalidatesTags: ['Onboarding'],
}),
    // Add other onboarding endpoints as needed
  }),
});

export const {
  useUpdatePersonalInfoMutation,useUpdateMedicalInfoMutation, useUpdateInsuranceInfoMutation
  
} = onboardingApi;