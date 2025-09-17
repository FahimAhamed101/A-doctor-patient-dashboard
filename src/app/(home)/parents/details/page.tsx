"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, XCircle, Download, CheckCircle, Clock, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("appointment");
  const [noteText, setNoteText] = useState("");

  const appointments = [
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
        {/* Top Section: Patient Profile and Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-lg shadow p-6">
          {/* Patient Profile */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-semibold">
                Ma
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">Mahmudur Rahman</h2>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    In Care
                  </span>
                </div>
                <p className="text-sm text-gray-500">Patient ID: P6Q7R8</p>
              </div>
            </div>
            <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </button>
          </div>

          {/* Notes Section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Notes</h3>
            <p className="text-sm text-gray-500">
              Feel free to add a private note for this patient. Only you will be able to view it.
            </p>
            <textarea
              placeholder="Type your note..."
              className="min-h-[100px] w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>
        </div>

        {/* Bottom Section: Tabbed Interface */}
        <div className="w-full bg-white rounded-lg shadow p-6">
          {/* Tabs */}
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 mb-6">
            <button
              onClick={() => setActiveTab("appointment")}
              className={`py-2 px-4 text-sm font-medium rounded-md ${
                activeTab === "appointment" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Appointment
            </button>
            <button
              onClick={() => setActiveTab("patients-info")}
              className={`py-2 px-4 text-sm font-medium rounded-md ${
                activeTab === "patients-info" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Patients Info
            </button>
            <button
              onClick={() => setActiveTab("document")}
              className={`py-2 px-4 text-sm font-medium rounded-md ${
                activeTab === "document" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Document
            </button>
            <button
              onClick={() => setActiveTab("medication")}
              className={`py-2 px-4 text-sm font-medium rounded-md ${
                activeTab === "medication" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Medication
            </button>
            <button
              onClick={() => setActiveTab("insurance-info")}
              className={`py-2 px-4 text-sm font-medium rounded-md ${
                activeTab === "insurance-info" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Insurance Info
            </button>
            <button
              onClick={() => setActiveTab("caregiver")}
              className={`py-2 px-4 text-sm font-medium rounded-md ${
                activeTab === "caregiver" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Caregiver
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "appointment" && (
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
            <p className="text-sm text-gray-600">Blood Pressure : 130/85 mmHg</p>
            <p className="text-sm text-gray-600">Heart Rate : 88 bpm</p>
            <p className="text-sm text-gray-600">Temperature : 100.20F</p>
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
          <button className="w-full py-2 px-4 bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white font-medium rounded-md transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
          )}
          {/* Other tab contents would go here */}
        </div>
      </div>
    </div>
  );
}