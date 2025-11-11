"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdatePersonalInfoMutation } from "@/redux/features/onboarding/onboardingApi";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Select from "@/components/UI/Select";
import { Lock } from "lucide-react";
const PatientInfoPage = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    sex: "Male",
    maritalStatus: "",
    bloodGroup: "",
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
  });

  const [frontLicenseFile, setFrontLicenseFile] = useState<File | null>(null);
  const [backLicenseFile, setBackLicenseFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [updatePersonalInfo, { isLoading }] = useUpdatePersonalInfoMutation();
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          licenseImage: 'Please upload JPG or PNG files only' 
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors(prev => ({ 
          ...prev, 
          licenseImage: 'File size must be less than 5MB' 
        }));
        return;
      }

      if (side === "front") {
        setFrontLicenseFile(file);
      } else {
        setBackLicenseFile(file);
      }

      // Clear file errors
      if (errors.licenseImage) {
        setErrors(prev => ({ ...prev, licenseImage: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.maritalStatus) newErrors.maritalStatus = "Marital status is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zip) newErrors.zip = "ZIP code is required";
    if (!formData.ssnLast4) newErrors.ssnLast4 = "Last 4 SSN digits are required";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // SSN validation
    if (formData.ssnLast4 && !/^\d{4}$/.test(formData.ssnLast4)) {
      newErrors.ssnLast4 = "Please enter exactly 4 digits";
    }

    // License images validation
    if (!frontLicenseFile || !backLicenseFile) {
      newErrors.licenseImage = "Both front and back license images are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  try {
    // Create FormData for file upload
    const submitData = new FormData();

    // Append all fields individually according to API structure
    submitData.append('fullName', JSON.stringify({
      first: formData.firstName,
      last: formData.lastName,
      ...(formData.middleName && { middle: formData.middleName })
    }));

    submitData.append('dob', formData.dateOfBirth);
    submitData.append('sex', formData.sex);
    submitData.append('maritalStatus', formData.maritalStatus);
    
    if (formData.bloodGroup) {
      submitData.append('bloodGroup', formData.bloodGroup);
    }
    
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    
    submitData.append('address', JSON.stringify({
      line1: formData.addressLine1,
      ...(formData.addressLine2 && { line2: formData.addressLine2 }),
      city: formData.city,
      state: formData.state,
      zip: formData.zip
    }));

    if (formData.employer) {
      submitData.append('employer', formData.employer);
    }

    if (formData.driversLicense) {
      submitData.append('driversLicense', JSON.stringify({
        licenseNumber: formData.driversLicense
      }));
    }

    submitData.append('last4SSN', formData.ssnLast4);

    if (formData.numberOfChildren) {
      submitData.append('numberOfChildren', formData.numberOfChildren);
    }
    
    // Append files
    if (frontLicenseFile) {
      submitData.append('frontImage', frontLicenseFile);
    }
    if (backLicenseFile) {
      submitData.append('backImage', backLicenseFile);
    }

    // Debug: Log FormData contents
    console.log('FormData contents:');
    for (let [key, value] of submitData.entries()) {
      console.log(key, value);
    }

    // Make API call
    const result = await updatePersonalInfo(submitData).unwrap();

    console.log("Personal info updated successfully:", result);
    
    // Redirect to next step
    router.push("/medical-info");

  } catch (error: any) {
    console.error("Failed to update personal info:", error);
    
    // Handle API errors
    if (error.data?.message) {
      setErrors(prev => ({ 
        ...prev, 
        submit: error.data.message 
      }));
    } else {
      setErrors(prev => ({ 
        ...prev, 
        submit: "Failed to save information. Please try again." 
      }));
    }
  }
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

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  const stateOptions = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    // Add more states as needed
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
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center text-sm font-medium">
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
            <p className="text-Text-secondary text-[16px] font-medium">
              Hi! Please share your personal info to verify your identity and
              stay connected with your healthcare providers.
            </p>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-600 text-sm font-medium">{errors.submit}</p>
            </div>
          )}

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
                    errorMessage={errors.firstName}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      label=""
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      placeholder="Middle"
                      errorMessage={errors.middleName}
                    />
                    <Input
                      label=""
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      errorMessage={errors.lastName}
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
                    errorMessage={errors.dateOfBirth}
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

              {/* Blood Group */}
              <Select
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                options={bloodGroupOptions}
                placeholder="Select blood group"
          
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
                  errorMessage={errors.numberOfChildren}
                />
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">
              {/* Email */}
              <div className="mb-4">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  required
                  errorMessage={errors.email}
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 9999999999"
                  required
                  errorMessage={errors.phone}
                />
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">
              {/* Address Line 1 */}
              <div className="mb-4">
                <Input
                  label="Address Line 1"
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  required
                  errorMessage={errors.addressLine1}
                />
              </div>

              {/* Address Line 2 */}
              <div className="mb-4">
                <Input
                  label="Address Line 2 (optional)"
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, unit, etc."
                  errorMessage={errors.addressLine2}
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div>
                  <Input
                    label="City"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    errorMessage={errors.city} placeholder={""}                  />
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
                    {stateOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
                <div>
                  <Input
                    label="ZIP"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    errorMessage={errors.zip} placeholder={""}                  />
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="bg-white rounded-lg p-2 flex flex-col gap-6">
              {/* Employer */}
              <div className="mb-4">
                <Input
                  label="Employer"
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleInputChange}
                  placeholder="Company name"
                  errorMessage={errors.employer}
                />
              </div>

              {/* Driver's License */}
              <div className="mb-4">
                <Input
                  label="Driver's License"
                  type="text"
                  name="driversLicense"
                  value={formData.driversLicense}
                  onChange={handleInputChange}
                  placeholder="License number"
                  errorMessage={errors.driversLicense}
                />
              </div>

              {/* Upload Driver's License Images */}
              <div className="mb-4">
                <label className="block mb-2 text-text-primary font-medium">
                  Upload Driver's License Images
                </label>
                {errors.licenseImage && (
                  <p className="text-red-500 text-sm mb-2">{errors.licenseImage}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* Front Upload */}
                  <div className="border-2 border-dashed bg-[#F2F8FD] border-blue-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="front-license"
                      accept="image/jpeg,image/jpg,image/png"
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
                          {/* ... your SVG code ... */}
                        </svg>
                      </div>
                      <p className="text-Text-secondary font-normal">
                        Upload/capture License{" "}
                        <span className="text-primary-500 font-bold">Front</span>
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
                      accept="image/jpeg,image/jpg,image/png"
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
                          {/* ... your SVG code ... */}
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
                <Input
                  label="Last 4 digits of SSN"
                  type="text"
                  name="ssnLast4"
                  value={formData.ssnLast4}
                  onChange={handleInputChange}
                  placeholder="4455"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  required
                  errorMessage={errors.ssnLast4}
                  icon={<Lock className="w-5 h-5 text-gray-400" />}
                />
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
                  className="bg-white cursor-pointer text-gray-600 px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              </Link>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-500 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Next"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PatientInfoPage;