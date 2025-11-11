"use client";

import React, { useState } from "react";
import { User, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "@/components/UI/Card";
import { useUpdateInsuranceInfoMutation } from "@/redux/features/onboarding/onboardingApi";

interface Subscriber {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  sex: string;
  employerName?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface InsuranceCardData {
  insuranceName: string;
  contractId: string;
  groupNumber: string;
  patientRelationship: string;
  subscriber: Subscriber;
  insuranceCard?: File | null;
  digitalSignature?: File | null;
}

const AddInsuranceCardPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateInsuranceInfo] = useUpdateInsuranceInfoMutation();

  const [formData, setFormData] = useState<InsuranceCardData>({
    insuranceName: "",
    contractId: "",
    groupNumber: "",
    patientRelationship: "Self",
    subscriber: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      sex: "Male",
      employerName: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: ""
      }
    },
    insuranceCard: null,
    digitalSignature: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested subscriber fields
    if (name.startsWith('subscriber.')) {
      const subscriberField = name.replace('subscriber.', '');
      if (subscriberField.startsWith('address.')) {
        const addressField = subscriberField.replace('address.', '');
        setFormData(prev => ({
          ...prev,
          subscriber: {
            ...prev.subscriber,
            address: {
              ...prev.subscriber.address,
              [addressField]: value
            }
          }
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          subscriber: {
            ...prev.subscriber,
            [subscriberField]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'insuranceCard' | 'digitalSignature') => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.insuranceName || !formData.contractId || !formData.groupNumber || 
          !formData.subscriber.firstName || !formData.subscriber.lastName || 
          !formData.subscriber.dob || !formData.subscriber.address.line1 || 
          !formData.subscriber.address.city || !formData.subscriber.address.state || 
          !formData.subscriber.address.zip) {
        alert("Please fill in all required fields");
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Prepare insurance info array
      const insuranceInfo = [{
        insuranceName: formData.insuranceName,
        contractId: formData.contractId,
        groupNumber: formData.groupNumber,
        patientRelationship: formData.patientRelationship,
        subscriber: {
          firstName: formData.subscriber.firstName,
          ...(formData.subscriber.middleName && { middleName: formData.subscriber.middleName }),
          lastName: formData.subscriber.lastName,
          dob: formData.subscriber.dob,
          sex: formData.subscriber.sex,
          ...(formData.subscriber.employerName && { employerName: formData.subscriber.employerName }),
          address: {
            line1: formData.subscriber.address.line1,
            ...(formData.subscriber.address.line2 && { line2: formData.subscriber.address.line2 }),
            city: formData.subscriber.address.city,
            state: formData.subscriber.address.state,
            zip: formData.subscriber.address.zip
          }
        }
      }];

      // Append JSON data
      submitData.append('insuranceInfo', JSON.stringify(insuranceInfo));
      
      // Append files if they exist
      if (formData.insuranceCard) {
        submitData.append('insuranceInfo[0][insuranceCard]', formData.insuranceCard);
      }
      if (formData.digitalSignature) {
        submitData.append('insuranceInfo[0][digitalSignature]', formData.digitalSignature);
      }

      // Make API call
      const result = await updateInsuranceInfo(submitData).unwrap();

      console.log("Insurance info updated successfully:", result);

      // Reset form
      setFormData({
        insuranceName: "",
        contractId: "",
        groupNumber: "",
        patientRelationship: "Self",
        subscriber: {
          firstName: "",
          middleName: "",
          lastName: "",
          dob: "",
          sex: "Male",
          employerName: "",
          address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            zip: ""
          }
        },
        insuranceCard: null,
        digitalSignature: null,
      });

      // Redirect to insurance info page
      router.push("/insurance-info");

    } catch (error: any) {
      console.error("Error saving insurance card:", error);
      alert(error?.data?.message || "Error saving insurance card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center md:p-4">
        <div className="w-full max-w-2xl">
          <Card>
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col justify-center items-center">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="text-sm text-gray-600 font-medium">Step</span>
              </div>

              <div className="flex-1 h-px bg-gray-300 mb-4"></div>

              <div className="flex flex-col justify-center items-center">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm text-gray-600 font-medium">Step</span>
              </div>

              <div className="flex-1 h-px bg-gray-300 mb-4"></div>

              <div className="flex flex-col justify-center items-center">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-sm text-gray-600 font-medium">Step</span>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-gray-600 mr-3" />
                <h1 className="text-2xl font-semibold text-gray-900">
                  Add Insurance Card
                </h1>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Please provide your insurance information to add a new card to your profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Insurance Provider */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Insurance Provider *
                </label>
                <input
                  type="text"
                  name="insuranceName"
                  value={formData.insuranceName}
                  onChange={handleInputChange}
                  placeholder="Blue Cross Blue Shield"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Contract ID (Policy Number) */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Contract ID / Policy Number *
                </label>
                <input
                  type="text"
                  name="contractId"
                  value={formData.contractId}
                  onChange={handleInputChange}
                  placeholder="CON123456789"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Group Number */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Group Number *
                </label>
                <input
                  type="text"
                  name="groupNumber"
                  value={formData.groupNumber}
                  onChange={handleInputChange}
                  placeholder="GRP987654321"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Patient Relationship */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Patient Relationship *
                </label>
                <select
                  name="patientRelationship"
                  value={formData.patientRelationship}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                >
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Subscriber Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Subscriber Information</h3>
                
                {/* Subscriber Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="subscriber.firstName"
                      value={formData.subscriber.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="subscriber.middleName"
                      value={formData.subscriber.middleName}
                      onChange={handleInputChange}
                      placeholder="A"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="subscriber.lastName"
                      value={formData.subscriber.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subscriber DOB and Sex */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="subscriber.dob"
                      value={formData.subscriber.dob}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      Sex *
                    </label>
                    <select
                      name="subscriber.sex"
                      value={formData.subscriber.sex}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Employer Name */}
                <div className="mb-4">
                  <label className="block text-[16px] font-medium text-text-primary mb-2">
                    Employer Name
                  </label>
                  <input
                    type="text"
                    name="subscriber.employerName"
                    value={formData.subscriber.employerName}
                    onChange={handleInputChange}
                    placeholder="Tech Solutions Inc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                  />
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Address</h4>
                  
                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="subscriber.address.line1"
                      value={formData.subscriber.address.line1}
                      onChange={handleInputChange}
                      placeholder="123 Main St"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[16px] font-medium text-text-primary mb-2">
                      Apt, Suite, Unit (Optional)
                    </label>
                    <input
                      type="text"
                      name="subscriber.address.line2"
                      value={formData.subscriber.address.line2}
                      onChange={handleInputChange}
                      placeholder="Apt 4B"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[16px] font-medium text-text-primary mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="subscriber.address.city"
                        value={formData.subscriber.address.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-text-primary mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="subscriber.address.state"
                        value={formData.subscriber.address.state}
                        onChange={handleInputChange}
                        placeholder="NY"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-text-primary mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="subscriber.address.zip"
                        value={formData.subscriber.address.zip}
                        onChange={handleInputChange}
                        placeholder="10001"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Card Upload */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Insurance Card
                </label>
                <div className="lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'insuranceCard')}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload Card</span>
                    </div>
                  </label>
                  {formData.insuranceCard && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {formData.insuranceCard.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Digital Signature Upload */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Digital Signature
                </label>
                <div className="lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'digitalSignature')}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Upload Signature</span>
                    </div>
                  </label>
                  {formData.digitalSignature && (
                    <div className="mt-2 text-sm text-gray-600">
                      Selected: {formData.digitalSignature.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Save Change Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Saving..." : "Save Change"}
                </button>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Link href="/insurance-info">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                </Link>
                <Link href="/insurance-info">
                  <button
                    type="button"
                    className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddInsuranceCardPage;