"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-2/4 mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
        <div className="flex flex-col items-center justify-center w-full p-6 pt-0">
  <button 
    type="button"
    onClick={() => onSaveChanges?.(vitalSigns)}
    className="flex items-center justify-center gap-2 w-full  py-2 px-4 bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white font-medium rounded-md transition-colors"
  >
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5737 3.88545C15.3189 3.07808 15.6915 2.6744 16.0874 2.43893C17.0427 1.87076 18.2191 1.85309 19.1904 2.39232C19.5929 2.6158 19.9769 3.00812 20.745 3.79276C21.5131 4.5774 21.8972 4.96972 22.1159 5.38093C22.6438 6.37312 22.6265 7.57479 22.0703 8.5507C21.8398 8.95516 21.4446 9.33578 20.6543 10.097L11.2506 19.1543C9.75288 20.5969 9.004 21.3182 8.06806 21.6837C7.13212 22.0493 6.1032 22.0224 4.04536 21.9686L3.76538 21.9613C3.13891 21.9449 2.82567 21.9367 2.64359 21.73C2.4615 21.5234 2.48636 21.2043 2.53608 20.5662L2.56308 20.2197C2.70301 18.4235 2.77297 17.5255 3.12371 16.7182C3.47444 15.9109 4.07944 15.2555 5.28943 13.9445L14.5737 3.88545Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13.5 4L20.5 11" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14.5 22H22.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    Edit Appointment 
  </button>
</div>
      </div>
    </div>
  );
};