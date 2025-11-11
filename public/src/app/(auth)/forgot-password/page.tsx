"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [forgotPassword, { isLoading: isApiLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic email validation
    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const result = await forgotPassword({
        email: email,
      }).unwrap();

      console.log("Forgot password request successful:", result);

      // Redirect to verify code page with email parameter and flow type
      router.push(`/verify-code?email=${encodeURIComponent(email)}&flow=forgot-password`);
      
    } catch (err: any) {
      console.error("Forgot password request failed:", err);
      
      // Handle specific error messages from API
      if (err?.data?.message) {
        setError(err.data.message);
      } else if (err?.status === 404) {
        setError("No account found with this email address");
      } else {
        setError("Failed to send reset code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isLoadingState = isLoading || isApiLoading;

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <Card>
        <Logo />

        <h1 className="font-medium text-center text-[32px] text-gray-900">
          Forgot password?
        </h1>

        <p className="font-normal text-center text-[18px] text-brand-500">
          Enter your email to reset your password.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error when user starts typing
              }}
              placeholder="Example@gmail.com"
              required
              errorMessage={error.includes("email") ? error : ""}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoadingState || !email}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoadingState ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              "Next"
            )}
          </Button>
        </form>

        <Link
          href="/login"
          className="flex items-center font-medium justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Sign in
        </Link>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;