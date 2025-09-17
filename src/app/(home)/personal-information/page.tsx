"use client"
import { useState } from 'react';

export default function PatientInformationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    sex: 'male',
    maritalStatus: 'single',
    bloodGroup: 'o-positive',
    numChildren: '0',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'ca',
    zipCode: '',
    employer: '',
    driverLicense: '',
    tin:''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2/4 mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-gray-600"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        Patient Information
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Hi! Please share your personal info to verify your identity and stay connected with your healthcare providers.
      </p>

      <form className="grid gap-6">
        {/* Full Name */}
        <div className="grid gap-2">
          <label htmlFor="full-name" className="text-sm font-medium text-gray-700">Full Name</label>
          <input
              id="first-name"
              name="firstName"
              placeholder="First Name"
              className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.firstName}
              onChange={handleChange}
            /><div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            
            <input
              id="middle-name"
              name="middleName"
              placeholder="Middle"
              className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.middleName}
              onChange={handleChange}
            />
            <input
              id="last-name"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Date Of Birth */}
        <div className="grid gap-2">
          <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date Of Birth</label>
          <div className="relative">
            <input
              id="dob"
              name="dob"
              placeholder="mm/dd/yyyy"
              className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
              value={formData.dob}
              onChange={handleChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>

        {/* Sex */}
        <div className="grid gap-2">
          <label htmlFor="sex" className="text-sm font-medium text-gray-700">Sex</label>
          <select
            id="sex"
            name="sex"
            className="w-full px-3 py-2 shadow-md rounded-md -webkit-appearance-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.sex}
             style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            onChange={handleChange}
            
          >
            
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="grid gap-2">
          <label htmlFor="marital-status" className="text-sm font-medium text-gray-700">Marital Status</label>
          <select
            id="marital-status"
            name="maritalStatus"
             style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            className="w-full px-3 py-2 shadow-md rounded-md -webkit-appearance-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="grid gap-2">
          <label htmlFor="blood-group" className="text-sm font-medium text-gray-700">Blood Group</label>
          <select
            id="blood-group"
            name="bloodGroup"
            className="w-full px-3 py-2 shadow-md rounded-md  -webkit-appearance-none appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.bloodGroup}
              style={{ WebkitAppearance: "none", MozAppearance: "none" }}
            onChange={handleChange}
          >
            <option value="o-positive">O+</option>
            <option value="o-negative">O-</option>
            <option value="a-positive">A+</option>
            <option value="a-negative">A-</option>
            <option value="b-positive">B+</option>
            <option value="b-negative">B-</option>
            <option value="ab-positive">AB+</option>
            <option value="ab-negative">AB-</option>
          </select>
        </div>

        {/* Number Of Children */}
        <div className="grid gap-2">
          <label htmlFor="num-children" className="text-sm font-medium text-gray-700">
            Number Of Children <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="num-children"
            name="numChildren"
            type="number"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.numChildren}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="sakib@email.com"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="grid gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 9999999999"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Address Line 1 */}
        <div className="grid gap-2">
          <label htmlFor="address-line1" className="text-sm font-medium text-gray-700">Address Line 1</label>
          <input
            id="address-line1"
            name="addressLine1"
            placeholder="Street address"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>

        {/* Address Line 2 */}
        <div className="grid gap-2">
          <label htmlFor="address-line2" className="text-sm font-medium text-gray-700">
            Address Line 2 <span className="text-gray-500">(optional)</span>
          </label>
          <input
            id="address-line2"
            name="addressLine2"
            placeholder="Apartment, suite, unit, etc."
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>

        {/* City, State, Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
            <input
              id="city"
              name="city"
              placeholder="City"
              className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
            <select
              id="state"
              name="state"
              
               style={{ WebkitAppearance: "none", MozAppearance: "none" }}
              className="w-full px-3 py-2 shadow-md rounded-md -webkit-appearance-none appearance-none  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="ca">California</option>
              <option value="ny">New York</option>
              <option value="tx">Texas</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="zip-code" className="text-sm font-medium text-gray-700">Zip Code</label>
            <input
              id="zip-code"
              name="zipCode"
              placeholder="Zip Code"
              className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Employer */}
        <div className="grid gap-2">
          <label htmlFor="employer" className="text-sm font-medium text-gray-700">Employer</label>
          <input
            id="employer"
            name="employer"
            placeholder="Company name"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.employer}
            onChange={handleChange}
          />
        </div>

        {/* Driver's License */}
        <div className="grid gap-2">
          <label htmlFor="driver-license" className="text-sm font-medium text-gray-700">Driver's License</label>
          <input
            id="driver-license"
            name="driverLicense"
            placeholder="License number"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.driverLicense}
            onChange={handleChange}
          />
        </div>

        {/* Upload Driver's License Images */}
        <div className="grid gap-4">
          <label className="text-sm font-medium text-gray-700">Upload Driver's License Images</label>
          <div className="grid gap-4">
            <div className="flex flex-col items-center justify-center p-6 border-1 border-dashed border-[#2E8BC9] rounded-lg bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.833 20.917V21.083H10.167V20.917H13.833ZM4.08203 20.3867C4.51386 20.5975 5.02783 20.7275 5.67285 20.8037C6.49344 20.9007 7.51619 20.9131 8.83301 20.915V21.082C7.51657 21.0801 6.48409 21.0679 5.65332 20.9697C4.98025 20.8902 4.4357 20.7512 3.97363 20.5186L4.08203 20.3867ZM20.0254 20.5186C19.5635 20.7509 19.0193 20.8903 18.3467 20.9697C17.5158 21.0679 16.4835 21.0801 15.167 21.082V20.915C16.4838 20.9131 17.5066 20.9007 18.3271 20.8037C18.9717 20.7275 19.4853 20.5973 19.917 20.3867L20.0254 20.5186ZM2.08398 14.167C2.08591 15.4838 2.09929 16.5066 2.19629 17.3271C2.27247 17.9715 2.40182 18.4854 2.6123 18.917L2.48047 19.0254C2.24825 18.5636 2.11075 18.0191 2.03125 17.3467C1.93305 16.5158 1.91987 15.4835 1.91797 14.167H2.08398ZM22.082 14.167C22.0801 15.4835 22.0679 16.5158 21.9697 17.3467C21.8902 18.0193 21.7509 18.5635 21.5186 19.0254L21.3867 18.917C21.5973 18.4853 21.7275 17.9717 21.8037 17.3271C21.9007 16.5066 21.9141 15.4838 21.916 14.167H22.082ZM22.083 12.167V12.833H21.917V12.167H22.083ZM2.08301 12.167V12.833H1.91699V12.167H2.08301ZM22.0312 9.47266C22.0688 9.83055 22.0796 10.263 22.082 10.833H21.915C21.9125 10.2791 21.9027 9.86302 21.8691 9.52246L22.0312 9.47266ZM2.12988 9.52246C2.09633 9.86299 2.08746 10.2791 2.08496 10.833H1.91797C1.92044 10.2631 1.93025 9.83051 1.96777 9.47266L2.12988 9.52246ZM4.24219 6.50098C3.49004 6.8788 2.87895 7.48916 2.50098 8.24121L2.33984 8.19238C2.73707 7.38795 3.38883 6.73691 4.19336 6.33984L4.24219 6.50098ZM6.43164 6.08887C6.0699 6.09414 5.77534 6.10496 5.52246 6.12988L5.47266 5.96777C5.68236 5.94578 5.91776 5.93572 6.19141 5.92871L6.43164 6.08887ZM9.14648 3.75293C9.12704 3.77574 9.10674 3.79877 9.08691 3.82324C8.9838 3.9505 8.87502 4.09906 8.75391 4.27441L8.61621 4.18164C8.73948 4.00314 8.85048 3.84927 8.95703 3.71777C8.99206 3.67455 9.02796 3.63463 9.0625 3.5957L9.14648 3.75293ZM13.0264 2.91895C13.2434 2.92249 13.433 2.93057 13.6016 2.94629C13.6566 2.95143 13.7095 2.95873 13.7607 2.96582L13.6768 3.12305C13.6472 3.11955 13.617 3.11521 13.5859 3.1123C13.423 3.09711 13.2392 3.08944 13.0264 3.08594V2.91895ZM10.9736 3.08594C10.7608 3.08944 10.5769 3.09712 10.4141 3.1123C10.3826 3.11524 10.3521 3.11951 10.3223 3.12305L10.2383 2.96582C10.2898 2.95867 10.343 2.95146 10.3984 2.94629C10.567 2.93057 10.7567 2.92249 10.9736 2.91895V3.08594Z" fill="#7C7C7C" stroke="#7C7C7C" stroke-width="1.33333"/>
