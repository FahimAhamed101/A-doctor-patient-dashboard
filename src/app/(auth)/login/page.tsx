"use client";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/assets/logo";
import { Eye, EyeOff } from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import GoogleSignInButton from "@/components/UI/GoogleSignInButton";

// export const metadata: Metadata = {
//   title: "Login | Wellbyn",
//   description: "This is the login page for our application",
//   keywords: ["login", "page", "example"],
// };

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

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input change
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    // Email Validation: check if email is required and has a valid format
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password Validation: check if password is required
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simulate a login request
      setTimeout(() => {
        console.log("Login attempt:", formData);
        setLoading(false);
        //route to home page
        window.location.href = "/home"; // Uncomment this line to redirect after login
      }, 500);
    }
  };

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <Input
            label="Email"
            placeholder="Email address"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            errorMessage={errors.email} // Display email error
          />

          {/* Password Input */}
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
            errorMessage={errors.password} // Display password error
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">{/* Blank div */}</div>
            <Link
              href="/forgot-password"
              className="text-black underline font-medium hover:text-primary-500 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="text-white px-6 py-3 rounded-lg w-full font-medium transition-colors"
            loading={loading}
            disabled={loading || !formData.email || !formData.password}
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

        {/* Divider */}
        <div className="flex justify-center items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="text-gray-500 text-lg font-medium">OR</div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <GoogleSignInButton />
      </Card>
    </div>
  );
};

export default LoginPage;
