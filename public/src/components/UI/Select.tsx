import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  className = "",
  labelClassName = "",
  selectClassName = "",
  icon,
  disabled = false,
}) => {
  const defaultSelectClasses =
    "w-full text-Text-secondary rounded-lg py-[14px] px-3 font-medium focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-white shadow-[0px_3px_4px_0px_rgba(26,64,96,0.10)] appearance-none pr-10";

  const defaultLabelClasses =
    "block mb-2 text-[18px] text-text-primary font-medium";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className={labelClassName || defaultLabelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={selectClassName || defaultSelectClasses}
          required={required}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom dropdown icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          {icon || (
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1.00005C13 1.00005 8.5811 7 7 7C5.4188 7 1 1 1 1"
                stroke="#3D3D3D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Select;
