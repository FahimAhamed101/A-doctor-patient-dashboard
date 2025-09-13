"use client";

import React, { useState } from "react";
import { User, Calendar, Upload, CheckCircle } from "lucide-react";
import { useInsurance } from "../../InsuranceContext";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Card from "@/components/UI/Card";

interface InsuranceCardData {
  insuranceProvider: string;
  policyNumber: string;
  phone: string;
  groupNumber: string;
  effectiveDate: string;
  expirationDate: string;
  deductible: string;
  insuranceCard: File | null;
}

const AddInsuranceCardPage = () => {
  const { addInsuranceCard } = useInsurance();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState<InsuranceCardData>({
    insuranceProvider: "",
    policyNumber: "",
    phone: "",
    groupNumber: "",
    effectiveDate: "",
    expirationDate: "",
    deductible: "",
    insuranceCard: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      insuranceCard: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.insuranceProvider || !formData.phone || !formData.groupNumber) {
        alert("Please fill in all required fields");
        return;
      }

      // Add the insurance card
      addInsuranceCard(formData);

      // Show success message
      setShowSuccess(true);

      // Reset form
      setFormData({
        insuranceProvider: "",
        policyNumber: "",
        phone: "",
        groupNumber: "",
        effectiveDate: "",
        expirationDate: "",
        deductible: "",
        insuranceCard: null,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/insurance-info");
      }, 2000);

    } catch (error) {
      console.error("Error saving insurance card:", error);
      alert("Error saving insurance card. Please try again.");
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
                  Insurance Provider
                </label>
                <input
                  type="text"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleInputChange}
                  placeholder="ABC Health Insurance"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Policy Number */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Policy Number
                </label>
                <input
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  placeholder="H123456789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 9999999999"
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
                  placeholder="G987654321"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Effective Date and Expiration Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[18px] font-medium text-text-primary mb-2">
                    Effective Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="effectiveDate"
                      value={formData.effectiveDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[18px] font-medium text-text-primary mb-2">
                    Expiration Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Deductible */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Deductible
                </label>
                <input
                  type="text"
                  name="deductible"
                  value={formData.deductible}
                  onChange={handleInputChange}
                  placeholder="$1,000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
                />
              </div>

              {/* Insurance Card Upload */}
              <div>
                <label className="block text-[18px] font-medium text-text-primary mb-2">
                  Insurance Card
                </label>
                <div className=" lg">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
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