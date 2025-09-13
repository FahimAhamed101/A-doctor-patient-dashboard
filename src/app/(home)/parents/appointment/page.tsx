"use client";

import { useState } from "react";
import { MessageSquare, CheckCircle2, XCircle, Settings, DownloadCloud, FileText, Download, User, Eye } from "lucide-react";
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
  const documents = [
    { name: "Document_Name.jpeg", size: "25kb", status: "downloading" },
    { name: "Document_Name.jpeg", size: "25kb", status: "ready" },
    { name: "Document_Name.jpeg", size: "25kb", status: "ready" },
    { name: "Document_Name.jpeg", size: "25kb", status: "ready" },
  ]

  const insuranceData = {
    insuranceName: "Bluesky",
    contractId: "G987654321",
    groupNumber: "H123456789",
    expirationDate: "31/12/2025",
    patientRelationship: "Father",
    firstName: "Kamal",
    middleName: "Ahmed",
    lastName: "Dane",
    patientContractId: "G987654321",
    addressLine1: "G987654321", // This appears to be a placeholder for an actual address line in the image
    city: "Manhattan",
    state: "NYC",
    zip: "00976",
    employerName: "Mahmudcompany",
    sex: "Male",
    dateOfBirth: "31/12/2006",
  }

  // Reusable component for displaying a data field
  const DataField = ({ label, value }: { label: string; value: string }) => (
    <div className="grid gap-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )

  // Component to render a single column of insurance information
  const InsuranceColumn = () => (
    <div className="space-y-6">
      {/* Insurance Details Section */}
      <div className="space-y-4">
        <DataField label="Insurance Name" value={insuranceData.insuranceName} />
        <DataField label="Contract ID" value={insuranceData.contractId} />
        <DataField label="Group Number" value={insuranceData.groupNumber} />
        <DataField label="Expiration Date" value={insuranceData.expirationDate} />
      </div>
      <hr className="border-t border-gray-200" />

      {/* Patient Relationship Section */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Patient Relationship to Policy Holder</p>
        <p className="font-medium">{insuranceData.patientRelationship}</p>
      </div>
      <hr className="border-t border-gray-200" />

      {/* Patient Details Section */}
      <div className="grid grid-cols-3 gap-4">
        <DataField label="First Name" value={insuranceData.firstName} />
        <DataField label="Middle Name" value={insuranceData.middleName} />
        <DataField label="Last Name" value={insuranceData.lastName} />
      </div>
      <div className="space-y-4 mt-4">
        <DataField label="Contract ID" value={insuranceData.patientContractId} />
        <DataField label="Address Line 1" value={insuranceData.addressLine1} />
        <div className="grid grid-cols-3 gap-4">
          <DataField label="City" value={insuranceData.city} />
          <DataField label="State" value={insuranceData.state} />
          <DataField label="ZIP" value={insuranceData.zip} />
        </div>
      </div>
      <hr className="border-t border-gray-200" />

      {/* Employment and Personal Info Section */}
      <div className="space-y-4">
        <DataField label="Employer Name" value={insuranceData.employerName} />
        <DataField label="Sex" value={insuranceData.sex} />
        <DataField label="Date of Birth" value={insuranceData.dateOfBirth} />
      </div>
      <hr className="border-t border-gray-200" />

      {/* Documents and Signature Section */}
      <div className="space-y-4">
        <div className="grid gap-1">
          <p className="text-sm text-muted-foreground">Insurance Card</p>
          <Link href="#" className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
            <Eye className="w-4 h-4" />
            View Card
          </Link>
        </div>
        <div className="grid gap-1">
          <p className="text-sm text-muted-foreground">Digital Signature</p>
          <Link href="#" className="flex items-center gap-1 text-blue-600 hover:underline text-sm">
            <Eye className="w-4 h-4" />
            View Signature
          </Link>
        </div>
        <div className="grid gap-1">
          <p className="text-sm text-muted-foreground">Draw Signature</p>
          <Image
            src="/placeholder.svg?height=100&width=300"
            alt="Drawn Signature"
            width={300}
            height={100}
            className="border border-gray-200 rounded-md"
          />
        </div>
      </div>
    </div>
  )

  const caregivers = [
    { id: 1, name: "Jamal" },
    { id: 2, name: "Jony" },
  ]
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
            <div className="mt-6 space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 rounded-lg border ${
                    appointment.isHighlighted ? "border-l-4 border-blue-500 bg-blue-50" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Appointment Time</span>
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Doctor</span>
                    <span className="font-medium">{appointment.doctor}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                        appointment.status,
                      )}`}
                    >
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex flex-col items-start md:items-end">
                    <span className="text-sm text-gray-500 md:sr-only">Action</span>
                    <Link href="#" className="text-blue-500 hover:underline font-medium">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Other tab contents would go here */}
         
          {activeTab === "patients-info" && (
           <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6">
        <Settings className="w-5 h-5" />
        <span>Patient Information</span>
      </div>

      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">mahmud.uiuxdesign@gmail.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mobile</p>
              <p className="font-medium">(555) 456-7890</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium">10-10-2009</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="font-medium">23</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium">Male</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blood Group</p>
              <p className="font-medium">O+</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Marital Status</p>
              <p className="font-medium">Singel</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Number of children</p>
              <p className="font-medium">-</p>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Address Line 1</p>
              <p className="font-medium">1234 Elm Street</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Address Line 2</p>
              <p className="font-medium">Apt 101</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">City</p>
              <p className="font-medium">San Juan</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">State</p>
              <p className="font-medium">Puerto Rico</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ZIP</p>
              <p className="font-medium">00901</p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="pb-6">
          <h2 className="text-xl font-semibold mb-4">Additional info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Employer</p>
              <p className="font-medium">N/A</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last 4 digits of SSN</p>
              <p className="font-medium">5241</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Driver&apos;s License</p>
              <p className="font-medium">56170</p>
            </div>
          </div>
        </div>

        {/* Upload Driver's License Images */}
        <div className="pt-4">
          <p className="text-sm text-muted-foreground mb-3">Upload Driver&apos;s License Images</p>
          <div className="flex gap-3">
            <button >Front Of License</button>
            <button >Back Of License</button>
          </div>
        </div>
      </div>
    </div>
          )}
        {activeTab === "document" && (
     <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Files/Documents</h2>
        <button  className="text-blue-600 hover:bg-blue-50">
          <DownloadCloud className="w-5 h-5 mr-2" />
          Download all
        </button>
      </div>
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.size}</p>
              </div>
            </div>
            {doc.status === "downloading" ? (
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
                <Download className="w-4 h-4 text-blue-600" />
              </div>
            ) : (
              <button   className="text-blue-600 hover:bg-blue-50">
                <Download className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
          )}
 {activeTab === "medication" && (
<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 max-w-2xl mx-auto my-8">
      <div className="flex items-center gap-2 text-lg font-semibold mb-6">
        <FileText className="w-5 h-5" />
        <h2>Medical Information</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3">Allergies</h3>
        <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground bg-muted/50 p-2 rounded-t-md">
          <div>Name</div>
          <div className="text-right">Severity</div>
        </div>
        <div className="grid grid-cols-2 text-sm p-2 border-b last:border-b-0">
          <div>Penicillin</div>
          <div className="text-right">Moderate</div>
        </div>
        <div className="grid grid-cols-2 text-sm p-2 bg-muted/20 border-b last:border-b-0">
          <div>Penicillin</div>
          <div className="text-right">Moderate</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3">Current Medications</h3>
        <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground bg-muted/50 p-2 rounded-t-md">
          <div>Name</div>
          <div className="text-right">Dosage</div>
        </div>
        <div className="grid grid-cols-2 text-sm p-2 border-b last:border-b-0">
          <div>Lisinopril</div>
          <div className="text-right">Once daily</div>
        </div>
        <div className="grid grid-cols-2 text-sm p-2 bg-muted/20 border-b last:border-b-0">
          <div>Metformin</div>
          <div className="text-right">Twice daily</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3">Existing Conditions</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Diabetes</li>
          <li>Hypertension</li>
          <li>Anxiety</li>
          <li>Depression</li>
          <li>Asthma</li>
          <li>None</li>
        </ul>
      </div>

      <div>
        <h3 className="text-base font-semibold mb-3">Lifestyle Factors</h3>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Smoking</li>
          <li>Former Smoker</li>
          <li>Alcohol</li>
        </ul>
      </div>
    </div>
 )}
     
      {activeTab === "insurance-info" && (
<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Insurance Information</h2>
        </div>

        {/* Two-column layout for insurance details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <InsuranceColumn />
          <InsuranceColumn /> {/* Duplicate column to match the image */}
        </div>
      </div>
    </div>

      )}
       {activeTab === "caregiver" && (
 <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Caregiver List</h2>
        <div className="rounded-md overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-blue-50 text-gray-600 font-medium py-2 px-4 border-b border-gray-200">
            <div>Name</div>
            <div className="text-right">Action</div>
          </div>
          {/* Table Rows */}
          {caregivers.map((caregiver, index) => (
            <div
              key={caregiver.id}
              className={`grid grid-cols-2 items-center py-3 px-4 ${
                index % 2 === 0 ? "bg-blue-50" : "bg-white"
              } border-b border-gray-200 last:border-b-0`}
            >
              <div>{caregiver.name}</div>
              <div className="flex justify-end">
                <button  onClick={() => setActiveTab("caregiver_details")} className="text-gray-500 hover:text-gray-700" aria-label={`View details for ${caregiver.name}`}>
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
       )}
         {activeTab === "caregiver_details" && (
          <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-md space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            defaultValue="MD Mahmudur Rahman Talukder"
            readOnly
            className="bg-gray-50 border-gray-200 shadow-sm"
          />
        </div>

        {/* Relation Field */}
        <div className="space-y-2">
          <label htmlFor="relation">Relation</label>
          <input id="relation" defaultValue="Brother" readOnly className="bg-gray-50 border-gray-200 shadow-sm" />
        </div>

        {/* Date Of Birth Field */}
        <div className="space-y-2">
          <label htmlFor="dob">Date Of Birth</label>
          <input id="dob" defaultValue="2 Feb 1999" readOnly className="bg-gray-50 border-gray-200 shadow-sm" />
          <p className="text-sm text-gray-500">26 years old</p>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            defaultValue="example@email.com"
            readOnly
            className="bg-gray-50 border-gray-200 shadow-sm"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone">Phone</label>
          <input id="phone" defaultValue="+1 9999999999" readOnly className="bg-gray-50 border-gray-200 shadow-sm" />
        </div>
      </div>
    </div>
            )}
        </div>
      </div>
    </div>
  );
}