"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin, FileText } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
}

interface Document {
  fileName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}

interface Medication {
  name: string;
  dosage: string;
  _id: string;
}

interface AppointmentDetailsProps {
  appointmentId: string;
  doctorName: string;
  specialty: string;
  location: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  appointmentStatus: "scheduled" | "completed" | "cancelled" | "no-show" | "booked"; // Updated to match actual values
  reasonForVisit: string;
  visitType: string;
  insurance: string;
  checkInTime?: string;
  documents?: Document[];
  currentMedications?: Medication[];
  priorDiagnoses?: string[];
  initialVitalSigns: VitalSigns;
  soapNotes: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  onCheckIn?: () => void;
  onSaveChanges?: (vitalSigns: VitalSigns) => void;
}
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointmentId,
  doctorName,
  specialty,
  location,
  appointmentDate,
  appointmentTime,
  status,
  appointmentStatus,
  reasonForVisit,
  visitType,
  insurance,
  checkInTime,
  documents = [],
  currentMedications = [],
  priorDiagnoses = [],
  initialVitalSigns,
  soapNotes,
  onCheckIn,
  onSaveChanges,
}) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>(initialVitalSigns);
  const [selectedDay, setSelectedDay] = useState("");
  const router = useRouter();

  const handleInputChange = (field: keyof VitalSigns, value: string) => {
    setVitalSigns(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveChanges?.(vitalSigns);
  };

  const handleDownloadReport = () => {
    // Implement download report functionality
    console.log("Downloading report...");
  };

  const handleBookAppointment = () => {
    router.push("/appointment/favourite");
  };

  const handleReschedule = () => {
    router.push(`/appointment/reschedule?id=${appointmentId}`);
  };

  const handleCancel = () => {
    router.push(`/appointment?cancel=${appointmentId}`);
  };

  const handleMedicationAction = (medicationId: string) => {
    // Implement medication action (refill, etc.)
    console.log("Medication action for:", medicationId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-[800px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/placeholder.svg"
                  alt={doctorName}
                  width={64}
                  height={64}
                  className="object-cover rounded-full border-2 border-gray-200"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{doctorName}</h2>
                <p className="text-sm text-gray-500">{specialty}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
            <button className="text-white px-4 py-2 text-sm rounded-md flex items-center">
              <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_2903_18021)">
                  <rect x="4" y="1.5" width="40" height="40" rx="8" fill="#2E8BC9"/>
                  <path d="M24 11.5C29.5221 11.5 33.9998 15.7834 34 21.0664C34 26.3496 29.5222 30.6338 24 30.6338C23.3507 30.6347 22.7032 30.5738 22.0654 30.4541C21.6066 30.3679 21.377 30.3252 21.2168 30.3496C21.0565 30.3741 20.8292 30.4947 20.375 30.7363C19.0902 31.4196 17.5922 31.6605 16.1514 31.3926C16.6988 30.7191 17.0723 29.9111 17.2373 29.0449C17.3373 28.5149 17.0899 27.9999 16.7188 27.623C15.0332 25.9115 14 23.6048 14 21.0664C14.0002 15.7834 18.4779 11.5 24 11.5ZM20 20.5C19.4477 20.5 19 20.9477 19 21.5C19 22.0523 19.4477 22.5 20 22.5H20.0088C20.5611 22.5 21.0088 22.0523 21.0088 21.5C21.0088 20.9477 20.5611 20.5 20.0088 20.5H20ZM23.9951 20.5C23.443 20.5002 22.9951 20.9478 22.9951 21.5C22.9951 22.0522 23.443 22.4998 23.9951 22.5H24.0049L24.1064 22.4951C24.6109 22.4441 25.0049 22.0179 25.0049 21.5C25.0049 20.9821 24.6109 20.5559 24.1064 20.5049L24.0049 20.5H23.9951ZM27.9912 20.5C27.4389 20.5 26.9912 20.9477 26.9912 21.5C26.9912 22.0523 27.4389 22.5 27.9912 22.5H28C28.5523 22.5 29 22.0523 29 21.5C29 20.9477 28.5523 20.5 28 20.5H27.9912Z" fill="white"/>
                </g>
                <defs>
                  <filter id="filter0_d_2903_18021" x="0" y="0.5" width="48" height="48" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="3"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.101961 0 0 0 0 0.25098 0 0 0 0 0.376471 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2903_18021"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2903_18021" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </button>
          </div>

          {/* Check-in Status */}
          {appointmentStatus === 'booked' && !checkInTime && onCheckIn && (
            <button 
              onClick={onCheckIn}
              className="w-full flex items-center justify-center gap-2 text-[#93531F] shadow-md hover:bg-orange-50 bg-[#FBF7EB] px-4 py-3 rounded-md text-sm font-medium transition-colors"
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.1177 21.367C13.6841 21.773 13.1044 22 12.5011 22C11.8978 22 11.3182 21.773 10.8845 21.367C6.91302 17.626 1.59076 13.4469 4.18627 7.37966C5.58963 4.09916 8.95834 2 12.5011 2C16.0439 2 19.4126 4.09916 20.816 7.37966C23.4082 13.4393 18.099 17.6389 14.1177 21.367Z" stroke="#93531F" strokeWidth="1.5"/>
                <path d="M9.5 11.8333C9.5 11.8333 10.375 11.8333 11.25 13.5C11.25 13.5 14.0294 9.33333 16.5 8.5" stroke="#93531F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Check in</span>
            </button>
          )}
          
          {checkInTime && (
            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 px-4 py-3 rounded-md text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33301 9.33398L5.66634 11.6673L12.6663 4.33398" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Checked in at {new Date(checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            </div>
          )}

          {/* Appointment Time */}
          <div className="space-y-3">
            <div className="relative w-full">
              <p className="text-sm font-medium text-gray-700 inline-block pr-2 bg-white relative z-10">
                {appointmentStatus === 'completed' ? 'Last Appointment Time' : 'Appointment Time'}
              </p>
              <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-900">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{appointmentDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-900">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{appointmentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  appointmentStatus === 'booked' ? 'bg-green-500' :
                  appointmentStatus === 'completed' ? 'bg-blue-500' :
                  appointmentStatus === 'cancelled' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}></div>
                <span className={`text-sm font-medium ${
                  appointmentStatus === 'booked' ? 'text-green-600' :
                  appointmentStatus === 'completed' ? 'text-blue-600' :
                  appointmentStatus === 'cancelled' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Visit Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Reason for Visit</p>
              <p className="text-sm text-gray-600 shadow-md rounded-md p-2">{reasonForVisit}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Visit Type</p>
              <p className="text-sm text-gray-600 shadow-md rounded-md p-2">{visitType}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Insurance</p>
              <p className="text-sm text-gray-600 shadow-md rounded-md p-2">{insurance}</p>
            </div>
          </div>

          {/* Documents */}
          {documents.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Documentation</p>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center space-x-3 shadow-md p-3 rounded-md">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600 flex-1">{doc.fileName}</span>
                    <span className="text-sm text-gray-500">
                      {(doc.sizeBytes / 1024).toFixed(1)}kb
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Medications */}
          {currentMedications.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Current Medications</p>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    <span className="text-xs font-medium text-gray-700">Name</span>
                    <span className="text-xs font-medium text-gray-700">Dosage</span>
                    <span className="text-xs font-medium text-gray-700">Action</span>
                  </div>
                </div>
                {currentMedications.map((medication, index) => (
                  <div key={medication._id} className={`px-4 py-3 ${
                    index < currentMedications.length - 1 ? 'border-b border-gray-200' : ''
                  }`}>
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <span className="text-sm text-gray-900">{medication.name}</span>
                      <span className="text-sm text-gray-600">{medication.dosage}</span>
                      <button 
                        onClick={() => handleMedicationAction(medication._id)}
                        className="w-6 h-6 text-blue-500 hover:bg-blue-50 rounded text-xs flex items-center justify-center"
                      >
                        R
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prior Diagnoses */}
          {priorDiagnoses.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Prior Diagnoses</p>
              <div className="shadow-md rounded-md p-3">
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {priorDiagnoses.map((diagnosis, index) => (
                    <li key={index}>{diagnosis}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Vital Signs */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">Vital Signs</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Blood Pressure: 
                </label>
                <input
                  type="text"
                  value={vitalSigns.bloodPressure}
                  onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                  className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-200 rounded-md px-3 py-2"
                  placeholder="130/85 mmHg"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Heart Rate:
                </label>
                <input
                  type="text"
                  value={vitalSigns.heartRate}
                  onChange={(e) => handleInputChange('heartRate', e.target.value)}
                  className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-200 rounded-md px-3 py-2"
                  placeholder="72 bpm"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Temperature:
                </label>
                <input
                  type="text"
                  value={vitalSigns.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                  className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-200 rounded-md px-3 py-2"
                  placeholder="98.6°F"
                />
              </div>
            </div>
          </div>

          {/* SOAP Notes */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">SOAP Notes</h3>

            {Object.entries(soapNotes).map(([section, content]) => (
              <div key={section} className="rounded-md p-3 text-sm text-gray-700">
                <p className="font-semibold mb-1 capitalize">{section}</p>
                <p className="shadow-md rounded-md p-2">
                  {content}
                </p>
              </div>
            ))}
          </div>

          {/* Download Report */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">Download Report</h3>
            <button 
              onClick={handleDownloadReport}
              className="flex justify-center items-center py-2 px-4 text-[#2E8BC9] shadow-md bg-transparent rounded-md hover:bg-blue-50 transition-colors w-full"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00004 14.6663C11.6819 14.6663 14.6667 11.6816 14.6667 7.99967C14.6667 4.31778 11.6819 1.33301 8.00004 1.33301C4.31814 1.33301 1.33337 4.31778 1.33337 7.99967C1.33337 11.6816 4.31814 14.6663 8.00004 14.6663Z" stroke="#2E8BC9" strokeWidth="1.5"/>
                <path d="M8.00004 10.6663V5.33301M8.00004 10.6663C7.53324 10.6663 6.66106 9.33681 6.33337 8.99967M8.00004 10.6663C8.46684 10.6663 9.33904 9.33681 9.66671 8.99967" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2">Download</span>
            </button>
          </div>

          {/* Upcoming Follow-up */}
          <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 w-full">
            <div className="w-full space-y-2 flex gap-2 items-center">
              <label htmlFor="check-in" className="pt-2 text-sm font-medium text-gray-700">
                Upcoming Follow-up
              </label>
              <select
                id="check-in"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-gray-200 px-3 py-2"
              >
                <option value=""> - in 7 days</option>
                {daysOfWeek.map((day) => (
                  <option key={day.toLowerCase()} value={day.toLowerCase()}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 space-y-3">
         

          
          {/* Reschedule and Cancel Options */}
          {appointmentStatus === 'booked' && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Can't make it on this date?</p>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleReschedule}
                    className="text-blue-600 border border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Reschedule
                  </button>
                  <span className="text-sm text-gray-400">OR</span>
                  <button 
                    onClick={handleCancel}
                    className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};