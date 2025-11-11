// src/redux/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: null | {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role?: string;
    isVerified?: boolean;
    onboardingStep?: number;
    personalInfo?: any; // Make these optional
    insuranceInfo?: any; // Make these optional
  };
  tokens: null | {
    access: {
      token: string;
      expires: string;
    };
    refresh: {
      token: string;
      expires: string;
    };
  };
  isAuthenticated: boolean;
}

// Helper function to load initial state from localStorage
const loadInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      const userData = localStorage.getItem('user');
      
      if (accessToken && userData) {
        const user = JSON.parse(userData);
        
        // Extract name from user data - check different possible locations
        let firstName = '';
        let lastName = '';
        
        // Check personalInfo first
        if (user.personalInfo?.fullName) {
          firstName = user.personalInfo.fullName.first || '';
          lastName = user.personalInfo.fullName.last || '';
        } 
        // Check insuranceInfo as fallback
        else if (user.insuranceInfo && user.insuranceInfo.length > 0) {
          firstName = user.insuranceInfo[0]?.subscriber?.firstName || '';
          lastName = user.insuranceInfo[0]?.subscriber?.lastName || '';
        }
        
        return {
          user: {
            id: user._id,
            email: user.email,
            firstName: firstName,
            lastName: lastName,
            role: user.role,
            isVerified: user.isVerified,
            onboardingStep: user.onboardingStep,
            personalInfo: user.personalInfo, // Include personalInfo
            insuranceInfo: user.insuranceInfo // Include insuranceInfo
          },
          tokens: {
            access: {
              token: accessToken,
              expires: localStorage.getItem('accessTokenExpires') || ''
            },
            refresh: {
              token: refreshToken || '',
              expires: localStorage.getItem('refreshTokenExpires') || ''
            }
          },
          isAuthenticated: true,
        };
      }
    } catch (e) {
      console.error('Failed to parse stored auth state', e);
    }
  }
  return {
    user: null,
    tokens: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{
      user: any;
      accessToken: string;
      refreshToken: string;
    }>) => {
      const { user, accessToken, refreshToken } = action.payload;
      
      // Extract name from user data
      let firstName = '';
      let lastName = '';
      
      // Check personalInfo first
      if (user.personalInfo?.fullName) {
        firstName = user.personalInfo.fullName.first || '';
        lastName = user.personalInfo.fullName.last || '';
      } 
      // Check insuranceInfo as fallback
      else if (user.insuranceInfo && user.insuranceInfo.length > 0) {
        firstName = user.insuranceInfo[0]?.subscriber?.firstName || '';
        lastName = user.insuranceInfo[0]?.subscriber?.lastName || '';
      }
      
      state.user = {
        id: user._id,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        role: user.role,
        isVerified: user.isVerified,
        onboardingStep: user.onboardingStep,
        personalInfo: user.personalInfo, // Include personalInfo
        insuranceInfo: user.insuranceInfo // Include insuranceInfo
      };
      
      state.tokens = {
        access: {
          token: accessToken,
          expires: ''
        },
        refresh: {
          token: refreshToken,
          expires: ''
        }
      };
      
      state.isAuthenticated = true;
      
      // Update localStorage when credentials are set
      if (typeof window !== 'undefined') {
        const userData = {
          _id: user._id,
          email: user.email,
          personalInfo: user.personalInfo,
          insuranceInfo: user.insuranceInfo,
          role: user.role,
          isVerified: user.isVerified,
          onboardingStep: user.onboardingStep
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      
      // Clear all auth-related items from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessTokenExpires');
        localStorage.removeItem('refreshTokenExpires');
        localStorage.removeItem('user');
        localStorage.removeItem('auth');
      }
    },
    updateUser: (state, action: PayloadAction<Partial<AuthState['user']>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        // Update localStorage as well
        if (typeof window !== 'undefined') {
          const updatedUser = {
            _id: state.user.id,
            email: state.user.email,
            personalInfo: state.user.personalInfo,
            insuranceInfo: state.user.insuranceInfo,
            role: state.user.role,
            isVerified: state.user.isVerified,
            onboardingStep: state.user.onboardingStep
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
    },
    // Action to update tokens (useful for token refresh)
    updateTokens: (state, action: PayloadAction<{
      accessToken: string;
      refreshToken?: string;
    }>) => {
      if (state.tokens) {
        state.tokens.access.token = action.payload.accessToken;
        if (action.payload.refreshToken) {
          state.tokens.refresh.token = action.payload.refreshToken;
        }
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', action.payload.accessToken);
          if (action.payload.refreshToken) {
            localStorage.setItem('refreshToken', action.payload.refreshToken);
          }
        }
      }
    },
  },
});

export const { setCredentials, logout, updateUser, updateTokens } = authSlice.actions;
export default authSlice.reducer;