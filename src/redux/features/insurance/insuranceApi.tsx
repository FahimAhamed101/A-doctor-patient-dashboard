// redux/features/insurance/insuranceApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  _id: string;
}

export interface Subscriber {
  firstName: string;
  lastName: string;
  dob: string;
  sex: string;
  employerName: string;
  address: Address;
}

export interface Insurance {
  _id: string;
  subscriber: Subscriber;
  insuranceName: string;
  contractId: string;
  groupNumber: string;
  patientRelationship: string;
  insuranceCard: string;
  digitalSignature: string;
}

export interface InsuranceResponse {
  data: Insurance[];
}

export const insuranceApi = createApi({
  reducerPath: 'insuranceApi',
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
  tagTypes: ['Insurance'],
  endpoints: (builder) => ({
    getInsurance: builder.query<InsuranceResponse, void>({
      query: () => '/user/insurance',
      providesTags: ['Insurance'],
    }),
    addInsurance: builder.mutation<Insurance, FormData>({
      query: (formData) => ({
        url: '/insurance',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Insurance'],
    }),
    updateInsurance: builder.mutation<Insurance, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/insurance/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Insurance'],
    }),
    deleteInsurance: builder.mutation<void, string>({
      query: (id) => ({
        url: `/insurance/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Insurance'],
    }),
  }),
});

export const {
  useGetInsuranceQuery,
  useAddInsuranceMutation,
  useUpdateInsuranceMutation,
  useDeleteInsuranceMutation,
} = insuranceApi;