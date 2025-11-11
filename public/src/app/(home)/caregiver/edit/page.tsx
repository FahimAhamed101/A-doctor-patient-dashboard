"use client"
import { useState, ChangeEvent } from 'react';

interface FormData {
  name: string;
  relation: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  permission: string;
}

export default function UserDetailsForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    relation: 'Father',
    dateOfBirth: '',
    email: '',
    phone: '',
    permission: 'Partial control'
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2/4 mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-3 shadow-md rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Relation Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relation
            </label>
            <div className="relative">
              <select
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                className="w-full px-3 py-3 shadow-md rounded-md text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date of Birth Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Of Birth
            </label>
            <div className="relative">
              <input
                type="text"
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-3 shadow-md rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.7598 3.56063C16.2904 3.54085 15.791 3.52752 15.2598 3.51854V2C15.2598 1.72386 15.5956 1.5 16.0098 1.5C16.424 1.5 16.7598 1.72386 16.7598 2V3.56063Z" fill="#2E8BC9"/>
                  <path d="M20.5 12V14C20.5 15.8996 20.4993 17.2741 20.3584 18.3223C20.2368 19.2269 20.0174 19.8314 19.6445 20.2881L19.4746 20.4746C18.9973 20.952 18.3561 21.2194 17.3223 21.3584C16.2741 21.4993 14.8996 21.5 13 21.5H11C9.10042 21.5 7.72591 21.4993 6.67775 21.3584C5.77315 21.2368 5.16862 21.0173 4.71193 20.6445L4.52541 20.4746C4.04802 19.9973 3.78061 19.3561 3.64162 18.3223C3.50072 17.2741 3.50002 15.8996 3.50002 14V12C3.50002 11.4589 3.49961 10.9605 3.50295 10.5H20.4971C20.5004 10.9605 20.5 11.4589 20.5 12ZM8.0088 17.333C7.64062 17.333 7.33302 17.6318 7.33302 18C7.33302 18.3682 7.64062 18.667 8.0088 18.667L8.14357 18.6533C8.44727 18.5911 8.6758 18.3221 8.6758 18C8.6758 17.6779 8.44727 17.4089 8.14357 17.3467L8.0088 17.333ZM12.0049 17.333C11.6369 17.3332 11.3291 17.6319 11.3291 18C11.3291 18.3681 11.6369 18.6668 12.0049 18.667L12.1387 18.6533C12.4426 18.5912 12.6709 18.3222 12.6709 18C12.6709 17.6778 12.4426 17.4088 12.1387 17.3467L12.0049 17.333ZM8.0088 13.333C7.64062 13.333 7.33302 13.6318 7.33302 14C7.33302 14.3682 7.64062 14.667 8.0088 14.667L8.14357 14.6533C8.44727 14.5911 8.6758 14.3221 8.6758 14C8.6758 13.6779 8.44727 13.4089 8.14357 13.3467L8.0088 13.333ZM12.0049 13.333C11.6369 13.3332 11.3291 13.6319 11.3291 14C11.3291 14.3681 11.6369 14.6668 12.0049 14.667L12.1387 14.6533C12.4426 14.5912 12.6709 14.3222 12.6709 14C12.6709 13.6778 12.4426 13.4088 12.1387 13.3467L12.0049 13.333ZM16 13.333C15.6318 13.333 15.3242 13.6318 15.3242 14C15.3242 14.3682 15.6318 14.667 16 14.667L16.1348 14.6533C16.4384 14.591 16.667 14.322 16.667 14C16.667 13.678 16.4384 13.409 16.1348 13.3467L16 13.333ZM13 4.5C13.9585 4.5 14.7834 4.50027 15.5 4.51855C15.8595 4.52772 16.1918 4.54099 16.5 4.56152C16.7951 4.58119 17.0683 4.60746 17.3223 4.6416C18.3561 4.78059 18.9973 5.04801 19.4746 5.52539L19.6445 5.71191C20.0174 6.16861 20.2368 6.77313 20.3584 7.67773C20.4282 8.19701 20.4635 8.79637 20.4815 9.5H3.51857C3.53652 8.79637 3.57182 8.19701 3.64162 7.67773C3.78061 6.64393 4.04801 6.0028 4.52541 5.52539L4.71193 5.35547C5.16862 4.98267 5.77314 4.76322 6.67775 4.6416C6.93174 4.60746 7.20488 4.58119 7.50002 4.56152C7.80828 4.54099 8.14055 4.52772 8.50002 4.51855C9.21667 4.50027 10.0415 4.5 11 4.5H13Z" fill="#2E8BC9"/>
                  <path d="M7.30078 3.56063V2C7.30078 1.72386 7.63657 1.5 8.05078 1.5C8.465 1.5 8.80078 1.72386 8.80078 2V3.51854C8.26952 3.52752 7.77016 3.54085 7.30078 3.56063Z" fill="#2E8BC9"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-3 shadow-md rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 9999999999"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-3 shadow-md rounded-md text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Permission Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permission
            </label>
            <div className="relative">
              <select
                name="permission"
                value={formData.permission}
                onChange={handleInputChange}
                className="w-full px-3 py-3 shadow-md rounded-md text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="Partial control">Partial control</option>
                <option value="Full control">Full control</option>
                <option value="View only">View only</option>
                <option value="No access">No access</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Information Text */}
          <div className="text-sm text-gray-500 leading-relaxed">
            Sensitive information such as patient names, email addresses, passwords, and similar data cannot be changed.
          </div>

          {/* Edit Details Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}