<path d="M16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13Z" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.9737 3.02148C17.9795 2.99284 18.0205 2.99284 18.0263 3.02148C18.3302 4.50808 19.4919 5.66984 20.9785 5.97368C21.0072 5.97954 21.0072 6.02046 20.9785 6.02632C19.4919 6.33016 18.3302 7.49192 18.0263 8.97852C18.0205 9.00716 17.9795 9.00716 17.9737 8.97852C17.6698 7.49192 16.5081 6.33016 15.0215 6.02632C14.9928 6.02046 14.9928 5.97954 15.0215 5.97368C16.5081 5.66984 17.6698 4.50808 17.9737 3.02148Z" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              <span className="text-sm text-[#7C7C7C]">
                Upload/capture License <span className="font-medium text-[#2E8BC9]">Front</span>
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-6 border-1 border-dashed border-[#2E8BC9] rounded-lg bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100 transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.833 20.917V21.083H10.167V20.917H13.833ZM4.08203 20.3867C4.51386 20.5975 5.02783 20.7275 5.67285 20.8037C6.49344 20.9007 7.51619 20.9131 8.83301 20.915V21.082C7.51657 21.0801 6.48409 21.0679 5.65332 20.9697C4.98025 20.8902 4.4357 20.7512 3.97363 20.5186L4.08203 20.3867ZM20.0254 20.5186C19.5635 20.7509 19.0193 20.8903 18.3467 20.9697C17.5158 21.0679 16.4835 21.0801 15.167 21.082V20.915C16.4838 20.9131 17.5066 20.9007 18.3271 20.8037C18.9717 20.7275 19.4853 20.5973 19.917 20.3867L20.0254 20.5186ZM2.08398 14.167C2.08591 15.4838 2.09929 16.5066 2.19629 17.3271C2.27247 17.9715 2.40182 18.4854 2.6123 18.917L2.48047 19.0254C2.24825 18.5636 2.11075 18.0191 2.03125 17.3467C1.93305 16.5158 1.91987 15.4835 1.91797 14.167H2.08398ZM22.082 14.167C22.0801 15.4835 22.0679 16.5158 21.9697 17.3467C21.8902 18.0193 21.7509 18.5635 21.5186 19.0254L21.3867 18.917C21.5973 18.4853 21.7275 17.9717 21.8037 17.3271C21.9007 16.5066 21.9141 15.4838 21.916 14.167H22.082ZM22.083 12.167V12.833H21.917V12.167H22.083ZM2.08301 12.167V12.833H1.91699V12.167H2.08301ZM22.0312 9.47266C22.0688 9.83055 22.0796 10.263 22.082 10.833H21.915C21.9125 10.2791 21.9027 9.86302 21.8691 9.52246L22.0312 9.47266ZM2.12988 9.52246C2.09633 9.86299 2.08746 10.2791 2.08496 10.833H1.91797C1.92044 10.2631 1.93025 9.83051 1.96777 9.47266L2.12988 9.52246ZM4.24219 6.50098C3.49004 6.8788 2.87895 7.48916 2.50098 8.24121L2.33984 8.19238C2.73707 7.38795 3.38883 6.73691 4.19336 6.33984L4.24219 6.50098ZM6.43164 6.08887C6.0699 6.09414 5.77534 6.10496 5.52246 6.12988L5.47266 5.96777C5.68236 5.94578 5.91776 5.93572 6.19141 5.92871L6.43164 6.08887ZM9.14648 3.75293C9.12704 3.77574 9.10674 3.79877 9.08691 3.82324C8.9838 3.9505 8.87502 4.09906 8.75391 4.27441L8.61621 4.18164C8.73948 4.00314 8.85048 3.84927 8.95703 3.71777C8.99206 3.67455 9.02796 3.63463 9.0625 3.5957L9.14648 3.75293ZM13.0264 2.91895C13.2434 2.92249 13.433 2.93057 13.6016 2.94629C13.6566 2.95143 13.7095 2.95873 13.7607 2.96582L13.6768 3.12305C13.6472 3.11955 13.617 3.11521 13.5859 3.1123C13.423 3.09711 13.2392 3.08944 13.0264 3.08594V2.91895ZM10.9736 3.08594C10.7608 3.08944 10.5769 3.09712 10.4141 3.1123C10.3826 3.11524 10.3521 3.11951 10.3223 3.12305L10.2383 2.96582C10.2898 2.95867 10.343 2.95146 10.3984 2.94629C10.567 2.93057 10.7567 2.92249 10.9736 2.91895V3.08594Z" fill="#7C7C7C" stroke="#7C7C7C" stroke-width="1.33333"/>
<path d="M16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13Z" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.9737 3.02148C17.9795 2.99284 18.0205 2.99284 18.0263 3.02148C18.3302 4.50808 19.4919 5.66984 20.9785 5.97368C21.0072 5.97954 21.0072 6.02046 20.9785 6.02632C19.4919 6.33016 18.3302 7.49192 18.0263 8.97852C18.0205 9.00716 17.9795 9.00716 17.9737 8.97852C17.6698 7.49192 16.5081 6.33016 15.0215 6.02632C14.9928 6.02046 14.9928 5.97954 15.0215 5.97368C16.5081 5.66984 17.6698 4.50808 17.9737 3.02148Z" stroke="#7C7C7C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

              <span className="text-sm text-[#7C7C7C]">
                Upload/capture License <span className="font-medium text-[#2E8BC9]">Back</span>
              </span>
            </div>
               <p className="text-sm text-gray-600 mb-6">
     Accepted formats: JPG, PNG. Max file size: 5MB
      </p>
          </div>
        </div>
  {/* Driver's License */}
        <div className="grid gap-2">
          <label htmlFor="driver-license" className="text-sm font-medium text-gray-700">Last 4 digits of SSN</label>
          <input
            id="tin"
            name="tin"
            placeholder="4455"
            className="w-full px-3 py-2 shadow-md rounded-md  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.tin}
            onChange={handleChange}
          />   <p className="text-sm text-gray-600 mb-6">
      For identification purposes only
      </p>
        </div>
       
        {/* Submit Button */}
        <div className='flex justify-end items-end'>
  <button
          type="submit"
          className="flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E8BC9]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M13 4L20 11" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M14 22H22" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  Submit Information
        </button>

        </div>
      
      </form>
    </div>
  );
}