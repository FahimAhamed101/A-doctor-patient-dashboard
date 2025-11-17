// app/doctor/book-overview/[id]/page.tsx
'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetDoctorByIdQuery } from '@/redux/features/doctor/doctorApi';
import { useBookAppointmentMutation } from '@/redux/features/appointments/appointmentsApi';
import Image from "next/image";
import Link from "next/link";

interface Medication {
  name: string;
  dosage: string;
}

// Updated interface to match the actual API response
interface Doctor {
  _id: string;
  fullName: string;
  email?: string; // Made optional to match API
  status?: string; // Made optional
  mobile?: string; // Made optional
  discipline: string;
  clinicName?: string; // Made optional
  officeLocation: string[];
  profilePicture?: string;
  qualifications?: Array<{ // Made optional
    degree: string;
    university: string;
  }>;
  popularReasonsToVisit?: string[]; // Made optional
  googleMapUrl?: string[]; // Made optional
  insuranceInfo?: Array<{ // Added insurance info
    id: string;
    insuranceName: string;
  }>;
  createdAt?: string; // Made optional
  updatedAt?: string; // Made optional
}

export default function BookOverview() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;

  const { 
    data: doctorResponse, 
    isLoading: doctorLoading, 
    error: doctorError,
  } = useGetDoctorByIdQuery(doctorId);
  
  const [bookAppointment, { isLoading: isBooking }] = useBookAppointmentMutation();

  // Use type assertion or handle undefined case
  const doctor: Doctor | undefined = doctorResponse as Doctor | undefined;

  // Form state
  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().slice(0, 16),
    visitReason: '',
    visitType: 'In-person',
    insuranceId: '',
    summary: '',
    documents: [] as File[],
    currentMedications: [] as Medication[],
    priorDiagnoses: [''],
  });

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle medications
  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const newMedications = [...formData.currentMedications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setFormData(prev => ({ ...prev, currentMedications: newMedications }));
  };

  const addMedication = () => {
    setFormData(prev => ({ 
      ...prev, 
      currentMedications: [...prev.currentMedications, { name: '', dosage: '' }] 
    }));
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      currentMedications: prev.currentMedications.filter((_, i) => i !== index) 
    }));
  };

  // Handle diagnoses
  const handleDiagnosisChange = (index: number, value: string) => {
    const newDiagnoses = [...formData.priorDiagnoses];
    newDiagnoses[index] = value;
    setFormData(prev => ({ ...prev, priorDiagnoses: newDiagnoses }));
  };

  const addDiagnosis = () => {
    setFormData(prev => ({ ...prev, priorDiagnoses: [...prev.priorDiagnoses, ''] }));
  };

  const removeDiagnosis = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      priorDiagnoses: prev.priorDiagnoses.filter((_, i) => i !== index) 
    }));
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      documents: prev.documents.filter((_, i) => i !== index) 
    }));
  };

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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!doctor) {
      alert('Doctor information is not available. Please try again.');
      return;
    }

    // Validate required fields
    if (!formData.dateTime || !formData.visitReason || !formData.visitType || !formData.summary) {
      alert('Please fill in all required fields (Date & Time, Visit Reason, Visit Type, and Summary)');
      return;
    }

    // Set default insurance if none selected but doctor has insurance options
    let insuranceId = formData.insuranceId;
    if (!insuranceId && doctor.insuranceInfo && doctor.insuranceInfo.length > 0) {
      insuranceId = doctor.insuranceInfo[0].id;
    }
    
    try {
      const formDataToSend = new FormData();
      
      // Add all required fields
      formDataToSend.append('doctorId', doctorId);
      
      // Convert datetime-local to ISO 8601
      const isoDateTime = new Date(formData.dateTime).toISOString();
      formDataToSend.append('dateTime', isoDateTime);
      
      formDataToSend.append('visitReason', formData.visitReason);
      formDataToSend.append('visitType', formData.visitType);
      formDataToSend.append('insuranceId', insuranceId);
      formDataToSend.append('summary', formData.summary);
      
      // Append documents (if any)
      formData.documents.forEach(file => {
        formDataToSend.append('documents', file);
      });
      
      // Handle medications
      const filteredMedications = formData.currentMedications.filter(
        m => m.name.trim() && m.dosage.trim()
      );
      formDataToSend.append('currentMedications', JSON.stringify(filteredMedications));
      
      // Handle diagnoses
      const filteredDiagnoses = formData.priorDiagnoses.filter(d => d.trim());
      formDataToSend.append('priorDiagnoses', JSON.stringify(filteredDiagnoses));

      // Debug log
      console.log('=== BOOKING APPOINTMENT ===');
      console.log('Doctor ID:', doctorId);
      console.log('Date/Time (original):', formData.dateTime);
      console.log('Date/Time (ISO):', isoDateTime);
      console.log('Visit Reason:', formData.visitReason);
      console.log('Visit Type:', formData.visitType);
      console.log('Insurance ID:', insuranceId);
      console.log('Summary:', formData.summary);
      console.log('Documents:', formData.documents.length);
      console.log('Medications:', JSON.stringify(filteredMedications));
      console.log('Diagnoses:', JSON.stringify(filteredDiagnoses));
      
      console.log('\n📤 Sending to API...');
      const result = await bookAppointment(formDataToSend).unwrap();
      
      console.log('✅ SUCCESS:', result);
      
      if (result.success && result.data?._id) {
        alert('Appointment booked successfully!');
        router.push(`/doctor/book-report/${result.data._id}`);
      } else {
        throw new Error(result.message || 'Booking failed');
      }
      
    } catch (error: any) {
      console.error('❌ BOOKING FAILED:', error);
      console.error('Error status:', error.status);
      console.error('Error data:', error.data);
      
      // Handle specific error cases
      if (error.status === 409) {
        alert('This time slot is already booked. Please choose a different date and time.');
        
        // Auto-suggest next available time (30 minutes later)
        const currentDateTime = new Date(formData.dateTime);
        const nextAvailable = new Date(currentDateTime.getTime() + 30 * 60000);
        
        setFormData(prev => ({
          ...prev,
          dateTime: nextAvailable.toISOString().slice(0, 16)
        }));
      } else if (error.status === 400) {
        alert(`Invalid data: ${error.data?.message || 'Please check all fields'}`);
      } else if (error.status === 500) {
        alert('Server error. Please try again later or contact support.');
      } else {
        alert(`Booking failed: ${error.data?.message || error.message || 'Unknown error'}`);
      }
    }
  };

  if (doctorLoading) {
    return (
      <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (doctorError || !doctor) {
    return (
      <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Doctor not found</p>
          <Link href="/doctor-search" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-none border-0">
        <div className="p-4 space-y-6">
          {/* Doctor Info */}
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
                {doctor.officeLocation?.[0] || "Sylhet Health Center"}
              </p>
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Appointment Date & Time *</h3>
            <div className="flex items-center justify-between h-10 border-b-2 border-[#DCDCDC]">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input
                  type="datetime-local"
                  required
                  value={formData.dateTime}
                  onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  className="border-none focus:outline-none text-sm text-gray-600 bg-transparent"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>
          </div>

          {/* Visit Reason */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Visit Reason *</h3>
            <textarea
              required
              value={formData.visitReason}
              onChange={(e) => handleInputChange('visitReason', e.target.value)}
              className="w-full text-sm text-gray-600 shadow-md p-2 rounded-md border-none focus:outline-none focus:ring-0"
              placeholder="I need a cleaning"
              rows={2}
            />
          </div>

          {/* Select Insurance */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Insurance</h3>
            <select
              value={formData.insuranceId}
              onChange={(e) => handleInputChange('insuranceId', e.target.value)}
              className="w-full text-sm text-gray-600 shadow-md p-2 rounded-md border-none focus:outline-none focus:ring-0"
            >
              <option value="">Select an insurance</option>
              {doctor.insuranceInfo?.map((insurance) => (
                <option key={insurance.id} value={insurance.id}>
                  {insurance.insuranceName}
                </option>
              ))}
            </select>
            {doctor.insuranceInfo?.length === 0 && (
              <p className="text-xs text-red-500 mt-1">
                This doctor doesn't accept any insurance. Please contact the clinic for payment options.
              </p>
            )}
          </div>

          {/* Visit Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Visit Type *</h3>
            <select
              required
              value={formData.visitType}
              onChange={(e) => handleInputChange('visitType', e.target.value)}
              className="w-full text-sm text-gray-600 shadow-md p-2 rounded-md border-none focus:outline-none focus:ring-0"
            >
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Urgent Care">Urgent Care</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Documentation</h3>
            <div className="flex items-center gap-2 shadow-md p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <div className="flex-1">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent"
                  multiple
                />
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {formData.documents.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Summary *</h3>
            <textarea
              required
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              className="w-full text-sm text-gray-600 shadow-md p-2 rounded-md border-none focus:outline-none focus:ring-0"
              placeholder="Describe your symptoms and concerns..."
              rows={3}
            />
          </div>

          {/* Current Medications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Medications</h3>
            <div className="space-y-2 shadow-md p-2 rounded-md">
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 font-medium">
                <span>Name</span>
                <span>Dosage</span>
                <span>Action</span>
              </div>

              {formData.currentMedications.map((medication, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center py-2">
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    className="text-sm text-gray-700 border-none focus:outline-none focus:ring-0 bg-transparent"
                    placeholder="Medication name"
                  />
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    className="text-sm text-gray-600 border-none focus:outline-none focus:ring-0 bg-transparent"
                    placeholder="Dosage"
                  />
                  <button
                    type="button"
                    onClick={() => removeMedication(index)}
                    className="w-8 h-8 p-0 text-gray-400 hover:text-red-500 rounded-md flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addMedication}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
              >
                + Add Medication
              </button>
            </div>
          </div>

          {/* Prior Diagnoses */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Prior Diagnoses <span className="text-gray-400 font-normal">(Optional)</span>
            </h3>
            <div className="space-y-2">
              {formData.priorDiagnoses.map((diagnosis, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => handleDiagnosisChange(index, e.target.value)}
                    className="flex-1 text-xs text-gray-500 leading-relaxed shadow-md p-2 rounded-md border-none focus:outline-none focus:ring-0"
                    placeholder="Enter prior diagnosis"
                  />
                  {formData.priorDiagnoses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDiagnosis(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDiagnosis}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Add Another Diagnosis
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleSubmit}
            disabled={isBooking}
            className="w-full bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white py-3 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? 'Booking...' : 'View Overview'}
          </button>
        </div>
      </div>
    </div>
  );
}