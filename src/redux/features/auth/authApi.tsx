import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Interfaces
interface RegisterResponse {
  message: string;
}

interface RegisterRequest {

  email: string;
  password: string;
}

interface UpdatePatientProfileRequest {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  sex: string;
  maritalStatus: string;
  bloodGroup: string;
  numChildren: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  employer: string;
  driverLicense: string;
  tin: string;
  licenseFrontImage?: File | null; // Add null here
  licenseBackImage?: File | null;  // Add null here
}

interface UpdatePatientProfileResponse {
  message: string;
  data: UserProfileResponse['data'];
}



// In your authApi file, update the LoginResponse interface:
interface LoginResponse {
  user: {
    _id: string;
    email: string;
    authProvider: string;
    isVerified: boolean;
    onboardingStep: number;
    role: string;
    favoriteDoctors: any[];
    insuranceInfo: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    personalInfo?: {
      fullName: {
        first: string;
        middle: string;
        last: string;
      };
      driversLicense?: {
        licenseNumber: string;
        frontImage: string;
        backImage: string;
      };
      dob?: string;
      sex?: string;
      maritalStatus?: string;
      bloodGroup?: string;
      numberOfChildren?: number;
      email?: string;
      phone?: string;
      address?: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        zip: string;
        _id: string;
      };
      employer?: string;
      last4SSN?: string;
      _id?: string;
    };
  };
  accessToken: string;
  refreshToken: string;
  message?: string;
}

interface UserProfileResponse {
  code: number;
  message: string;
  data: {
    driversLicense: any;
    last4SSN: string;
    employer: string;
    address: any;
    phone: string;
    email: string;
    numberOfChildren: any;
    maritalStatus: string;
    bloodGroup: string;
    sex: string;
    dob: string | number | Date;
    fullName: any;
    attributes: {
      user: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        profileImage: string;
        dateOfBirth: string | null;
        gender: string;
        callingCode: string;
        phoneNumber: string;
        address: string;
        height: { value: string | null; unit: string };
        weight: { value: string | null; unit: string };
        medicalCondition: string[];
        role: string;
        isProfileCompleted: boolean;
        chartCredits: number;
        appointmentCredits: number;
        createdAt: string;
        subscription: {
          subscriptionExpirationDate: string | null;
          status: string;
          isSubscriptionTaken: boolean;
        };
      };
      securitySettings: {
        recoveryEmail: string | null;
        recoveryPhone: string | null;
        securityQuestion: string | null;
      };
      documents: Array<{
        user: string;
        title: string;
        description: string;
        type: string;
        files: string[];
        createdAt: string;
        id: string;
      }>;
    };
  };
}

interface Doctor {
  isFavorite: boolean;
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  discipline: string;
  clinicName: string;
  officeLocation: string[];
  profilePicture?: string;
  qualifications: string[];
  popularReasonsToVisit: string[];
  googleMapUrl?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface DoctorsResponse {
  doctors: any;
  data: Doctor[];
}

interface ForgotPasswordResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      oneTimeCode: number;
    };
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LogoutResponse {
  code: number;
  message: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface VerifyEmailRequest {
  email: string;
  otp: string;
}

interface VerifyEmailResponse {
  code: number;
  message: string;
}

interface ResetPasswordRequest {
  email: string;
  password: string;
}

interface ResetPasswordResponse {
  code: number;
  message: string;
}

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  designation: string;
  specialties: string;
  about: string;
  callingCode: string;
  phoneNumber: string;
  email: string;
  profileImage: string;
  media: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    X?: string;
  };
  degrees: Array<{
    school: string;
    degree: string;
    subject: string;
    grade?: string;
    startDate?: string;
    endDate?: string;
    skills?: string[];
    status?: string;
    _id?: string;
  }>;
  experience: Array<{
    title: string;
    employmentType: string;
    company: string;
    location: string;
    startDate?: string;
    endDate?: string;
    description: string | null;
    profileHeadline: string | null;
    skills?: string[];
    status?: string;
    _id?: string;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date?: string;
    status?: string;
    _id?: string;
  }>;
  createdAt?: string;
  createdBy?: {
    fullName: string;
    email: string;
    profileImage: string;
    id: string;
  };
}



