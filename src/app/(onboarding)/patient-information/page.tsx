"use client";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "@/assets/logo";
import {
  Eye,
  Upload,
  CameraIcon,
  CameraOff,
  CameraOffIcon,
  Lock,
} from "lucide-react";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";

// export const metadata: Metadata = {
//   title: "Patient Information | Wellbyn",
//   description: "Patient registration form for healthcare providers",
//   keywords: ["patient", "registration", "healthcare"],
// };

const PatientInfoPage = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "Male",
    maritalStatus: "",
    numberOfChildren: "",

    // Contact Info
    email: "",
    phone: "",

    // Address
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",

    // Additional Info
    employer: "",
    driversLicense: "",
    ssnLast4: "",

    // Privacy Policy
    agreedToPrivacy: false,
  });

  const [frontLicenseFile, setFrontLicenseFile] = useState<File | null>(null);
  const [backLicenseFile, setBackLicenseFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (side === "front") {
        setFrontLicenseFile(file);
      } else {
        setBackLicenseFile(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission:", formData);
  };

  const handlePrevious = () => {
    // Navigate to previous step
    console.log("Previous step");
  };

  const handleNext = () => {
    // Navigate to next step
    console.log("Next step");
  };

  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const maritalStatusOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
    { value: "Divorced", label: "Divorced" },
    { value: "Widowed", label: "Widowed" },
  ];

  const stateOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    // ... more states
  ];

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-white">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col justify-center items-center">
              <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm text-primary-500 font-medium">Step</span>
            </div>

            <div className="flex-1 h-[2px] bg-Border-tertiary mb-4"></div>

            <div className="flex flex-col justify-center items-center">
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-Text-secondary font-medium">
                Step
              </span>
            </div>

            <div className="flex-1 h-[2px] bg-gray-300 mb-4"></div>

            <div className="flex flex-col justify-center items-center">
              <div className="w-10 h-10  bg-white text-black rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-Text-secondary font-medium">
                Step
              </span>
            </div>
          </div>

          {/* Header */}
          <div>
            <div className="flex mb-2">
              <div className="w-6 h-6 mr-3">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 16.5C9.19863 15.2923 10.5045 14.4797 12 14.4797C13.4956 14.4797 14.8014 15.2923 15.5 16.5M14.0001 10C14.0001 11.1046 13.1046 12 12.0001 12C10.8955 12 10 11.1046 10 10C10 8.89543 10.8955 8 12.0001 8C13.1046 8 14.0001 8.89543 14.0001 10Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 13.9669V10.0332C19.1433 10.0332 17.2857 6.93041 18.732 4.46691L15.2679 2.5001C13.8038 4.99405 10.1978 4.99395 8.73363 2.5L5.26953 4.46681C6.71586 6.93035 4.85673 10.0332 2 10.0332V13.9669C4.85668 13.9669 6.71425 17.0697 5.26795 19.5332L8.73205 21.5C10.1969 19.0048 13.8046 19.0047 15.2695 21.4999L18.7336 19.5331C17.2874 17.0696 19.1434 13.9669 22 13.9669Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="font-medium text-[18px] text-text-primary">
                  Patient Information
                </h1>
              </div>
            </div>
            <p className=" text-Text-secondary text-[16px] font-medium">
              Hi! Please share your personal info to verify your identity and
              stay connected with your healthcare providers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Info Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">
              {/* Full Name */}
              <div className="">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                  <Input
                    label="Full Name"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label=""
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Middle"
                    />
                    <Input
                      label=""
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="">
                <div className="relative">
                  <Input
                    label="Date Of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    placeholder="MM/DD/YYYY"
                  />
                </div>
              </div>

              {/* Sex */}
              <Select
                label="Sex"
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                options={sexOptions}
                placeholder="Select Sex"
                required
              />

              {/* Marital Status */}
              <Select
                label="Marital Status"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleInputChange}
                options={maritalStatusOptions}
                placeholder="Select status"
                required
              />

              {/* Number of Children */}
              <div className="mb-4">
                <Input
                  label="Number of Children (optional)"
                  type="number"
                  name="numberOfChildren"
                  value={formData.numberOfChildren}
                  onChange={handleInputChange}
                  placeholder="0"
                  min={0}
                />
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">
              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="example@email.com"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="+1 9999999999"
                  required
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">
              {/* Address Line 1 */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="Street address"
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Address Line 2{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="Apartment, suite, unit, etc."
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block mb-2 text-text-primary font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-text-primary font-medium">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Select</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    {/* Add more states as needed */}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-text-primary font-medium">
                    ZIP
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">

              {/* Employer */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Employer
                </label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="Company name"
                />
              </div>

              {/* Driver's License */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Driver's License
                </label>
                <input
                  type="text"
                  name="driversLicense"
                  value={formData.driversLicense}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="License number"
                />
              </div>

              {/* Upload Driver's License Images */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Upload Driver's License Images
                </label>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* Front Upload */}
                  <div className="border-2 border-dashed bg-[#F2F8FD] border-blue-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="front-license"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "front")}
                      className="hidden"
                    />
                    <label htmlFor="front-license" className="cursor-pointer">
                      <div className="flex items-center justify-center mb-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.833 20.917V21.083H10.167V20.917H13.833ZM4.08203 20.3867C4.51386 20.5975 5.02783 20.7275 5.67285 20.8037C6.49344 20.9007 7.51619 20.9131 8.83301 20.915V21.082C7.51657 21.0801 6.48409 21.0679 5.65332 20.9697C4.98025 20.8902 4.4357 20.7512 3.97363 20.5186L4.08203 20.3867ZM20.0254 20.5186C19.5635 20.7509 19.0193 20.8903 18.3467 20.9697C17.5158 21.0679 16.4835 21.0801 15.167 21.082V20.915C16.4838 20.9131 17.5066 20.9007 18.3271 20.8037C18.9717 20.7275 19.4853 20.5973 19.917 20.3867L20.0254 20.5186ZM2.08398 14.167C2.08591 15.4838 2.09929 16.5066 2.19629 17.3271C2.27247 17.9715 2.40182 18.4854 2.6123 18.917L2.48047 19.0254C2.24825 18.5636 2.11075 18.0191 2.03125 17.3467C1.93305 16.5158 1.91987 15.4835 1.91797 14.167H2.08398ZM22.082 14.167C22.0801 15.4835 22.0679 16.5158 21.9697 17.3467C21.8902 18.0193 21.7509 18.5635 21.5186 19.0254L21.3867 18.917C21.5973 18.4853 21.7275 17.9717 21.8037 17.3271C21.9007 16.5066 21.9141 15.4838 21.916 14.167H22.082ZM22.083 12.167V12.833H21.917V12.167H22.083ZM2.08301 12.167V12.833H1.91699V12.167H2.08301ZM22.0312 9.47266C22.0688 9.83055 22.0796 10.263 22.082 10.833H21.915C21.9125 10.2791 21.9027 9.86302 21.8691 9.52246L22.0312 9.47266ZM2.12988 9.52246C2.09633 9.86299 2.08746 10.2791 2.08496 10.833H1.91797C1.92044 10.2631 1.93025 9.83051 1.96777 9.47266L2.12988 9.52246ZM4.24219 6.50098C3.49004 6.8788 2.87895 7.48916 2.50098 8.24121L2.33984 8.19238C2.73707 7.38795 3.38883 6.73691 4.19336 6.33984L4.24219 6.50098ZM6.43164 6.08887C6.0699 6.09414 5.77534 6.10496 5.52246 6.12988L5.47266 5.96777C5.68236 5.94578 5.91776 5.93572 6.19141 5.92871L6.43164 6.08887ZM9.14648 3.75293C9.12704 3.77574 9.10674 3.79877 9.08691 3.82324C8.9838 3.9505 8.87502 4.09906 8.75391 4.27441L8.61621 4.18164C8.73948 4.00314 8.85048 3.84927 8.95703 3.71777C8.99206 3.67455 9.02796 3.63463 9.0625 3.5957L9.14648 3.75293ZM13.0264 2.91895C13.2434 2.92249 13.433 2.93057 13.6016 2.94629C13.6566 2.95143 13.7095 2.95873 13.7607 2.96582L13.6768 3.12305C13.6472 3.11955 13.617 3.11521 13.5859 3.1123C13.423 3.09711 13.2392 3.08944 13.0264 3.08594V2.91895ZM10.9736 3.08594C10.7608 3.08944 10.5769 3.09712 10.4141 3.1123C10.3826 3.11524 10.3521 3.11951 10.3223 3.12305L10.2383 2.96582C10.2898 2.95867 10.343 2.95146 10.3984 2.94629C10.567 2.93057 10.7567 2.92249 10.9736 2.91895V3.08594Z"
                            fill="#7C7C7C"
                            stroke="#7C7C7C"
                            strokeWidth="1.33333"
                          />
                          <path
                            d="M16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13Z"
                            stroke="#7C7C7C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.9737 3.02148C17.9795 2.99284 18.0205 2.99284 18.0263 3.02148C18.3302 4.50808 19.4919 5.66984 20.9785 5.97368C21.0072 5.97954 21.0072 6.02046 20.9785 6.02632C19.4919 6.33016 18.3302 7.49192 18.0263 8.97852C18.0205 9.00716 17.9795 9.00716 17.9737 8.97852C17.6698 7.49192 16.5081 6.33016 15.0215 6.02632C14.9928 6.02046 14.9928 5.97954 15.0215 5.97368C16.5081 5.66984 17.6698 4.50808 17.9737 3.02148Z"
                            stroke="#7C7C7C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <p className=" text-Text-secondary font-normal">
                        Upload/capture License{" "}
                        <span className="text-primary-500 font-bold">
                          Front
                        </span>
                      </p>
                      {frontLicenseFile && (
                        <p className="text-sm text-gray-600 mt-1">
                          {frontLicenseFile.name}
                        </p>
                      )}
                    </label>
                  </div>

                  {/* Back Upload */}
                  <div className="border-2 border-dashed bg-[#F2F8FD] border-blue-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="back-license"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "back")}
                      className="hidden"
                    />
                    <label htmlFor="back-license" className="cursor-pointer">
                      <div className="flex items-center justify-center mb-2">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.833 20.917V21.083H10.167V20.917H13.833ZM4.08203 20.3867C4.51386 20.5975 5.02783 20.7275 5.67285 20.8037C6.49344 20.9007 7.51619 20.9131 8.83301 20.915V21.082C7.51657 21.0801 6.48409 21.0679 5.65332 20.9697C4.98025 20.8902 4.4357 20.7512 3.97363 20.5186L4.08203 20.3867ZM20.0254 20.5186C19.5635 20.7509 19.0193 20.8903 18.3467 20.9697C17.5158 21.0679 16.4835 21.0801 15.167 21.082V20.915C16.4838 20.9131 17.5066 20.9007 18.3271 20.8037C18.9717 20.7275 19.4853 20.5973 19.917 20.3867L20.0254 20.5186ZM2.08398 14.167C2.08591 15.4838 2.09929 16.5066 2.19629 17.3271C2.27247 17.9715 2.40182 18.4854 2.6123 18.917L2.48047 19.0254C2.24825 18.5636 2.11075 18.0191 2.03125 17.3467C1.93305 16.5158 1.91987 15.4835 1.91797 14.167H2.08398ZM22.082 14.167C22.0801 15.4835 22.0679 16.5158 21.9697 17.3467C21.8902 18.0193 21.7509 18.5635 21.5186 19.0254L21.3867 18.917C21.5973 18.4853 21.7275 17.9717 21.8037 17.3271C21.9007 16.5066 21.9141 15.4838 21.916 14.167H22.082ZM22.083 12.167V12.833H21.917V12.167H22.083ZM2.08301 12.167V12.833H1.91699V12.167H2.08301ZM22.0312 9.47266C22.0688 9.83055 22.0796 10.263 22.082 10.833H21.915C21.9125 10.2791 21.9027 9.86302 21.8691 9.52246L22.0312 9.47266ZM2.12988 9.52246C2.09633 9.86299 2.08746 10.2791 2.08496 10.833H1.91797C1.92044 10.2631 1.93025 9.83051 1.96777 9.47266L2.12988 9.52246ZM4.24219 6.50098C3.49004 6.8788 2.87895 7.48916 2.50098 8.24121L2.33984 8.19238C2.73707 7.38795 3.38883 6.73691 4.19336 6.33984L4.24219 6.50098ZM6.43164 6.08887C6.0699 6.09414 5.77534 6.10496 5.52246 6.12988L5.47266 5.96777C5.68236 5.94578 5.91776 5.93572 6.19141 5.92871L6.43164 6.08887ZM9.14648 3.75293C9.12704 3.77574 9.10674 3.79877 9.08691 3.82324C8.9838 3.9505 8.87502 4.09906 8.75391 4.27441L8.61621 4.18164C8.73948 4.00314 8.85048 3.84927 8.95703 3.71777C8.99206 3.67455 9.02796 3.63463 9.0625 3.5957L9.14648 3.75293ZM13.0264 2.91895C13.2434 2.92249 13.433 2.93057 13.6016 2.94629C13.6566 2.95143 13.7095 2.95873 13.7607 2.96582L13.6768 3.12305C13.6472 3.11955 13.617 3.11521 13.5859 3.1123C13.423 3.09711 13.2392 3.08944 13.0264 3.08594V2.91895ZM10.9736 3.08594C10.7608 3.08944 10.5769 3.09712 10.4141 3.1123C10.3826 3.11524 10.3521 3.11951 10.3223 3.12305L10.2383 2.96582C10.2898 2.95867 10.343 2.95146 10.3984 2.94629C10.567 2.93057 10.7567 2.92249 10.9736 2.91895V3.08594Z"
                            fill="#7C7C7C"
                            stroke="#7C7C7C"
                            strokeWidth="1.33333"
                          />
                          <path
                            d="M16 13C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13Z"
                            stroke="#7C7C7C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.9737 3.02148C17.9795 2.99284 18.0205 2.99284 18.0263 3.02148C18.3302 4.50808 19.4919 5.66984 20.9785 5.97368C21.0072 5.97954 21.0072 6.02046 20.9785 6.02632C19.4919 6.33016 18.3302 7.49192 18.0263 8.97852C18.0205 9.00716 17.9795 9.00716 17.9737 8.97852C17.6698 7.49192 16.5081 6.33016 15.0215 6.02632C14.9928 6.02046 14.9928 5.97954 15.0215 5.97368C16.5081 5.66984 17.6698 4.50808 17.9737 3.02148Z"
                            stroke="#7C7C7C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-Text-secondary font-normal">
                        Upload/capture License{" "}
                        <span className="text-primary-500 font-bold">Back</span>
                      </p>
                      {backLicenseFile && (
                        <p className="text-sm text-gray-600 mt-1">
                          {backLicenseFile.name}
                        </p>
                      )}
                    </label>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Accepted formats: JPG, PNG. Max file size: 5MB
                </p>
              </div>

              {/* Last 4 digits of SSN */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Last 4 digits of SSN
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="ssnLast4"
                    value={formData.ssnLast4}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-tertiary text-Text-secondary rounded-lg p-3 pl-10 font-bold focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="4455"
                    maxLength={4}
                    pattern="[0-9]{4}"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  For identification purposes only
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Link href="/hipaa-concent">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-white cursor-pointer text-gray-600 px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              </Link>

              <Link href="/medical-info">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary-500 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                >
                  Next
                </button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PatientInfoPage;
