/* eslint-disable react/prop-types */
"use client";
import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  border?: boolean;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"; // Added type prop
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  border = false,
  loading = false,
  children,
  className = "",
  onClick,
  type = "button", // Default type is "button"
  disabled = false,
}) => {
  return (
    <div
      className={`w-full ${
        border ? "border-2" : "border-none"
      } p-0.5 border-2 border-primary rounded-lg`}
    >
      <button
        type={type}
        className={`${className} w-full cursor-pointer bg-primary-500 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-medium ${
          loading ? "opacity-75" : "opacity-100"
        } flex px-8 py-3 rounded-lg hover:bg-[#1a588a] justify-center items-center gap-5 transition-all duration-500`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {loading ? (
          // Custom loading spinner design
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-dashed border-t-transparent border-white rounded-full animate-spin"></div>
            {children}
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
};

export default Button;
