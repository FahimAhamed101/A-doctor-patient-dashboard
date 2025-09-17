"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AppointmentForm() {
  const [visitType, setVisitType] = useState("new-patient");
  const [insurance, setInsurance] = useState("bluesky");
 const [progress, setProgress] = useState(15)
  const [autoProgress, setAutoProgress] = useState(true);
  useEffect(() => {
    if (!autoProgress) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [autoProgress])

 

  return (
    <div className="w-full max-w-2/4 mx-auto bg-white rounded-lg shadow-sm p-5 space-y-5">
      {/* Visit Reason */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Visit Reason</label>
        <input
          type="text"
          value="I need a cleaning"
          readOnly
          className="w-full h-10 px-3 py-2 text-sm shadow-md rounded-md focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Visit Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Visit Type</label>
        <select
          value={visitType}
          onChange={(e) => setVisitType(e.target.value)}
          className="w-full h-10 px-3 py-2 text-sm shadow-md rounded-md focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="new-patient">New Patient Visit</option>
          <option value="follow-up">Follow-up Visit</option>
          <option value="consultation">Consultation</option>
        </select>
      </div>

      {/* Select Insurance */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Select Insurance</label>
        <select
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          className="w-full h-10 px-3 py-2 text-sm shadow-md rounded-md focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="bluesky">BlueSky</option>
          <option value="healthfirst">HealthFirst</option>
          <option value="medicare">MediCare</option>
        </select>
      </div>

      {/* What Are You Experiencing */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">What Are You Experiencing?</label>
        <div className="relative">
          <input
            placeholder="Talk to us or write it"
            className="w-full  p-3  text-sm shadow-md rounded-md focus:border-blue-500 focus:ring-blue-500 pr-10 resize-none"
          />
          <button
            type="button"
            className="absolute right-2 top-2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <label className="text-sm font-medium  text-gray-700">Summary</label>
        <div className="text-sm shadow-md px-1 py-2 rounded-md">
          <div className="text-gray-900 mb-1">Problem</div>
          <div className="ml-4 text-gray-600">• head</div>
        </div>
      </div>

      {/* Documentation */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Documentation</label>

        {/* File 1 */}
        <div className="flex items-center justify-between p-3 shadow-md rounded-lg ">
          <div className="flex items-center space-x-3">
           
            <div>
              <div className="text-sm font-medium text-gray-900">doc 1.pdf</div>
              <div className="text-xs text-gray-500">30.4kb</div>
            </div>
          </div>
          <button type="button" className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>

     {/* File 2 with Progress */}
<div className="p-3 bg-white shadow-md rounded-lg ">
  <div className="flex items-center justify-between mb-2">
    <div>
      <div className="text-sm font-medium text-gray-900">doc 2.pdf</div>
      <div className="text-xs text-gray-500">25.6kb</div>
    </div>
    <button 
      type="button" 
      className="text-gray-400 hover:text-red-500 p-1"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-1.5">
    <div
      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${Math.min(progress, 70)}%` }}
    />
  </div>
</div>

        {/* Add File Button */}
        <button
          type="button"
          className=" shadow-md flex items-center justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-10 px-3 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add File
        </button>
      </div>

      {/* Current Medication */}
      <div className="space-y-2">
        <div className="">
          <label className="text-sm font-medium text-gray-700">Current Medication</label>
          <button
            type="button"
            className="text-blue-600 shadow-md hover:text-blue-700 h-auto p-2 rounded-md hover:bg-transparent text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-1">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Share
          </button>
        </div>
      </div>

      {/* Prior Diagnoses */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Prior Diagnoses <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <p className="text-xs text-gray-500 leading-relaxed">
          Patient's medical history includes previous surgeries, allergies to penicillin, and a family history of
          diabetes. Current concerns involve persistent headaches and occasional dizziness.
        </p>
      </div>

      {/* Doctor Information Card */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <div className="flex items-start space-x-3 mb-4">
          <div className="h-12 w-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-medium">
            MM
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">Dr. Moule Marik</h3>
            <p className="text-sm text-gray-600">Cardiology</p>
            <p className="text-sm text-gray-500">Sylhet Health Center</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-400">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            May 16, 2025
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-gray-400">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            10:30 PM
          </div>
        </div>
      </div>

      {/* View Overview Button */}
      <Link href="/doctor/book-overview">
        <button
        type="button"
        className="w-full bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white h-12 text-sm font-medium rounded-lg px-4 py-2"
      >
        View Overview
      </button>
      </Link>
    
    </div>
  )
}