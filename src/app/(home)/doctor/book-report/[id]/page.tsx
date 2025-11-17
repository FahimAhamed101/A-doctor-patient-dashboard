// app/doctor/book-overview/[id]/page.tsx
'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetAppointmentDetailsQuery, useConfirmAppointmentMutation } from '@/redux/features/appointments/appointmentsApi';
import Image from "next/image";
import Link from "next/link";

interface Medication {
  name: string;
  dosage: string;
  _id: string;
}

interface Document {
  fileName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}

interface Appointment {
  _id: string;
  patientId: string;
  doctorId: {
    _id: string;
    fullName: string;
    discipline: string;
    profilePicture?: string;
    officeLocation?: string[];
    clinicName?: string;
  };
  dateTime: string;
  visitReason: string;
  visitType: string;
  insurance?: string;
  insuranceId?: string;
  symptoms: string[];
  summary: string;
  documents: Document[];
  currentMedications: Medication[];
  priorDiagnoses: string[];
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'booked' | 'confirmed';
  createdAt: string;
  updatedAt: string;
  checkInTime?: string;
}

// Add API response interface
interface AppointmentApiResponse {
  data?: Appointment;
  success?: boolean;
  message?: string;
}

export default function AppointmentSummary() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.id as string;

  const { 
    data: appointmentResponse, 
    isLoading: appointmentLoading, 
    error: appointmentError,
    refetch: refetchAppointment,
  } = useGetAppointmentDetailsQuery(appointmentId);

  const [confirmAppointment, { isLoading: isConfirming }] = useConfirmAppointmentMutation();

  // Fix: Properly handle the API response structure
  const appointment: Appointment | undefined = (appointmentResponse as AppointmentApiResponse)?.data || appointmentResponse as Appointment;

  // Helper function to build profile picture URL
  const getProfilePictureUrl = (profilePicture: string | undefined): string => {
    if (!profilePicture) {
      return "/maleDoctor.png";
    }
    
    const cleanPath = profilePicture.replace(/\/\//g, '/');
    
    if (cleanPath.startsWith('http')) {
      return cleanPath;
    }
    
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/${normalizedPath}`;
  };

  // Format date for display
  const formatDisplayDate = (dateTimeString: string) => {
    if (!dateTimeString) return 'Not set';
    
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatDisplayTime = (dateTimeString: string) => {
    if (!dateTimeString) return 'Not set';
    
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get insurance display text - handle both insurance and insuranceId fields
  const getInsuranceDisplay = () => {
    if (!appointment) return 'Not selected';
    
    // Check both possible field names
    const insuranceValue = appointment.insurance || appointment.insuranceId;
    
    if (!insuranceValue) return 'Not selected';
    
    // Map insurance IDs to display names
    const insuranceMap: { [key: string]: string } = {
      '690e67b3623d8707c3089e4d': 'Blue Cross Blue Shield',
      '68dd9f09ef6164b7d89d8234': 'Aetna',
      // Add more mappings as needed
    };
    
    return insuranceMap[insuranceValue] || insuranceValue;
  };

  // Handle confirm appointment
  const handleConfirmAppointment = async () => {
    if (!appointmentId) {
      alert('Appointment ID is missing');
      return;
    }

    try {
      console.log('Confirming appointment:', appointmentId);
      
      const result = await confirmAppointment(appointmentId).unwrap();
      
      console.log('✅ Appointment confirmed:', result);
      
      if (result.success) {
        alert('Appointment confirmed successfully!');
        // Refetch the appointment details to update the status
        await refetchAppointment();
        // Optionally redirect to a confirmation page or back to appointments
        router.push('/book-confirm');
      } else {
        throw new Error(result.message || 'Confirmation failed');
      }
      
    } catch (error: any) {
      console.error('❌ Confirmation failed:', error);
      
      if (error.status === 404) {
        alert('Appointment not found. Please check the appointment ID.');
      } else if (error.status === 400) {
        alert(`Invalid request: ${error.data?.message || 'Please try again'}`);
      } else if (error.status === 500) {
        alert('Server error. Please try again later or contact support.');
      } else {
        alert(`Confirmation failed: ${error.data?.message || error.message || 'Unknown error'}`);
      }
    }
  };

  // Loading state
  if (appointmentLoading) {
    return (
      <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (appointmentError || !appointment) {
    console.error('Appointment error:', appointmentError);
    console.error('Appointment data:', appointmentResponse);
    
    return (
      <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Appointment not found or failed to load</p>
          <p className="text-sm text-gray-500 mt-2">
            {appointmentError ? `Error: ${JSON.stringify(appointmentError)}` : 'No appointment data available'}
          </p>
          <Link href="/doctor-search" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  const doctor = appointment.doctorId;

  return (
    <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-none border-0">
        <div className="p-4 space-y-6">
          {/* Appointment Status Badge */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src={getProfilePictureUrl(doctor.profilePicture)}
                alt={doctor.fullName}
                width={100}
                height={100}
                className="rounded-full border-2 border-gray-200 w-20 h-20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/maleDoctor.png";
                }}
              />
              <div>
                <h2 className="font-semibold text-gray-900">{doctor.fullName}</h2>
                <p className="text-sm text-gray-600">{doctor.discipline}</p>
                <p className="text-xs text-gray-500 flex items-center">
                  <span className="mr-1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.33268 1.33398C5.20307 1.33398 2.66602 3.74587 2.66602 6.72112C2.66602 8.42232 3.37435 9.74512 4.79102 10.9267C5.78956 11.7595 6.99928 13.1427 7.72555 14.2641C8.07388 14.8017 8.56648 14.8017 8.93982 14.2641C9.70288 13.1651 10.8758 11.7595 11.8743 10.9267C13.291 9.74512 13.9993 8.42232 13.9993 6.72112C13.9993 3.74587 11.4623 1.33398 8.33268 1.33398Z" stroke="#3D75E6" strokeLinejoin="round"/>
                      <path d="M7 4.66602V6.66602M7 6.66602V8.66602M7 6.66602H9.66667M9.66667 4.66602V6.66602M9.66667 6.66602V8.66602" stroke="#3D75E6" strokeLinecap="round"/>
                    </svg>
                  </span>
                  {doctor.officeLocation?.[0] || doctor.clinicName || "Sylhet Health Center"}
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              appointment.status === 'booked' || appointment.status === 'scheduled' 
                ? 'bg-green-100 text-green-800' 
                : appointment.status === 'completed' 
                ? 'bg-blue-100 text-blue-800'
                : appointment.status === 'cancelled'
                ? 'bg-red-100 text-red-800'
                : appointment.status === 'confirmed'
                ? 'bg-purple-100 text-purple-800'
                : appointment.status === 'no-show'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Appointment Date & Time</h3>
            <div className="flex items-center justify-between h-10 border-b-2 border-[#DCDCDC]">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formatDisplayDate(appointment.dateTime)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {formatDisplayTime(appointment.dateTime)}
              </div>
            </div>
          </div>

          {/* Visit Reason */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Visit Reason</h3>
            <p className="text-sm text-gray-600 shadow-md p-2 rounded-md min-h-[40px]">
              {appointment.visitReason || 'Not provided'}
            </p>
          </div>

          {/* Visit Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Visit Type</h3>
            <p className="text-sm text-gray-600 shadow-md p-2 rounded-md">
              {appointment.visitType}
            </p>
          </div>

          {/* Insurance - FIXED */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Insurance</h3>
            <p className="text-sm text-gray-600 shadow-md p-2 rounded-md">
              {getInsuranceDisplay()}
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Documentation</h3>
            {appointment.documents.length > 0 ? (
              <div className="space-y-2">
                {appointment.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 shadow-md p-2 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600 flex-1">{doc.fileName}</span>
                    <span className="text-xs text-gray-400">
                      {formatFileSize(doc.sizeBytes)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 shadow-md p-2 rounded-md">No documents uploaded</p>
            )}
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
            <div className="text-sm text-gray-600 shadow-md p-2 rounded-md min-h-[60px]">
              {appointment.summary || 'Not provided'}
            </div>
          </div>

          {/* Current Medications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Medications</h3>
            {appointment.currentMedications.length > 0 ? (
              <div className="space-y-2 shadow-md p-2 rounded-md">
                {/* Header */}
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 font-medium">
                  <span>Name</span>
                  <span>Dosage</span>
                  <span>Status</span>
                </div>

                {/* Medications List */}
                {appointment.currentMedications.map((medication, index) => (
                  <div key={medication._id} className="grid grid-cols-3 gap-4 items-center py-2">
                    <span className="text-sm text-gray-700">{medication.name}</span>
                    <span className="text-sm text-gray-600">{medication.dosage}</span>
                    <span className="text-xs text-green-600 font-medium">Added</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 shadow-md p-2 rounded-md">No medications added</p>
            )}
          </div>

          {/* Prior Diagnoses */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Prior Diagnoses <span className="text-gray-400 font-normal">(Optional)</span>
            </h3>
            {appointment.priorDiagnoses.filter(d => d.trim()).length > 0 ? (
              <div className="space-y-2">
                {appointment.priorDiagnoses.filter(d => d.trim()).map((diagnosis, index) => (
                  <p key={index} className="text-xs text-gray-500 leading-relaxed shadow-md p-2 rounded-md">
                    {diagnosis}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 shadow-md p-2 rounded-md">No prior diagnoses provided</p>
            )}
          </div>

          {/* Symptoms */}
          {appointment.symptoms && appointment.symptoms.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {appointment.symptoms.map((symptom, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link
              href="/my-appointments"
              className="flex-1 border border-[#2E8BC9] text-[#2E8BC9] hover:bg-blue-50 font-medium py-3 rounded-md transition-colors duration-200 text-center"
            >
              Back to Appointments
            </Link>
            
            {(appointment.status === 'booked') && (
              <button
                onClick={handleConfirmAppointment}
                disabled={isConfirming}
                className="flex-1 bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium py-3 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isConfirming ? 'Confirming...' : 'Confirm'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}