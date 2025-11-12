// app/doctor/details/[id]/page.tsx
'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useGetDoctorByIdQuery, Doctor } from '@/redux/features/doctor/doctorApi';

const FirebaseMap = dynamic(() => import("../FirebaseMap"), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

interface Position {
  lat: number;
  lng: number;
}

// Helper function to format qualifications
const formatQualifications = (qualifications: Array<{ [key: string]: string }> | string[] | undefined): string[] => {
  if (!qualifications || !Array.isArray(qualifications)) {
    return ["MD - Doctor of Medicine", "FACC - Fellow of the American College of Cardiology"];
  }

  return qualifications.map(qual => {
    if (typeof qual === 'string') {
      // Handle string qualifications
      if (qual === 'MD') return 'MD - Doctor of Medicine';
      if (qual === 'FACC') return 'FACC - Fellow of the American College of Cardiology';
      if (qual === 'MBBS') return 'MBBS - Bachelor of Medicine, Bachelor of Surgery';
      return qual;
    } else {
      // Handle object qualifications
      const values = Object.values(qual);
      if (values.length > 0) {
        const qualificationString = values.join('');
        if (qualificationString === 'MD') return 'MD - Doctor of Medicine';
        if (qualificationString === 'FACC') return 'FACC - Fellow of the American College of Cardiology';
        if (qualificationString === 'MBBS') return 'MBBS - Bachelor of Medicine, Bachelor of Surgery';
        return qualificationString;
      }
    }
    return "Qualification";
  });
};

// Helper function to build profile picture URL
const getProfilePictureUrl = (profilePicture: string | undefined): string => {
  if (!profilePicture) {
    return "/maleDoctor.png";
  }
  
  // Clean up the path - remove double slashes and ensure proper formatting
  const cleanPath = profilePicture.replace(/\/\//g, '/');
  
  // Check if it's already a full URL
  if (cleanPath.startsWith('http')) {
    return cleanPath;
  }
  
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}/${cleanPath}`;
};

export default function DoctorDetails() {
  const params = useParams();
  const doctorId = params.id as string;

  const { data: doctorData, isLoading, error } = useGetDoctorByIdQuery(doctorId);

  // Get initial position for map
  const getInitialPosition = (): Position => {
    if (doctorData?.googleMapUrl && doctorData.googleMapUrl.length > 0) {
      try {
        const url = doctorData.googleMapUrl[0];
        
        // Try multiple methods to extract coordinates
        // Method 1: Direct coordinates in URL (q=lat,lng)
        const coordMatch = url.match(/q=([0-9.-]+),([0-9.-]+)/);
        if (coordMatch) {
          return { 
            lat: parseFloat(coordMatch[1]), 
            lng: parseFloat(coordMatch[2]) 
          };
        }
        
        // Method 2: @lat,lng format
        const atCoordMatch = url.match(/@([0-9.-]+),([0-9.-]+)/);
        if (atCoordMatch) {
          return { 
            lat: parseFloat(atCoordMatch[1]), 
            lng: parseFloat(atCoordMatch[2]) 
          };
        }
        
        // Method 3: ll=lat,lng format
        const llCoordMatch = url.match(/ll=([0-9.-]+),([0-9.-]+)/);
        if (llCoordMatch) {
          return { 
            lat: parseFloat(llCoordMatch[1]), 
            lng: parseFloat(llCoordMatch[2]) 
          };
        }
        
        console.warn("Could not parse coordinates from URL:", url);
      } catch (e) {
        console.warn("Error parsing coordinates from URL:", e);
      }
    }
    
    // Default fallback coordinates (can be any location)
    return { lat: 40.7128, lng: -74.0060 }; // New York coordinates as fallback
  };

  // Format qualifications for display
  const formattedQualifications = formatQualifications(doctorData?.qualifications);

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
    console.error("Error loading doctor:", error);
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
              src={getProfilePictureUrl(doctorData.profilePicture)}
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
              <p className="text-gray-600 break-all">{doctorData.email || "pe.a.chv.i.t.a.l@gmail.com"}</p>
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
            <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
            <FirebaseMap 
              doctorId={doctorId}
              initialPosition={getInitialPosition()}
            />
          </div>

          {/* Google Maps Link */}
          {doctorData.googleMapUrl && doctorData.googleMapUrl.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Google Maps</h3>
              <div className="space-y-2">
                {doctorData.googleMapUrl.map((url, index) => (
                  <a 
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 underline text-sm"
                  >
                    View on Google Maps {doctorData.googleMapUrl && doctorData.googleMapUrl.length > 1 ? `#${index + 1}` : ''}
                  </a>
                ))}
              </div>
            </div>
          )}

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
              {formattedQualifications.map((qualification, index) => (
                <div key={index}>
                  <p className="text-gray-900 font-medium">{qualification}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              doctorData.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {doctorData.status || 'active'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}