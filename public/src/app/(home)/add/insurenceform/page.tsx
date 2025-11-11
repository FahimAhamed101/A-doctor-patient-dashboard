"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"

export default function InsuranceEnrollmentForm() {
  const [date, setDate] = useState<Date>()
  const [insuranceName, setInsuranceName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [firstName, setFirstName] = useState("")
  const [middleName, setMiddleName] = useState("")
  const [lastName, setLastName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [employer, setEmployer] = useState("")
  const [sex, setSex] = useState("male")

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-2/4 mx-auto bg-white rounded-lg shadow-sm p-6 space-y-4">
        {/* Insurance Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Insurance Name</label>
          <select
            value={insuranceName}
            onChange={(e) => setInsuranceName(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="aetna">Aetna</option>
            <option value="blue-cross">Blue Cross Blue Shield</option>
            <option value="cigna">Cigna</option>
          </select>
        </div>

        {/* Contract ID */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Contract ID</label>
          <input
            type="text"
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-gray-700"
            value="G567854321"
            readOnly
          />
        </div>

        {/* Group Number */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Group Number</label>
          <input
            type="text"
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm text-gray-700"
            value="G567854321"
            readOnly
          />
        </div>

        {/* Patient Relationship To Insured */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Patient Relationship To Insured</label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
          </select>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Middle"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Contract ID (Second Instance) */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Contract ID</label>
          <input
            type="text"
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-gray-700"
            value="G567854321"
            readOnly
          />
        </div>

        {/* Address Line 1 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input
            type="text"
            placeholder="Street address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select</option>
              <option value="ca">California</option>
              <option value="ny">New York</option>
              <option value="tx">Texas</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">ZIP</label>
            <input
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Employer Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            type="text"
            placeholder="Company name"
            value={employer}
            onChange={(e) => setEmployer(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sex */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
          <div className="relative">
            <button
              type="button"
              className={`w-full h-10 px-3 py-2 text-left bg-white  rounded-md shadow-sm ${
                !date ? "text-gray-500" : "text-gray-900"
              }`}
              onClick={() => document.getElementById('datepicker')?.focus()}
            >
              {date ? format(date, "MM/dd/yyyy") : "mm/dd/yyyy"}
              <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-blue-500" />
            </button>
            <input
              id="datepicker"
              type="date"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setDate(e.target.valueAsDate || undefined)}
            />
          </div>
        </div>

        {/* Insurance Card */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Insurance Card</label>
          <button
            type="button"
            className="flex shadow-sm px-5 py-2 rounded-md text-[#2E8BC9] text-sm hover:[#2E8BC9] focus:outline-none"
          >
            <Plus className="w-4 h-4 mr-1" />
            Upload Card
          </button>
        </div>

        {/* Digital Signature */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Digital Signature</label>
          <button
            type="button"
            className="flex items-center shadow-sm px-5 py-2 rounded-md text-[#2E8BC9] text-sm hover:[#2E8BC9] focus:outline-none"
          >
            <Plus className="w-4 h-4 mr-1" />
            Upload Signature
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex  my-4">
        
          <span className="px-3 text-sm font-bold  text-gray-500">OR</span>
          <div className="flex-1 mt-2  border-t border-gray-200"></div>
        </div>

        {/* Draw Signature */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Draw Signature</label>
          <div className="shadow-md rounded bg-white p-6 min-h-[80px] flex items-center justify-center">
            <div className="text-2xl text-gray-800" style={{ fontFamily: "cursive" }}>
              Mahmud
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="button"
          className="w-full h-12 px-4 py-2 bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium rounded-md shadow-sm mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Change
        </button>
      </div>
    </div>
  )
}