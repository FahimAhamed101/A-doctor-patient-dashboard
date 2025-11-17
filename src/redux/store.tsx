// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authApi';
import authReducer from "./features/auth/authSlice";
import { onboardingApi } from './features/onboarding/onboardingApi';
import { appointmentsApi } from './features/appointments/appointmentsApi';
import { medicalApi } from './features/medical/medicalApi';
import { insuranceApi } from './features/insurance/insuranceApi';
import { waitlistApi } from './features/waitlist/waitlistApi';
import { medicationsApi } from './features/medications/medicationsApi';
import { doctorApi } from './features/doctor/doctorApi';
import { documentApi } from './features/document/documentApi';
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,[onboardingApi.reducerPath]: onboardingApi.reducer, [documentApi.reducerPath]: documentApi.reducer,
    [appointmentsApi.reducerPath]: appointmentsApi.reducer,[medicationsApi.reducerPath]: medicationsApi.reducer, [doctorApi.reducerPath]: doctorApi.reducer,
    [medicalApi.reducerPath]: medicalApi.reducer,[insuranceApi.reducerPath]: insuranceApi.reducer, [waitlistApi.reducerPath]: waitlistApi.reducer,
    auth: authReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,onboardingApi.middleware,documentApi.middleware,appointmentsApi.middleware,medicalApi.middleware,insuranceApi.middleware,waitlistApi.middleware,medicationsApi.middleware,doctorApi.middleware
    
      
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;