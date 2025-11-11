"use client";

import React, { useState } from "react";
import { User, Eye, Edit, Trash2 } from "lucide-react";
import { useInsurance } from "./InsuranceContext";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Card from "@/components/UI/Card";
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
  const insuranceData = {
    insuranceName: "Bluesky",
    contractId: "0987654321",
    groupNumber: "H123456789",
    expirationDate: "31/12/2025",
    relationship: "Father",
    firstName: "Kamal",
    middleName: "Ahmed",
    lastName: "Dune",
    contactId: "0987654321",
    addressLine1: "0987654321",
    city: "Manhattan",
    state: "NYC",
    zip: "00076",
    employerName: "Mahmudcompany",
    sex: "Male",
    dateOfBirth: "31/12/2006",
  }
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

              <div className="flex-1 h-px bg-primary-500 mb-4"></div>

              <div className="flex flex-col justify-center items-center">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="text-sm text-gray-600 font-medium">Step</span>
              </div>

              <div className="flex-1 h-px bg-primary-500 mb-4"></div>

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
                    d="M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h1 className=" ml-3 text-2xl font-semibold text-gray-900">
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
                 <Link href="/add/insurenceform ">
                 
                  <Button className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors font-medium">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4V20" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 12H20" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
 Add Primary Card
                  </Button></Link>
              <div className="w-full flex justify-center">
                <Link href="/add/insurenceform " className="w-full"> <button className="w-full flex items-center justify-center gap-2 border border-primary-500 px-6 py-3 text-[#2E8BC9] rounded-lg hover:bg-action-hover font-medium">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V20" stroke="#2E8BC9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12H20" stroke="#2E8BC9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>Add Other Card</span>
  </button>
                </Link>
 
</div>
                   
               </div> ) : (
                  <Button className="w-full border border-primary-500 px-6 py-3 bg-white text-primary-500 rounded-lg hover:bg-action-hover transition-colors font-medium hover:text-white">
                    + Add Other Card
                  </Button>
                )}
              </Link>
            </div>

          <div className="w-full bg-white rounded-lg shadow-sm border-0 overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Insurance Name</p>
            <p className="text-base font-medium text-gray-900">{insuranceData.insuranceName}</p>
          </div>
          <button className="text-red-400 hover:text-red-500 p-1 h-auto bg-transparent border-none cursor-pointer">
           <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3957_35335)">
