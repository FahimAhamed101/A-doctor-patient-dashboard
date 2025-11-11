// app/doctor/details/[id]/page.tsx
'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useGetDoctorByIdQuery } from '@/redux/features/doctor/doctorApi';

const FirebaseMap = dynamic(() => import("../FirebaseMap"), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

// Define TypeScript interfaces for our data structures
interface DoctorData {
  _id?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  clinicName?: string;
  officeLocation?: string[];
  popularReasonsToVisit?: string[];
  qualifications?: string[];
  discipline?: string;
  profilePicture?: string;
  status?: string;
  googleMapUrl?: string[];
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

interface Position {
  lat: number;
  lng: number;
}

export default function DoctorDetails() {
  const params = useParams();
  const doctorId = params.id as string;

  // Use RTK Query to fetch doctor data
  const { data: doctorResponse, isLoading, error } = useGetDoctorByIdQuery(doctorId);

  const doctorData: DoctorData = doctorResponse?.data || {};

  // Get initial position for map
  const getInitialPosition = (): Position => {
    if (doctorData.googleMapUrl && doctorData.googleMapUrl.length > 0) {
      try {
        const url = doctorData.googleMapUrl[0];
        const coordMatch = url.match(/q=([0-9.-]+),([0-9.-]+)/);
        if (coordMatch) {
          return { 
            lat: parseFloat(coordMatch[1]), 
            lng: parseFloat(coordMatch[2]) 
          };
        }
      } catch (e) {
        console.warn("Could not parse coordinates from URL:", e);
      }
    }
    return { lat: 0, lng: 0 };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading doctor profile</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!doctorData || !doctorId) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Doctor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-teal-500">
            <Image
              src={doctorData.profilePicture ? 
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/${doctorData.profilePicture.replace(/\\/g, '/')}` 
                : "/maleDoctor.png"
              }
              alt={doctorData.fullName || "Doctor"}
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/maleDoctor.png";
              }}
            />
          </div>
        </div>

        {/* Information Grid */}
        <div className="space-y-6">
          {/* Name and Discipline Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Name</h3>
              <p className="text-gray-900">{doctorData.fullName || "Dr. Jane Smith"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Discipline</h3>
              <p className="text-gray-900">{doctorData.discipline || "Cardiology"}</p>
            </div>
          </div>

          {/* Email and Mobile Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Email</h3>
              <p className="text-gray-600">{doctorData.email || "pe.a.chv.i.t.a.l@gmail.com"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Mobile</h3>
              <p className="text-gray-600">{doctorData.mobile || "1234567890"}</p>
            </div>
          </div>

          {/* Clinic Name */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Clinic Name</h3>
            <p className="text-gray-900">{doctorData.clinicName || "Heart Care Clinic"}</p>
          </div>

          {/* Office Location */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Office Location</h3>
            <div className="space-y-2">
              {doctorData.officeLocation && doctorData.officeLocation.length > 0 ? (
                doctorData.officeLocation.map((location, index) => (
                  <p key={index} className="text-gray-600 text-sm">
                    {location}
                  </p>
                ))
              ) : (
                <p className="text-gray-600">No office locations available</p>
              )}
            </div>
          </div>

          {/* Firebase Map */}
          <div className="space-y-2">
            <FirebaseMap 
              doctorId={doctorId}
              initialPosition={getInitialPosition()}
            />
          </div>

          {/* Popular Reasons To Visit */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Reasons To Visit</h3>
            <div className="flex flex-wrap gap-2">
              {doctorData.popularReasonsToVisit && doctorData.popularReasonsToVisit.length > 0 ? (
                doctorData.popularReasonsToVisit.map((reason, index) => (
                  <span 
                    key={index}
                    className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {reason}
                  </span>
                ))
              ) : (
                <p className="text-gray-600">No popular reasons specified</p>
              )}
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Qualifications</h3>
            <div className="space-y-2">
              {doctorData.qualifications && doctorData.qualifications.length > 0 ? (
                doctorData.qualifications.map((qualification, index) => (
                  <div key={index}>
                    <p className="text-gray-900 font-medium">{qualification}</p>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-900 font-medium">MD - Doctor of Medicine</p>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">FACC - Fellow of the American College of Cardiology</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}