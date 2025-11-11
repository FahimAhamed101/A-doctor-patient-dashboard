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



      <div className="max-w-[800px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
<div className="flex items-center justify-center gap-3 p-6  ">

<div className="w-1/2 flex justify-center border-b-1 border-[#DCDCDC]">
    {/* Butterfly Logo */}
    

    

      {/* Text Content */}
      <div className="flex flex-col ">
         <div className="flex items-center justify-center ">
        <svg width="61" height="39" viewBox="0 0 61 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M57.099 0.853314C54.7221 -0.405313 51.7335 0.0384686 49.4745 1.97655C47.9777 3.22265 46.704 5.01531 45.5808 7.45986C44.3096 10.2253 42.7902 12.9407 41.321 15.5657C41.1279 15.9092 40.9374 16.2552 40.7418 16.6037L37.8059 11.4689C36.971 10.0072 36.0232 8.35243 34.5013 7.11888C33.2302 6.0859 31.801 5.59448 30.4221 5.62457H30.4171C29.0381 5.59448 27.609 6.0859 26.3378 7.11888C24.8159 8.35243 23.8682 10.0072 23.0333 11.4689L20.0973 16.6037C19.9018 16.2552 19.7112 15.9092 19.5182 15.5657C18.0489 12.9407 16.5295 10.2253 15.2584 7.45986C14.1351 5.01531 12.8615 3.22515 11.3647 1.97655C9.10313 0.0384686 6.11452 -0.405313 3.74017 0.853314C1.50373 2.03673 0.22003 4.56401 0.382999 7.44732C0.515882 9.75397 1.46361 11.8274 2.30103 13.6602L8.74711 27.7458C9.11818 28.5532 10.0734 28.9092 10.8833 28.5406C11.6906 28.1695 12.0466 27.2143 11.6781 26.407L5.23198 12.3214C4.4773 10.6741 3.69755 8.9667 3.59977 7.26429C3.56467 6.65253 3.57971 4.58407 5.24702 3.69902C6.70121 2.9293 8.32338 3.61126 9.27112 4.42611L9.29619 4.44868C10.4194 5.37886 11.4123 6.80297 12.3349 8.80373C13.6588 11.6845 15.2107 14.4575 16.7101 17.1378C17.209 18.0328 17.723 18.9505 18.2269 19.8731L15.5994 24.4689C12.9417 28.4453 11.4298 33.876 15.123 37.2432C16.6348 38.6197 18.5479 39.1387 20.5135 38.7049C22.6973 38.221 24.6153 36.5813 25.5154 34.4276C26.6387 31.7474 25.9442 29.0822 25.0265 26.605C24.1515 24.2357 23.0132 21.9917 21.9126 19.9158L25.8313 13.0685C26.5609 11.7923 27.3156 10.4735 28.3662 9.62108C28.9428 9.15474 29.6724 8.82379 30.4171 8.85638H30.4221C31.1667 8.82379 31.8963 9.15223 32.473 9.62108C33.526 10.4735 34.2782 11.7898 35.0078 13.0685L38.9266 19.9158C37.8259 21.9892 36.6876 24.2332 35.8126 26.605C34.895 29.0822 34.2005 31.7474 35.3237 34.4276C36.2238 36.5813 38.1418 38.221 40.3256 38.7049C42.2913 39.1387 44.2068 38.6197 45.7162 37.2432C49.4093 33.876 47.8999 28.4453 45.2398 24.4689L42.6122 19.8731C43.1137 18.9505 43.6276 18.0328 44.1291 17.1378C45.6284 14.4575 47.1804 11.6845 48.5042 8.80373C49.4269 6.80046 50.4197 5.37886 51.5429 4.44868L51.568 4.42611C52.5158 3.61126 54.1379 2.9293 55.5921 3.69902C57.2594 4.58407 57.277 6.65253 57.2394 7.26429C57.1441 8.9667 56.3643 10.6741 55.6072 12.3214L49.1611 26.407C48.79 27.2143 49.1486 28.1695 49.9559 28.5406C50.7657 28.9117 51.721 28.5532 52.092 27.7458L58.5381 13.6602C59.3755 11.8274 60.3233 9.75397 60.4561 7.44732C60.6216 4.56401 59.3354 2.03673 57.099 0.853314ZM22.0003 27.7233C22.8177 29.9346 23.1963 31.617 22.5394 33.184C22.0454 34.3699 20.9748 35.3026 19.8115 35.5609C19.1671 35.7013 18.2019 35.6987 17.2867 34.8638C14.3909 32.2262 17.891 26.8232 18.2996 26.2164L20.0046 23.2453C20.7316 24.687 21.4312 26.1888 21.9978 27.7258L22.0003 27.7233ZM43.5474 34.8613C42.6323 35.6962 41.6695 35.6987 41.0226 35.5583C39.8618 35.3001 38.7887 34.3699 38.2948 33.1815C37.6379 31.617 38.014 29.9321 38.8338 27.7208C39.403 26.1863 40.1 24.682 40.8271 23.2403L42.532 26.2114C42.9407 26.8182 46.4407 32.2212 43.5449 34.8588L43.5474 34.8613Z" fill="#2E8BC9"/>
</svg> <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Wellbyn</h1>  </div>
        <p className="text-sm text-gray-600 mt-1">Date: 02 June 2025</p>
      </div>
  
</div>
  
     
    </div>


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

          
        </div>

        
      </div>
    </div>
  );
};