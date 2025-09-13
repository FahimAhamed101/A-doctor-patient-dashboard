"use client";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo";
import { ArrowLeft } from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

// export const metadata: Metadata = {
//   title: "Forgot Password | Wellbyn",
//   description: "Reset your password for Wellbyn account",
//   keywords: ["forgot password", "reset", "wellbyn"],
// };

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to verify code page with email parameter
      router.push(`/verify-code?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setIsLoading(false);
      // Handle error
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Example@gmail.com"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
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
