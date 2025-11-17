"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/assets/logo";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApi";

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Separate component that uses useSearchParams
const VerifyCodeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [flow, setFlow] = useState("forgot-password"); // 'forgot-password' or 'create-account'

  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation();

  useEffect(() => {
    if (searchParams) {
      const emailParam = searchParams.get("email") || "";
      const flowParam = searchParams.get("flow") || "forgot-password";
      setEmail(emailParam);
      setFlow(flowParam);
    }
  }, [searchParams]);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [localError, setLocalError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setLocalError(""); // Clear error when user starts typing

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtp = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
    setOtp(newOtp);

    // Focus the last filled input or the first empty one
    const lastFilledIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex =
      lastFilledIndex === -1 ? 3 : Math.max(0, lastFilledIndex - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setLocalError("Please enter the complete 4-digit code");
      return;
    }

    if (!email) {
      setLocalError("Email is required");
      return;
    }

    try {
      const result = await verifyEmail({
        email: email,
        otp: otpCode,
      }).unwrap();

      console.log("Email verification successful:", result);

      // Redirect based on flow
      if (flow === "create-account") {
        // Redirect to HIPAA consent page after successful verification
        router.push("/hipaa-consent");
      } else {
        // Redirect to reset password page (forgot password flow)
        router.push(
          `/reset-password?email=${encodeURIComponent(email)}`
        );
      }
    } catch (err: any) {
      console.error("Email verification failed:", err);
      
      // Handle specific error messages from API
      if (err?.data?.message) {
        setLocalError(err.data.message);
      } else {
        setLocalError("Invalid verification code. Please try again.");
      }
      
      // Clear OTP and focus first input
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setResendCooldown(60); // 60 seconds cooldown

    try {
      // Here you would call your resend OTP API
      // For now, we'll just simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // If you have a resend OTP endpoint, you would call it here:
      // await resendOtp({ email }).unwrap();
      
      console.log("Verification code resent to:", email);
    } catch (error) {
      console.error("Failed to resend code:", error);
      setLocalError("Failed to resend code. Please try again.");
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const isFormValid = isOtpComplete && !isLoading;

  // Determine back link based on flow
  const getBackLink = () => {
    if (flow === "create-account") {
      return "/create-account";
    }
    return "/login";
  };

  const getBackLinkText = () => {
    if (flow === "create-account") {
      return "Back to create account";
    }
    return "Back to login";
  };

  // Extract error message from RTK Query error
  const getApiErrorMessage = () => {
    if (error) {
      if ('data' in error) {
        return (error as any).data?.message || "Verification failed. Please try again.";
      }
      return "Verification failed. Please try again.";
    }
    return null;
  };

  const apiErrorMessage = getApiErrorMessage();
  const displayError = localError || apiErrorMessage;

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <Card>
        <Logo />

        <h1 className="font-medium text-center text-[32px] text-gray-900">
          Verify code
        </h1>

        <div className="w-full flex flex-col items-center">
          <p className="font-normal text-center text-[18px] text-brand-500 leading-relaxed w-[540px] object-center tracking-wide">
            We sent OTP code to your email{" "}
            <span className="font-bold text-brand-500">{email}</span>. Enter the
            code below to verify.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(index, e.target.value.replace(/\D/g, ""))
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`
                  w-16 h-16 text-center text-[16px] text-primary-500 font-medium bg-white border rounded-lg
                  focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all
                  ${displayError ? "border-[#B42121]" : "border-tertiary"}
                  ${digit ? "border-primary-500" : ""}
                `}
                placeholder=""
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Error Message */}
          {displayError && (
            <div className="text-[#B42121] text-sm text-center font-medium">
              {displayError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              "Next"
            )}
          </Button>
        </form>

        {/* Resend Code */}
        <div className="text-center">
          <span className="text-gray-600">Don't receive OTP? </span>
          <button
            onClick={handleResendCode}
            disabled={resendCooldown > 0 || isLoading}
            className="text-primary-500 font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend again"}
          </button>
        </div>

        {/* Back Link */}
        <Link
          href={getBackLink()}
          className="flex items-center font-medium justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          {getBackLinkText()}
        </Link>
      </Card>
    </div>
  );
};

// Main component with Suspense wrapper
const VerifyCodePage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyCodeContent />
    </Suspense>
  );
};

export default VerifyCodePage;