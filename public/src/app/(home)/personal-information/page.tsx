"use client";
import { useState, useEffect } from 'react';
import { useGetProfileQuery, useUpdatePatientProfileMutation } from '@/redux/features/auth/authApi';

interface PatientData {
  data: {
    attributes: {
      user: {
        id: string;
        userName: string;
        firstName: string;
        lastName: string;
        fullName: string;
        email: string;
        profileImage: string;
        dateOfBirth: string | null;
        gender: string;
        callingCode: string;
        phoneNumber: string;
        address: string;
        height: { value: string | null; unit: string };
        weight: { value: string | null; unit: string };
        medicalCondition: string[];
        role: string;
        isProfileCompleted: boolean;
        chartCredits: number;
        appointmentCredits: number;
        createdAt: string;
        subscription: {
          subscriptionExpirationDate: string | null;
          status: string;
          isSubscriptionTaken: boolean;
        };
      };
      securitySettings: {
        recoveryEmail: string | null;
        recoveryPhone: string | null;
        securityQuestion: string | null;
      };
      documents: Array<{
        user: string;
        title: string;
        description: string;
        type: string;
        files: string[];
        createdAt: string;
        id: string;
      }>;
    };
  };
}

export default function PatientInformationForm() {
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  const [updatePatientProfile, { isLoading: isUpdating }] = useUpdatePatientProfileMutation();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    sex: 'Male',
    maritalStatus: 'Single',
    bloodGroup: 'A+',
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
    tin: '',
    licenseFrontImage: null as File | null,
    licenseBackImage: null as File | null,
  });

  const [frontImagePreview, setFrontImagePreview] = useState<string>('');
  const [backImagePreview, setBackImagePreview] = useState<string>('');

  // Transform API data to form data when profile loads
  useEffect(() => {
    if (profileData?.data?.attributes?.user) {
      const userData = profileData.data.attributes.user;
      
      // Parse fullName from the fullName string or use firstName/lastName
      const parseFullName = (fullName: string) => {
        const nameParts = fullName.split(' ');
        return {
          first: nameParts[0] || '',
          middle: nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '',
          last: nameParts.length > 1 ? nameParts[nameParts.length - 1] : ''
        };
      };

      const nameParts = parseFullName(userData.fullName);

      // Parse address if it exists
      let addressLine1 = '';
      let city = '';
      let state = 'ca';
      let zipCode = '';

      if (userData.address) {
        try {
          // Try to parse address as JSON, otherwise use as string
          const addressObj = typeof userData.address === 'string' 
            ? JSON.parse(userData.address) 
            : userData.address;
          addressLine1 = addressObj.line1 || addressObj.addressLine1 || '';
          city = addressObj.city || '';
          state = addressObj.state || 'ca';
          zipCode = addressObj.zip || addressObj.zipCode || '';
        } catch {
          // If parsing fails, use the address as is
          addressLine1 = userData.address;
        }
      }

      setFormData(prev => ({
        ...prev,
        firstName: nameParts.first || userData.firstName || '',
        middleName: nameParts.middle || '',
        lastName: nameParts.last || userData.lastName || '',
        dob: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
        sex: userData.gender || 'Male',
        maritalStatus: 'Single', // Default since not in API
        bloodGroup: 'a-positive', // Default since not in API
        numChildren: '0', // Default since not in API
        email: userData.email || '',
        phone: userData.phoneNumber || '',
        addressLine1: addressLine1,
        addressLine2: '', // Default since not in API
        city: city,
        state: state.toLowerCase() || 'ca',
        zipCode: zipCode,
        employer: '', // Default since not in API
        driverLicense: '', // Default since not in API
        tin: '', // Default since not in API
      }));

      // Note: Image previews would need to be handled differently since 
      // driversLicense data is not in the current API response structure
    }
  }, [profileData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('File size must be less than 5MB');
        return;
      }

      // Set file in form data
      setFormData(prev => ({
        ...prev,
        [type === 'front' ? 'licenseFrontImage' : 'licenseBackImage']: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'front') {
          setFrontImagePreview(e.target?.result as string);
        } else {
          setBackImagePreview(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updatePatientProfile(formData).unwrap();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2/4 mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="animate-pulse">Loading patient information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2/4 mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-red-600">Error loading patient information</div>
      </div>
    );
  }

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

      <form className="grid gap-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="grid gap-2">
          <label htmlFor="full-name" className="text-sm font-medium text-gray-700">Full Name</label>
          <div className="grid grid-cols-3 gap-4">
            <input
              id="first-name"
              name="firstName"
              placeholder="First Name"
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              id="middle-name"
              name="middleName"
              placeholder="Middle"
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.middleName}
              onChange={handleChange}
            />
            <input
              id="last-name"
              name="lastName"
              placeholder="Last Name"
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              type="date"
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 pr-10"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Sex */}
        <div className="grid gap-2">
          <label htmlFor="sex" className="text-sm font-medium text-gray-700">Sex</label>
          <select
            id="sex"
            name="sex"
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.sex}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="grid gap-2">
          <label htmlFor="marital-status" className="text-sm font-medium text-gray-700">Marital Status</label>
          <select
            id="marital-status"
            name="maritalStatus"
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.maritalStatus}
            onChange={handleChange}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="grid gap-2">
          <label htmlFor="blood-group" className="text-sm font-medium text-gray-700">Blood Group</label>
          <select
            id="blood-group"
            name="bloodGroup"
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.bloodGroup}
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="state" className="text-sm font-medium text-gray-700">State</label>
            <select
              id="state"
              name="state"
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="ca">California</option>
              <option value="ny">New York</option>
              <option value="tx">Texas</option>
              <option value="de">Delaware</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="zip-code" className="text-sm font-medium text-gray-700">Zip Code</label>
            <input
              id="zip-code"
              name="zipCode"
              placeholder="Zip Code"
              className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.driverLicense}
            onChange={handleChange}
          />
        </div>

        {/* Upload Driver's License Images */}
        <div className="grid gap-4">
          <label className="text-sm font-medium text-gray-700">Driver's License Images</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Front License */}
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#2E8BC9] rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                id="front-license"
                onChange={(e) => handleFileChange(e, 'front')}
              />
              <label htmlFor="front-license" className="cursor-pointer w-full text-center">
                {frontImagePreview ? (
                  <div className="relative">
                    <img 
                      src={frontImagePreview} 
                      alt="License Front Preview" 
                      className="w-full h-32 object-contain rounded-md"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Uploaded
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M13 4L20 11" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M14 22H22" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-[#7C7C7C] mt-2">
                      Upload License <span className="font-medium text-[#2E8BC9]">Front</span>
                    </span>
                  </div>
                )}
              </label>
            </div>

            {/* Back License */}
            <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#2E8BC9] rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                id="back-license"
                onChange={(e) => handleFileChange(e, 'back')}
              />
              <label htmlFor="back-license" className="cursor-pointer w-full text-center">
                {backImagePreview ? (
                  <div className="relative">
                    <img 
                      src={backImagePreview} 
                      alt="License Back Preview" 
                      className="w-full h-32 object-contain rounded-md"
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Uploaded
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M13 4L20 11" stroke="#2E8BC9" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M14 22H22" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-[#7C7C7C] mt-2">
                      Upload License <span className="font-medium text-[#2E8BC9]">Back</span>
                    </span>
                  </div>
                )}
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Accepted formats: JPG, PNG. Max file size: 5MB
          </p>
        </div>

        {/* Last 4 digits of SSN */}
        <div className="grid gap-2">
          <label htmlFor="tin" className="text-sm font-medium text-gray-700">Last 4 digits of SSN</label>
          <input
            id="tin"
            name="tin"
            placeholder="4455"
            className="w-full px-3 py-2 shadow-md rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.tin}
            onChange={handleChange}
          />
          <p className="text-sm text-gray-600">
            For identification purposes only
          </p>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end items-end'>
          <button
            type="submit"
            disabled={isUpdating}
            className="flex items-center justify-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2E8BC9] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M13 4L20 11" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M14 22H22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isUpdating ? 'Updating...' : 'Update Information'}
          </button>
        </div>
      </form>
    </div>
  );
}