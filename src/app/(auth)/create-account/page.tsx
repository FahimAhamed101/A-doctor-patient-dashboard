"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Check, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/UI/Card";
import Logo from "@/assets/logo";
import Input from "@/components/UI/Input";
import GoogleSignInButton from "@/components/UI/GoogleSignInButton";
import Button from "@/components/UI/Button";
import { useRegisterMutation } from "@/redux/features/auth/authApi";

interface RegisterRequest {
  email: string;
  password: string;
  authProvider: string;
}

const CreateAccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const passwordRules = [
    { rule: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { rule: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { rule: "One number", test: (pwd: string) => /\d/.test(pwd) },
  ];

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
    let newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!isPasswordValid) {
      newErrors.password = "Password does not meet requirements";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    if (!doPasswordsMatch) {
      setErrors(prev => ({ ...prev, password: "Passwords do not match" }));
      setIsLoading(false);
      return;
    }

    try {
      const registerData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        authProvider: "email", // Always set to "email" for email registration
      };

      const result = await register(registerData).unwrap();
      
      console.log("Registration successful:", result);
      
      // Navigate to verify-code page
     router.push(
      `/verify-code?flow=create-account&email=${encodeURIComponent(
        formData.email
      )}`
   );
    
    } catch (error: any) {
      console.error("Registration failed:", error);
      // Handle registration error (show toast, set error message, etc.)
      let errorMessage = "Registration failed. Please try again.";
      
      // You can add more specific error handling based on your API response
      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.status === 409) {
        errorMessage = "Email already exists. Please use a different email.";
      }
      
      setErrors(prev => ({ 
        ...prev, 
        email: errorMessage 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const isPasswordValid = passwordRules.every((rule) =>
    rule.test(formData.password)
  );
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword.length > 0;
  
  const isFormValid = 
    formData.email && 
    isPasswordValid && 
    doPasswordsMatch && 
    !isLoading;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="pb-10 md:pb-0">
          {/* Logo */}
          <Logo />

          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 mb-4 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <h1 className="font-medium text-center text-[32px] text-gray-900 mb-2">
            Create an account
          </h1>

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <Input
                label="Email *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email address"
                required
                errorMessage={errors.email}
              />
            </div>

            {/* New Password Input */}
            <div className="relative">
              <Input
                label="New Password *"
                placeholder="Type a strong password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                onclick={() => setShowPassword((prev) => !prev)}
                required
                errorMessage={errors.password}
              />
            </div>

            {formData.password && (
              <div className="bg-gray-50 rounded-lg space-y-2 p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password must contain:
                </p>
                {passwordRules.map((rule, index) => {
                  const isValid = rule.test(formData.password);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isValid ? " bg-primary-500" : "bg-gray-300"
                        }`}
                      >
                        {isValid && <Check size={12} className="text-white" />}
                      </div>
                      <span
                        className={
                          isValid ? "text-primary-500" : "text-gray-600"
                        }
                      >
                        {rule.rule}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Confirm Password Input */}
            <div className="relative">
              <Input
                label="Confirm Password *"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-type password"
                onclick={() => setShowConfirmPassword((prev) => !prev)}
                icon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                required
              />
            </div>

            {/* Password Match Validation */}
            {formData.confirmPassword && (
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    doPasswordsMatch ? "bg-primary-500" : "bg-red-500"
                  }`}
                >
                  {doPasswordsMatch && (
                    <Check size={12} className="text-white" />
                  )}
                  {!doPasswordsMatch && (
                    <span className="text-white text-xs">×</span>
                  )}
                </div>
                <span
                  className={
                    doPasswordsMatch ? "text-primary-500" : "text-red-600"
                  }
                >
                  {doPasswordsMatch
                    ? "Passwords match"
                    : "Passwords do not match"}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isRegistering}
              className={`px-6 py-3 rounded-lg w-full font-medium transition-colors mt-6 ${
                isFormValid && !isRegistering
                  ? "bg-primary-500 text-white hover:bg-primary-600 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isRegistering ? "Creating Account..." : "Create Account"}
            </Button>
          </div>

          <div className="text-center mt-6">
            <span className="text-Text-secondary text-[18px] font-medium">
              Already have an account?
            </span>{" "}
            <a
              className="text-[18px] text-primary-500 font-medium hover:underline transition-colors"
              href="/login"
              style={{ color: "#4A90E2" }}
            >
              Sign In
            </a>
          </div>

          {/* Divider */}
          <div className="flex justify-center items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <div className="text-gray-500 text-lg font-medium">OR</div>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Sign-In Button */}
          <GoogleSignInButton />
        </div>
      </Card>
    </div>
  );
};

export default CreateAccountPage;