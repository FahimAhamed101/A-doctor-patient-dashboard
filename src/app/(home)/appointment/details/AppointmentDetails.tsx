"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
}

interface AppointmentDetailsProps {
  doctorName: string;
  specialty: string;
  location: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  reasonForVisit: string;
  visitType: string;
  insurance: string;
  initialVitalSigns: VitalSigns;
  soapNotes: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
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
  doctorName,
  specialty,
  location,
  appointmentDate,
  appointmentTime,
  status,
  reasonForVisit,
  visitType,
  insurance,
  initialVitalSigns,
  soapNotes,
  onSaveChanges,
}) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>(initialVitalSigns);
  const [selectedDay, setSelectedDay] = useState("");

  const handleInputChange = (field: keyof VitalSigns, value: string) => {
    setVitalSigns(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveChanges?.(vitalSigns);
  };
 const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-[800px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg"
              alt={doctorName}
              width={64}
              height={64}
              className="rounded-full border-2 border-gray-200 w-20 h-20"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{doctorName}</h2>
              <p className="text-sm text-gray-500">{specialty}</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Last Appointment Time */}
          <div className="space-y-2">
            <div className="relative w-full">
              <p className="text-sm font-medium text-gray-700 inline-block pr-2 bg-white relative z-10">
                Last Appointment Time
              </p>
              <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{appointmentDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{appointmentTime}</span>
              </div>
              <div className="flex items-center space-x-1 text-[#237B10]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33331 9.3335L5.66665 11.6668L12.6666 4.3335" stroke="#237B10" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{status}</span>
              </div>
            </div>
          </div>

          {/* Visit Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Reason for Visit</p>
              <p className="text-sm text-gray-600">{reasonForVisit}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Visit Type</p>
              <p className="text-sm text-gray-600">{visitType}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Insurance</p>
              <p className="text-sm text-gray-600">{insurance}</p>
            </div>
          </div>

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
                  className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <button className="flex justify-center items-center py-2 px-4 text-[#2E8BC9] shadow-md bg-transparent rounded-md hover:bg-blue-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00004 14.6663C11.6819 14.6663 14.6667 11.6816 14.6667 7.99967C14.6667 4.31778 11.6819 1.33301 8.00004 1.33301C4.31814 1.33301 1.33337 4.31778 1.33337 7.99967C1.33337 11.6816 4.31814 14.6663 8.00004 14.6663Z" stroke="#2E8BC9" strokeWidth="1.5"/>
                <path d="M8.00004 10.6663V5.33301M8.00004 10.6663C7.53324 10.6663 6.66106 9.33681 6.33337 8.99967M8.00004 10.6663C8.46684 10.6663 9.33904 9.33681 9.66671 8.99967" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2">Download</span>
            </button>
          </div>

          {/* Upcoming */}
          <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 w-full">
            <div className="w-full space-y-2 flex gap-2 items-center">
              <label htmlFor="check-in" className="pt-2 text-sm font-medium text-gray-700">
                Upcoming
              </label>
              <select
                id="check-in"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

        {/* Save Changes Button */}
        <div className="p-6 pt-0">
          <button 
            type="button"
            onClick={() => router.push("/appointment/favourite")}
            className="w-full py-2 px-4 bg-[#2E8BC9] hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
          Book Appointment 
          </button>
        </div>
      </div>
    </div>
  );
};