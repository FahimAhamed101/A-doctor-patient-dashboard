"use client";
import React from "react";
import { SVGProps } from "react"; // For icons, to support SVG type for better flexibility

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onclick?: React.MouseEventHandler<HTMLDivElement>;
  required?: boolean;
  min?: number;
  errorMessage?: string;
  icon?: React.ReactNode;
  variant?: "default" | "outlined" | "filled"; // Variants for different styles
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  onclick,
  required = false,
  min,
  errorMessage,
  icon,
  variant = "default", // Default variant
}) => {
  // Define the base classes
  const baseClasses =
    "w-full py-[14px] px-3 font-medium text-base focus:ring-2 focus:ring-primary outline-none transition-all bg-white rounded-lg focus:border-[#292929] placeholder:text-[#7C7C7C] placeholder:capitalize placeholder:text-[16px] tracking-wide";

  // Define styles for when there is an error
  const errorClasses = "border-[#B42121] text-[#3D3D3D] placeholder-[#7C7C7C] outline-none focus:ring-2 focus:ring-[#B42121]";

  // Define styles for the variant types
  const variantClasses = {
    default: "bg-white shadow-[0px_3px_4px_0px_rgba(26,64,96,0.10)]",
    outlined: "bg-white border border-primary rounded-lg",
    filled: "bg-primary-100 text-black", // You can customize this to your preference
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="self-stretch justify-center text-[#3d3d3d] text-lg font-medium capitalize leading-normal tracking-tight">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} ${
            errorMessage ? errorClasses : variantClasses[variant]
          }`}
          min={min}
        />
        {icon && (
          <div className="absolute right-3 top-[16px]" onClick={onclick}>
            {icon}
          </div>
        )}
        {/* Icon Position */}
      </div>
      {errorMessage && (
        <span className="text-[#B42121] text-sm mt-1 font-medium">{errorMessage}</span>
      )}
      {/* Error Message */}
    </div>
  );
};

export default Input;