interface FaqItem {
  id: string;
  question: string;
  answer: string;
  createdAt?: string;
}




interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

interface ChangePasswordResponse {
  code: number;
  message: string;
}

interface UploadDocumentResponse {
  code: number;
  message: string;
  data: {
    attributes: {
      user: string;
      title: string;
      description: string;
      type: string;
      files: string[];
      createdAt: string;
      id: string;
    };
  };
}

// Helper function to get token safely
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const formatFormDataForAPI = (patientData: UpdatePatientProfileRequest) => {
  const formData = new FormData();
  
  // Format fullName as JSON string
  const fullName = {
    first: patientData.firstName,
    middle: patientData.middleName,
    last: patientData.lastName
  };
  formData.append('fullName', JSON.stringify(fullName));
  
  // Format address as JSON string
  const address = {
    line1: patientData.addressLine1,
    line2: patientData.addressLine2 || "",
    city: patientData.city,
    state: patientData.state,
    zip: patientData.zipCode
  };
  formData.append('address', JSON.stringify(address));
  
  // License number
  formData.append('licenseNumber', patientData.driverLicense);
  
  // File fields
  if (patientData.licenseFrontImage) {
    formData.append('frontImage', patientData.licenseFrontImage);
  }
  if (patientData.licenseBackImage) {
    formData.append('backImage', patientData.licenseBackImage);
  }

  // Additional fields that your backend actually supports
  formData.append('dob', patientData.dob);
  
  // Convert sex to title case (Male, Female, Other)
  const formattedSex = patientData.sex.charAt(0).toUpperCase() + patientData.sex.slice(1);
  formData.append('sex', formattedSex);
  
  // Convert maritalStatus to title case
  const formattedMaritalStatus = patientData.maritalStatus.charAt(0).toUpperCase() + patientData.maritalStatus.slice(1);
  formData.append('maritalStatus', formattedMaritalStatus);
  
  // Convert bloodGroup to API format
  const formatBloodGroup = (bloodGroup: string) => {
    const bloodMap: { [key: string]: string } = {
      'o-positive': 'A+',
      'o-negative': 'O-',
      'a-positive': 'A+',
      'a-negative': 'A-',
      'b-positive': 'B+',
      'b-negative': 'B-',
      'ab-positive': 'AB+',
      'ab-negative': 'AB-'
    };
    return bloodMap[bloodGroup] || bloodGroup.toUpperCase();
  };
  formData.append('bloodGroup', formatBloodGroup(patientData.bloodGroup));
  
  // Use correct field name for number of children
  formData.append('numberOfChildren', patientData.numChildren);
  
  formData.append('email', patientData.email);
  formData.append('phone', patientData.phone);
  formData.append('employer', patientData.employer);
  formData.append('last4SSN', patientData.tin);

  return formData;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      // Don't set Content-Type for FormData - let browser set it with boundary
      return headers;
    },
  }),
  tagTypes: ["Profile", "Team", "Documents", "Doctors", "Patient"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    getProfile: builder.query<UserProfileResponse, void>({
      query: () => "/api/user/me",
      providesTags: ["Profile"],
    }),

    // Update patient profile - FIXED VERSION
    updatePatientProfile: builder.mutation<UpdatePatientProfileResponse, UpdatePatientProfileRequest>({
      query: (patientData) => ({
        url: "/api/user/me",
        method: "PUT",
        body: formatFormDataForAPI(patientData),
      }),
      invalidatesTags: ["Profile", "Patient"],
    }),

    uploadDocument: builder.mutation<UploadDocumentResponse, FormData>({
      query: (formData) => ({
        url: "/document",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile", "Documents"],
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (credentials) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (credentials) => ({
        url: "/api/auth/verify-signup-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    getDoctors: builder.query<DoctorsResponse, void>({
      query: () => "/api/user/doctors",
      providesTags: ["Doctors"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetDoctorsQuery,
  useUploadDocumentMutation,
  useGetProfileQuery,
  useUpdatePatientProfileMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = authApi;