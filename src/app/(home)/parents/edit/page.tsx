"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, XCircle, Download, CheckCircle, Clock, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Appointment {
  id: number;
  time: string;
  doctor: string;
  status: string;
  isHighlighted: boolean;
}

interface VitalSigns {
  height: string;
  weight: string;
  bloodPressure: string;
  upperRespiratoryInfection: boolean;
  heartRate: string;
  temperature: string;
}

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [noteText, setNoteText] = useState("");
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    height: '',
    weight: '72',
    bloodPressure: '',
    upperRespiratoryInfection: false,
    heartRate: '130/65 mmHg',
    temperature: '98 bpm'
  });

  const handleInputChange = (field: keyof VitalSigns, value: string | boolean) => {
    setVitalSigns(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const appointments: Appointment[] = [
    {
      id: 1,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Upcoming",
      isHighlighted: true,
    },
    {
      id: 2,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Next Follow Up In 7 Days",
      isHighlighted: false,
    },
    {
      id: 3,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Complete",
      isHighlighted: false,
    },
    {
      id: 4,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Complete",
      isHighlighted: false,
    },
    {
      id: 5,
      time: "16 May, 2025 || 10:30 PM",
      doctor: "Dr. Moule Markk",
      status: "Canceled",
      isHighlighted: false,
    },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-orange-100 text-orange-600";
      case "Next Follow Up In 7 Days":
        return "bg-blue-100 text-blue-600";
      case "Complete":
        return "bg-green-100 text-green-600";
      case "Canceled":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case "Canceled":
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center space-x-4">
                <Image
                  src="/doc.jpg"
                  alt="Dr. Moule Marrk"
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-gray-200 w-20 h-20"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Dr. Moule Marrk</h2>
                  <p className="text-sm text-gray-500">Cardiology</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>Sylhet Health Center</span>
                  </div>
                </div>
              </div>

              {/* Last Appointment Time */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Last Appointment Time</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>May 16, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>10:30 PM</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete</span>
                  </div>
                </div>
              </div>

              {/* Reason for Visit */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Reason for Visit</p>
                <p className="text-sm text-gray-600">Need a cleaning</p>
              </div>

              {/* Visit Type */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Visit Type</p>
                <p className="text-sm text-gray-600">New Patient Visit</p>
              </div>

              {/* Insurance */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Insurance</p>
                <p className="text-sm text-gray-600">Blusky</p>
              </div>

              {/* Vital Signs */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">Vital Signs</h3>
                <div className="p-6 space-y-4">
                  {/* Height and Weight Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height
                      </label>
                      <input
                        type="text"
                        value={vitalSigns.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter height"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={vitalSigns.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Blood Pressure */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Pressure
                    </label>
                    <input
                      type="text"
                      value={vitalSigns.bloodPressure}
                      onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter blood pressure"
                    />
                  </div>

                  {/* Upper Respiratory Infection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upper Respiratory Infection
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="upperRespiratoryInfection"
                          checked={vitalSigns.upperRespiratoryInfection === true}
                          onChange={() => handleInputChange('upperRespiratoryInfection', true)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="upperRespiratoryInfection"
                          checked={vitalSigns.upperRespiratoryInfection === false}
                          onChange={() => handleInputChange('upperRespiratoryInfection', false)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Heart Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heart Rate
                    </label>
                    <input
                      type="text"
                      value={vitalSigns.heartRate}
                      onChange={(e) => handleInputChange('heartRate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Temperature */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temperature
                    </label>
                    <input
                      type="text"
                      value={vitalSigns.temperature}
                      onChange={(e) => handleInputChange('temperature', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* SOAP Notes */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-gray-900">SOAP Notes</h3>

                {/* Subjective */}
                <div className="rounded-md p-3 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Subjective</p>
                  <p className="shadow-md rounded-md p-2">
                    Patient presents for routine annual physical examination. Reports feeling well overall with no acute
                    complaints. Denies chest pain, shortness of breath, or palpitations.
                  </p>
                </div>

                {/* Objective */}
                <div className=" rounded-md p-3 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Objective</p>
                  <p className="shadow-md rounded-md p-2">
                    Vital signs stable. BP 120/80, HR 72, Temp 98.6°F. Physical examination unremarkable. Heart regular rate
                    and rhythm, lungs clear bilaterally.
                  </p>
                </div>

                {/* Assessment */}
                <div className=" rounded-md p-3 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Assessment</p>
                  <p className="shadow-md rounded-md p-2">Healthy adult male for routine preventive care visit.</p>
                </div>

                {/* Plan */}
                <div className=" rounded-md p-3 text-sm text-gray-700">
                  <p className="font-semibold mb-1">Plan</p>
                  <p className="shadow-md rounded-md p-2">
                    Continue current lifestyle habits. Return in 1 year for annual physical. Labs ordered for screening.
                  </p>
                </div>
              </div>

              {/* Download Report */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-gray-900">Download Report</h3>
                <button className=" flex justify-center items-center py-2 px-4 text-blue-600 border border-blue-600 bg-transparent rounded-md hover:bg-blue-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>

              {/* Upcoming */}
              <div className="text-sm text-gray-600">
                Upcoming - <span className="text-blue-600">In 7 days</span>
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="p-6 pt-0">
              <button className="w-full py-2 px-4 bg-[#2E8BC9] hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}