<rect x="4" y="1" width="40" height="40" rx="8" fill="#FEF2F2"/>
<path d="M31.5 14.5L30.8803 24.5251C30.7219 27.0864 30.6428 28.3671 30.0008 29.2879C29.6833 29.7431 29.2747 30.1273 28.8007 30.416C27.8421 31 26.559 31 23.9927 31C21.4231 31 20.1383 31 19.179 30.4149C18.7048 30.1257 18.296 29.7408 17.9787 29.2848C17.3369 28.3626 17.2594 27.0801 17.1046 24.5152L16.5 14.5" stroke="#B42121" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M15 14.5H33M28.0557 14.5L27.3731 13.0917C26.9196 12.1563 26.6928 11.6885 26.3017 11.3968C26.215 11.3321 26.1231 11.2745 26.027 11.2247C25.5939 11 25.0741 11 24.0345 11C22.9688 11 22.436 11 21.9957 11.2341C21.8981 11.286 21.805 11.3459 21.7173 11.4132C21.3216 11.7167 21.1006 12.2015 20.6586 13.1713L20.0529 14.5" stroke="#B42121" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M21.5 25.5V19.5" stroke="#B42121" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M26.5 25.5V19.5" stroke="#B42121" strokeWidth="1.5" strokeLinecap="round"/>
</g>
<defs>
<filter id="filter0_d_3957_35335" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3957_35335"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3957_35335" result="shape"/>
</filter>
</defs>
</svg>

          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Contract ID</p>
            <p className="text-sm text-gray-900">{insuranceData.contractId}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Group Number</p>
            <p className="text-sm text-gray-900">{insuranceData.groupNumber}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Expiration Date</p>
            <p className="text-sm text-gray-900">{insuranceData.expirationDate}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Patient Relationship to Policy Holder</p>
            <p className="text-sm text-gray-900">{insuranceData.relationship}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">First Name</p>
              <p className="text-sm text-gray-900">{insuranceData.firstName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Middle Name</p>
              <p className="text-sm text-gray-900">{insuranceData.middleName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Last Name</p>
              <p className="text-sm text-gray-900">{insuranceData.lastName}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Contact ID</p>
            <p className="text-sm text-gray-900">{insuranceData.contactId}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Address Line 1</p>
            <p className="text-sm text-gray-900">{insuranceData.addressLine1}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">City</p>
              <p className="text-sm text-gray-900">{insuranceData.city}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">State</p>
              <p className="text-sm text-gray-900">{insuranceData.state}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">ZIP</p>
              <p className="text-sm text-gray-900">{insuranceData.zip}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Employer Name</p>
            <p className="text-sm text-gray-900">{insuranceData.employerName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Sex</p>
              <p className="text-sm text-gray-900">{insuranceData.sex}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
              <p className="text-sm text-gray-900">{insuranceData.dateOfBirth}</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs text-gray-500 mb-2">Insurance Card</p>
            <button className="flex gap-2 shadow-md px-4 rounded-md py-2 items-center text-[#2E8BC9] hover:text-blue-600 text-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3633 7.36301C14.566 7.64721 14.6673 7.78934 14.6673 7.99967C14.6673 8.21001 14.566 8.35214 14.3633 8.63634C13.4526 9.91341 11.1268 12.6663 8.00065 12.6663C4.8745 12.6663 2.54872 9.91341 1.63801 8.63634C1.43532 8.35214 1.33398 8.21001 1.33398 7.99967C1.33398 7.78934 1.43532 7.64721 1.63801 7.36301C2.54872 6.08597 4.8745 3.33301 8.00065 3.33301C11.1268 3.33301 13.4526 6.08597 14.3633 7.36301Z" stroke="#2E8BC9" strokeWidth="1.5"/>
<path d="M10 8C10 6.8954 9.1046 6 8 6C6.8954 6 6 6.8954 6 8C6 9.1046 6.8954 10 8 10C9.1046 10 10 9.1046 10 8Z" stroke="#2E8BC9" strokeWidth="1.5"/>
</svg>

              View Card
            </button>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Digital Signature</p>
            <button className="flex gap-2 shadow-md px-4 rounded-md py-2 items-center text-[#2E8BC9] hover:text-blue-600 text-sm">
             <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3633 7.36301C14.566 7.64721 14.6673 7.78934 14.6673 7.99967C14.6673 8.21001 14.566 8.35214 14.3633 8.63634C13.4526 9.91341 11.1268 12.6663 8.00065 12.6663C4.8745 12.6663 2.54872 9.91341 1.63801 8.63634C1.43532 8.35214 1.33398 8.21001 1.33398 7.99967C1.33398 7.78934 1.43532 7.64721 1.63801 7.36301C2.54872 6.08597 4.8745 3.33301 8.00065 3.33301C11.1268 3.33301 13.4526 6.08597 14.3633 7.36301Z" stroke="#2E8BC9" strokeWidth="1.5"/>
<path d="M10 8C10 6.8954 9.1046 6 8 6C6.8954 6 6 6.8954 6 8C6 9.1046 6.8954 10 8 10C9.1046 10 10 9.1046 10 8Z" stroke="#2E8BC9" strokeWidth="1.5"/>
</svg>

              View Signature
            </button>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Draw Signature</p>
            <div className="bg-white shadow-md text-center rounded p-3 min-h-[60px] flex items-center">
              <div className="text-lg text-gray-800" style={{ fontFamily: "cursive", transform: "rotate(-2deg)" }}>
             <svg width="229" height="69" viewBox="0 0 229 69" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.24414 67.1554C3.28759 62.9655 4.66494 54.5043 9.18306 41.7176C11.5347 35.0623 14.7446 29.7815 15.9811 22.5375C16.7881 17.8096 17.1967 44.5229 18.0628 46.3282C18.5127 47.2661 19.2732 48.1336 19.9723 47.9979C26.8612 46.6603 23.447 33.6908 25.1948 28.5643C26.8275 23.7753 31.4502 18.6146 33.1876 14.5469C34.591 23.8903 35.9684 52.3506 37.7161 56.2825C38.0657 57.192 38.41 58.0879 38.7648 59.0109" stroke="#292929" strokeWidth="3" strokeLinecap="round"/>
<path d="M55.6526 41.8076C56.4609 41.4204 57.3901 41.0647 58.4007 40.7439C58.4774 39.1503 58.9878 37.5262 59.6438 37.7444C60.4667 38.0181 61.7138 38.7065 62.5587 39.6992C63.1387 40.3806 63.5292 41.2054 63.4628 42.1379C63.2606 44.9757 63.9946 48.7633 63.464 52.3064C63.0362 55.1638 61.7858 57.8623 58.5586 59.7751C56.7952 60.8203 54.0192 60.9568 52.1309 60.6664C49.1884 60.214 46.4393 59.6043 45.5416 57.4811C45.0251 56.2594 44.6591 54.4005 45.2025 52.9564C47.1328 47.8254 51.1259 43.9755 55.6526 41.8076Z" fill="white"/>
<path d="M75.285 39.1018C70.4539 38.1969 60.6976 39.3914 55.6526 41.8076C51.1259 43.9755 47.1328 47.8254 45.2025 52.9564C44.6591 54.4005 45.0251 56.2594 45.5416 57.4811C46.4393 59.6043 49.1884 60.214 52.1309 60.6664C54.0192 60.9568 56.7952 60.8203 58.5586 59.7751C65.7874 55.4905 63.0976 47.2643 63.4628 42.1379C63.626 39.8471 61.0315 38.2059 59.6438 37.7444C58.8408 37.4774 58.256 39.9705 58.4177 41.7895C59.0838 49.2807 64.4958 53.5627 67.9653 56.1372C69.0139 56.5942 70.0469 56.8928 71.0956 57.3453C72.1443 57.7978 73.1773 58.395 75.285 59.9153" stroke="#292929" strokeWidth="3" strokeLinecap="round"/>
<path d="M84.676 11.9551C80.857 15.8554 79.4588 22.4885 78.5927 28.6738C77.9388 33.3443 77.3719 54.3061 78.238 59.7855C79.0745 65.0784 81.1909 50.2882 83.9665 45.3065C85.7443 42.1156 88.1507 40.0172 89.8776 38.6598C90.9753 37.7969 93.6705 38.1982 95.2566 38.7955C98.0752 39.8569 98.2408 46.8947 98.2408 53.0935C98.2408 54.2156 98.2408 51.2293 98.413 49.243C98.5852 47.2566 98.9295 46.3608 99.2843 45.4377" stroke="#292929" strokeWidth="3" strokeLinecap="round"/>
<path d="M131.115 51.731C131.565 46.2084 130.818 40.6516 129.705 36.972C128.719 39.4212 127.741 44.4575 129.033 50.2921C129.566 52.6947 130.96 53.639 131.115 51.731Z" fill="white"/>
<path d="M108.676 35.4828C109.364 41.5006 110.763 49.3102 110.591 56.1018C110.473 60.746 111.097 40.0256 114.227 36.252C115.165 35.1214 116.648 33.9987 118.907 33.3834C121.166 32.768 124.265 32.768 126.206 33.2159C128.147 33.6639 128.835 34.5598 129.19 35.4692C130.57 39.0078 131.632 45.3919 131.115 51.731C130.96 53.639 129.566 52.6947 129.033 50.2921C127.663 44.1035 128.846 38.813 129.884 36.5552C130.406 35.4203 131.611 34.596 133.348 34.1345C135.085 33.6729 137.496 33.6729 139.426 34.1209C141.357 34.5688 142.734 35.4647 143.616 36.8221C145.196 45.6995 145.885 55.6719 146.929 59.2872C147.283 60.812 147.283 61.7079 147.283 62.6309" stroke="#292929" strokeWidth="3" strokeLinecap="round"/>
<path d="M153.543 34.5774C153.543 39.9889 155.609 47.8076 157.712 53.4136C158.106 54.4651 158.405 55.3728 160.305 55.8343C162.204 56.2959 165.647 56.2959 167.765 55.2507C169.883 54.2055 170.572 52.1151 170.927 47.3053C171.282 42.4956 171.282 35.0299 171.282 27.3379" stroke="#292929" strokeWidth="3" strokeLinecap="round"/>
<path d="M200.499 2C200.499 15.8003 201.187 35.1388 203.274 42.3964C204.801 47.7061 204.672 51.7625 204.156 52.8212C202.435 56.3486 197.389 44.8578 194.076 40.7765C192.222 38.4921 189.386 36.3966 185.572 35.0392C183.575 34.3284 181.07 34.5777 179.484 35.0257C176.867 35.7648 176.155 38.1884 175.633 40.4417C174.142 46.8844 181.696 52.3507 186.219 55.0836C191.112 58.0395 200.436 56.2962 210.031 53.2963C212.3 52.0882 214.71 50.5951 217.502 49.2286C220.293 47.8622 223.392 46.6677 226.585 45.437" stroke="#292929" strokeWidth="3" strokeLinecap="round"/>
</svg>

              </div>
            </div>
          </div>

          <div className="pt-3">
  <button className="w-full bg-white shadow-md  text-[#2E8BC9] text-sm py-2 px-4 rounded-md flex items-center justify-center gap-2">
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <path 
        d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M13 4L20 11" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
      <path 
        d="M14 22H22" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
    <span>Edit Details</span>
  </button>
</div>
        </div>
      </div>
    </div>

            <form onSubmit={handleSubmit} className="mt-8">
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Link href="/medical-info">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center px-6 py-3 shadow-md text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                </Link>
                <Link href="/patients">
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors"
                  >
                    Save
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

export default MedicalInformationPage;
