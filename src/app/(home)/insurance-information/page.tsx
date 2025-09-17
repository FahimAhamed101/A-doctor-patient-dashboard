"use client";

import React, { useState } from "react";
import { User, Eye, Edit, Trash2 } from "lucide-react";
import { useInsurance } from "./InsuranceContext";
import Button from "@/components/UI/Button";
import Link from "next/link";

import { InsuranceProvider } from "./InsuranceContext";

interface InsuranceCard {
  id: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  phone: string;
  effectiveDate: string;
  expirationDate: string;
  deductible: string;
  cardImage?: string;
}

const MedicalInformationPage = () => {
  const { insuranceCards, deleteInsuranceCard } = useInsurance();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this insurance card?")) {
      setDeletingId(id);
      try {
        deleteInsuranceCard(id);
      } catch (error) {
        console.error("Error deleting insurance card:", error);
        alert("Error deleting insurance card. Please try again.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission
  };

  // Sample insurance data for 4 cards
  const insuranceData = [
    {
      id: "1",
      insuranceName: "Bluesky",
      contractId: "0987654321",
      groupNumber: "H123456789",
      expirationDate: "31/12/2025",
      relationship: "Father",
      firstName: "Kamal",
      middleName: "Ahmed",
      lastName: "Dune",
      contactId: "0987654321",
      addressLine1: "123 Main St",
      city: "Manhattan",
      state: "NYC",
      zip: "00076",
      employerName: "Mahmudcompany",
      sex: "Male",
      dateOfBirth: "31/12/2006",
    },
    {
      id: "2",
      insuranceName: "Aetna",
      contractId: "1234567890",
      groupNumber: "G987654321",
      expirationDate: "15/06/2024",
      relationship: "Self",
      firstName: "Sarah",
      middleName: "Marie",
      lastName: "Johnson",
      contactId: "1234567890",
      addressLine1: "456 Oak Ave",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      employerName: "TechCorp",
      sex: "Female",
      dateOfBirth: "15/03/1985",
    },
    {
      id: "3",
      insuranceName: "Cigna",
      contractId: "5555555555",
      groupNumber: "C333333333",
      expirationDate: "30/09/2024",
      relationship: "Spouse",
      firstName: "Michael",
      middleName: "James",
      lastName: "Brown",
      contactId: "5555555555",
      addressLine1: "789 Pine St",
      city: "Queens",
      state: "NY",
      zip: "11354",
      employerName: "FinanceInc",
      sex: "Male",
      dateOfBirth: "22/07/1982",
    },
    {
      id: "4",
      insuranceName: "UnitedHealthcare",
      contractId: "7777777777",
      groupNumber: "U444444444",
      expirationDate: "20/03/2025",
      relationship: "Child",
      firstName: "Emily",
      middleName: "Rose",
      lastName: "Wilson",
      contactId: "7777777777",
      addressLine1: "321 Elm Blvd",
      city: "Bronx",
      state: "NY",
      zip: "10458",
      employerName: "School District",
      sex: "Female",
      dateOfBirth: "10/11/2010",
    }
  ];

  return (
    <div className="min-h-screen ">
      <div className="flex justify-center md:p-4">
        <div className="w-full "> {/* Increased max-width for grid layout */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 8.5C14 9.60453 13.1046 10.5 12 10.5C10.8954 10.5 10 9.60453 10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.59003 13.6482C8.96125 14.0167 7.31261 14.7693 8.31674 15.711C8.80725 16.171 9.35355 16.5 10.0404 16.5H13.9596C14.6464 16.5 15.1928 16.171 15.6833 15.711C16.6874 14.7693 15.0388 14.0167 14.41 13.6482C12.9355 12.7839 11.0645 12.7839 9.59003 13.6482Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 11.1833V8.28029C21 5.82028 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h1 className="ml-3 text-2xl font-semibold text-gray-900">
                  Insurance Information
                </h1>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Greetings! To keep your insurance information current and
                facilitate ongoing communication with your healthcare providers,
                we kindly request that you provide your insurance details.
              </p>
            </div>

            {/* Add New Card Button */}
            <div className="mb-8">
              <Link href="/insurance-info/add-new">
                {insuranceCards.length === 0 ? (
                  <div>
                    <Link href="/insurance-information/insurenceform">
                      <Button className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors font-medium">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 4V20" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M4 12H20" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add Primary Card
                      </Button>
                    </Link>
                    <div className="w-full flex justify-center mt-4">
                      <Link href="/insurance-information/insurenceform" className="w-full">
                        <button className="w-full flex items-center justify-center gap-2 border border-primary-500 px-6 py-3 text-[#2E8BC9] rounded-lg hover:bg-action-hover font-medium">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4V20" stroke="#2E8BC9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 12H20" stroke="#2E8BC9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Add Other Card</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Button className="w-full border border-primary-500 px-6 py-3 bg-white text-primary-500 rounded-lg hover:bg-action-hover transition-colors font-medium hover:text-white">
                    + Add Other Card
                  </Button>
                )}
              </Link>
            </div>

            {/* Insurance Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {insuranceData.map((insurance, index) => (
    <div key={insurance.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-6">
        {/* Header with insurance name and delete button */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-500 mb-2">Insurance Name</p>
            <p className="text-lg font-semibold text-gray-900">{insurance.insuranceName}</p>
          </div>
          <button 
            onClick={() => handleDelete(insurance.id)}
            className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <svg width="50" height="50" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.5 14.5L30.8803 24.5251C30.7219 27.0864 30.6428 28.3671 30.0008 29.2879C29.6833 29.7431 29.2747 30.1273 28.8007 30.416C27.8421 31 26.559 31 23.9927 31C21.4231 31 20.1383 31 19.179 30.4149C18.7048 30.1257 18.296 29.7408 17.9787 29.2848C17.3369 28.3626 17.2594 27.0801 17.1046 24.5152L16.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M15 14.5H33M28.0557 14.5L27.3731 13.0917C26.9196 12.1563 26.6928 11.6885 26.3017 11.3968C26.215 11.3321 26.1231 11.2745 26.027 11.2247C25.5939 11 25.0741 11 24.0345 11C22.9688 11 22.436 11 21.9957 11.2341C21.8981 11.286 21.805 11.3459 21.7173 11.4132C21.3216 11.7167 21.1006 12.2015 20.6586 13.1713L20.0529 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M21.5 25.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M26.5 25.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Insurance details */}
        <div className="space-y-5">
          {/* Contract and Group Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Contract ID</p>
              <p className="text-sm text-gray-900">{insurance.contractId}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Group Number</p>
              <p className="text-sm text-gray-900">{insurance.groupNumber}</p>
            </div>
          </div>

          {/* Expiration and Relationship */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Expiration Date</p>
              <p className="text-sm text-gray-900">{insurance.expirationDate}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Relationship</p>
              <p className="text-sm text-gray-900">{insurance.relationship}</p>
            </div>
          </div>

          {/* Policy Holder Name */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Policy Holder Name</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">First</p>
                <p className="text-sm text-gray-900">{insurance.firstName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Middle</p>
                <p className="text-sm text-gray-900">{insurance.middleName || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Last</p>
                <p className="text-sm text-gray-900">{insurance.lastName}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-3">Contact Information</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400 mb-1">Contact ID</p>
                <p className="text-sm text-gray-900">{insurance.contactId}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-1">Address</p>
                <p className="text-sm text-gray-900">{insurance.addressLine1}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">City</p>
                  <p className="text-sm text-gray-900">{insurance.city}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">State</p>
                  <p className="text-sm text-gray-900">{insurance.state}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">ZIP</p>
                  <p className="text-sm text-gray-900">{insurance.zip}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Employer</p>
                <p className="text-sm text-gray-900">{insurance.employerName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Sex</p>
                <p className="text-sm text-gray-900">{insurance.sex}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalInformationPage;