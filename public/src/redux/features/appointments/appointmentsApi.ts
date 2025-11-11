// app/api/appointmentsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Appointment {
  _id: string;
  patientId: string;
  doctorId: {
    _id: string;
    fullName: string;
    discipline: string;
    officeLocation?: string[];
  };
  dateTime: string;
  visitReason: string;
  visitType: string;
  insurance: string;
  symptoms: string[];
  summary: string;
  documents: Array<{
    fileName: string;
    url: string;
    mimeType: string;
    sizeBytes: number;
  }>;
  currentMedications: Array<{
    name: string;
    dosage: string;
    _id: string;
  }>;
  priorDiagnoses: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'booked';
  createdAt: string;
  updatedAt: string;
  checkInTime?: string;
}

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments`,
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
  tagTypes: ['Appointments'],
  endpoints: (builder) => ({
    getMyAppointments: builder.query<Appointment[], void>({
      query: () => '/my-appointments?count=all',
      providesTags: ['Appointments'],
    }),
    getAppointmentDetails: builder.query<Appointment, string>({
      query: (appointmentId) => `/${appointmentId}/details`,
      providesTags: (result, error, appointmentId) => [
        { type: 'Appointments', id: appointmentId }
      ],
    }),
    cancelAppointment: builder.mutation({
      query: (appointmentId: string) => ({
        url: `/${appointmentId}/cancel`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointments'],
    }),
    rescheduleAppointment: builder.mutation({
      query: ({ appointmentId, newDateTime }: { appointmentId: string; newDateTime: string }) => ({
        url: `/${appointmentId}/reschedule`,
        method: 'PUT',
        body: { newDateTime },
      }),
      invalidatesTags: ['Appointments'],
    }),
    checkInAppointment: builder.mutation({
      query: (appointmentId: string) => ({
        url: `/${appointmentId}/check-in`,
        method: 'POST',
      }),
      invalidatesTags: ['Appointments'],
    }),
  }),
});

export const {
  useGetMyAppointmentsQuery,
  useGetAppointmentDetailsQuery,
  useCancelAppointmentMutation,
  useRescheduleAppointmentMutation,
  useCheckInAppointmentMutation,
} = appointmentsApi;