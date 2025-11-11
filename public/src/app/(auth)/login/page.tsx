"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/assets/logo";
import { Eye, EyeOff } from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import GoogleSignInButton from "@/components/UI/GoogleSignInButton";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface LoginApiResponse {
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

interface LoginApiError {
  data?: {
    message: string;
  };
  status: number;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "fahimahamed@gmail.com",
    password: "132456",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const extractUserName = (userData: any) => {
    let firstName = '';
    let lastName = '';

    // Extract name from personalInfo if available
    if (userData.personalInfo?.fullName) {
      firstName = userData.personalInfo.fullName.first || '';
      lastName = userData.personalInfo.fullName.last || '';
      console.log('Extracted name from personalInfo:', firstName, lastName);
    } 
    // Fallback to insuranceInfo if personalInfo not available
    else if (userData.insuranceInfo && userData.insuranceInfo.length > 0) {
      firstName = userData.insuranceInfo[0]?.subscriber?.firstName || '';
      lastName = userData.insuranceInfo[0]?.subscriber?.lastName || '';
      console.log('Extracted name from insuranceInfo:', firstName, lastName);
    } else {
      console.log('No name data found in user object');
    }

    return { firstName, lastName };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("Login successful:", result);

      // Check if it's an email verification error
      if (result.message === "Your email is not verified. A new verification OTP has been sent to your email.") {
        const encodedEmail = encodeURIComponent(formData.email);
        router.push(`/verify-code?email=${encodedEmail}&flow=forgot-password`);
        return;
      }

      // Extract user name from the response
      const { firstName, lastName } = extractUserName(result.user);

      // Store tokens in localStorage
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);

      // Store complete user data for proper name extraction on reload
      localStorage.setItem("user", JSON.stringify(result.user));

      // Dispatch to Redux store with proper structure
      dispatch(setCredentials({
        user: result.user, // Pass the full user object
        accessToken: result.accessToken,
        refreshToken: result.refreshToken
      }));

      console.log('Dispatched credentials with user:', {
        id: result.user._id,
        email: result.user.email,
        firstName,
        lastName,
        personalInfo: result.user.personalInfo
      });

      // Handle routing based on onboardingStep
      if (result.user.onboardingStep === 1) {
        // Redirect to patient information page
        router.push("/patient-information");
      } else if (result.user.onboardingStep === 4) {
        // Redirect to home page
        router.push("/home");
      } else {
        // Handle other onboarding steps or default case
        console.log(`User onboarding step: ${result.user.onboardingStep}`);
        router.push("/home");
      }

    } catch (err: any) {
      console.error("Login failed:", err);
      
      // Check if it's an email verification error
      if (err?.data?.message === "Your email is not verified. A new verification OTP has been sent to your email.") {
        const encodedEmail = encodeURIComponent(formData.email);
        router.push(`/verify-code?email=${encodedEmail}&flow=forgot-password`);
        return;
      }
      
      if (err?.data?.message) {
        setErrors(prev => ({ 
          ...prev, 
          email: err.data.message,
          password: err.data.message 
        }));
      } else {
        setErrors(prev => ({ 
          ...prev, 
          email: "Login failed. Please check your credentials.",
          password: "Login failed. Please check your credentials." 
        }));
      }
    }
  };

  const getErrorMessage = () => {
    if (error) {
      if ('data' in error) {
        const apiError = error as LoginApiError;
        // Don't show the verification message as an error since we're redirecting
        if (apiError.data?.message === "Your email is not verified. A new verification OTP has been sent to your email.") {
          return null;
        }
        return apiError.data?.message || "Login failed. Please try again.";
      }
      return "Login failed. Please try again.";
    }
    return null;
  };

  const errorMessage = getErrorMessage();

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <Card>
        <Logo />

        <h1 className="font-medium text-center text-[32px] text-black">
          Welcome back!
        </h1>

        <p className="font-normal text-center text-[18px] text-brand-500">
          To sign in, enter your email address.
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            placeholder="Email address"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            errorMessage={errors.email}
          />

          <Input
            label="Password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onclick={() => setShowPassword((prev) => !prev)}
            required
            errorMessage={errors.password}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-black underline font-medium hover:text-primary-500 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="text-white px-6 py-3 rounded-lg w-full font-medium transition-colors"
            loading={isLoading}
            disabled={isLoading || !formData.email || !formData.password}
          >
            Sign In
          </Button>
        </form>

        <div className="text-center">
          <span className="text-brand-600 text-[18px] font-medium">
            Don't have an account?
          </span>{" "}
          <Link
            className="text-[18px] text-primary-500 font-medium hover:underline transition-colors"
            href="/create-account"
          >
            Create an account
          </Link>
        </div>

        <div className="flex justify-center items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="text-gray-500 text-lg font-medium">OR</div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <GoogleSignInButton />
      </Card>
    </div>
  );
};

export default LoginPage;