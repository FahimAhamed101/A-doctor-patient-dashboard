// In your Input component file (components/UI/Input.tsx)
import React from 'react';

export interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  icon?: React.ReactNode;
  onclick?: () => void;
  maxLength?: number; // Add this line
  pattern?: string; // You might also want to add pattern
  min?: number; // And min for number inputs
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  errorMessage,
  icon,
  onclick,
  maxLength, // Add this line
  pattern, // Add this line
  min, // Add this line
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-text-primary font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength} // Add this line
          pattern={pattern} // Add this line
          min={min} // Add this line
          className={`w-full bg-white border ${
            errorMessage ? 'border-red-500' : 'border-tertiary'
          } text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all ${
            icon ? 'pr-10' : ''
          }`}
        />
        {icon && (
          <button
            type="button"
            onClick={onclick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {icon}
          </button>
        )}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;