"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Plus } from "lucide-react"
import { useAddInsuranceMutation } from "@/redux/features/insurance/insuranceApi"


export default function InsuranceEnrollmentForm() {
  const [addInsurance, { isLoading, isError, error, isSuccess }] = useAddInsuranceMutation()
  
  const [formData, setFormData] = useState({
    insuranceName: "",
    contractId: "",
    groupNumber: "",
    patientRelationship: "",
    subscriber: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      sex: "male", // Keep form value as lowercase for consistency
      employerName: "",
      address: {
        line1: "",
        city: "",
        state: "",
        zip: ""
      }
    }
  })

  const [insuranceCard, setInsuranceCard] = useState<File | null>(null)
  const [digitalSignature, setDigitalSignature] = useState<File | null>(null)
  const [date, setDate] = useState<Date>()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubscriberChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      subscriber: {
        ...prev.subscriber,
        [field]: value
      }
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      subscriber: {
        ...prev.subscriber,
        address: {
          ...prev.subscriber.address,
          [field]: value
        }
      }
    }))
  }

  const handleFileUpload = (file: File, type: 'insuranceCard' | 'digitalSignature') => {
    if (type === 'insuranceCard') {
      setInsuranceCard(file)
    } else {
      setDigitalSignature(file)
    }
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      handleSubscriberChange('dob', format(selectedDate, "yyyy-MM-dd"))
    } else {
      handleSubscriberChange('dob', "")
    }
  }

  // Map form values to API expected values for patientRelationship
  const getApiPatientRelationship = (formValue: string) => {
    const mapping: { [key: string]: string } = {
      "self": "Self",
      "spouse": "Spouse", 
      "child": "Child",
      "other": "Other"
    }
    return mapping[formValue] || ""
  }

  // Map form values to API expected values for sex
  const getApiSex = (formValue: string) => {
    const mapping: { [key: string]: string } = {
      "male": "Male",
      "female": "Female", 
      "other": "Other"
    }
    return mapping[formValue] || "Male"
  }

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData()
      
      // Prepare subscriber data with properly formatted values for API
      const subscriberData = {
        ...formData.subscriber,
        sex: getApiSex(formData.subscriber.sex)
      }
      
      // Add all form data with proper formatting for API
      formDataToSend.append('insuranceName', formData.insuranceName)
      formDataToSend.append('contractId', formData.contractId)
      formDataToSend.append('groupNumber', formData.groupNumber)
      formDataToSend.append('patientRelationship', getApiPatientRelationship(formData.patientRelationship))
      formDataToSend.append('subscriber', JSON.stringify(subscriberData))
      
      // Add files if they exist
      if (insuranceCard) {
        formDataToSend.append('insuranceCard', insuranceCard)
      }
      if (digitalSignature) {
        formDataToSend.append('digitalSignature', digitalSignature)
      }

      await addInsurance(formDataToSend).unwrap()
      
      // Reset form on success
      setFormData({
        insuranceName: "",
        contractId: "",
        groupNumber: "",
        patientRelationship: "",
        subscriber: {
          firstName: "",
          middleName: "",
          lastName: "",
          dob: "",
          sex: "male",
          employerName: "",
          address: {
            line1: "",
            city: "",
            state: "",
            zip: ""
          }
        }
      })
      setInsuranceCard(null)
      setDigitalSignature(null)
      setDate(undefined)
      
    } catch (error) {
      console.error('Failed to submit insurance form:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="mx-auto bg-white rounded-lg shadow-sm p-6 space-y-4">
        {/* Status Messages */}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            Error submitting form: {error?.toString()}
          </div>
        )}
        {isSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            Insurance information saved successfully!
          </div>
        )}

        {/* Insurance Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Insurance Name</label>
          <select
            value={formData.insuranceName}
            onChange={(e) => handleInputChange('insuranceName', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            placeholder="Enter contract ID"
            value={formData.contractId}
            onChange={(e) => handleInputChange('contractId', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Group Number */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Group Number</label>
          <input
            type="text"
            placeholder="Enter group number"
            value={formData.groupNumber}
            onChange={(e) => handleInputChange('groupNumber', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Patient Relationship To Insured */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Patient Relationship To Insured</label>
          <select
            value={formData.patientRelationship}
            onChange={(e) => handleInputChange('patientRelationship', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="self">Self</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="First Name"
              value={formData.subscriber.firstName}
              onChange={(e) => handleSubscriberChange('firstName', e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Middle"
              value={formData.subscriber.middleName}
              onChange={(e) => handleSubscriberChange('middleName', e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last"
              value={formData.subscriber.lastName}
              onChange={(e) => handleSubscriberChange('lastName', e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Address Line 1 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input
            type="text"
            placeholder="Street address"
            value={formData.subscriber.address.line1}
            onChange={(e) => handleAddressChange('line1', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* City, State, ZIP */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="City"
              value={formData.subscriber.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              value={formData.subscriber.address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
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
              placeholder="ZIP code"
              value={formData.subscriber.address.zip}
              onChange={(e) => handleAddressChange('zip', e.target.value)}
              className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Employer Name */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            type="text"
            placeholder="Company name"
            value={formData.subscriber.employerName}
            onChange={(e) => handleSubscriberChange('employerName', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Sex - Updated with Other option */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <select
            value={formData.subscriber.sex}
            onChange={(e) => handleSubscriberChange('sex', e.target.value)}
            className="block w-full h-10 px-3 py-2 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date of Birth - Enhanced with Calendar UI */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Date Of Birth</label>
          <div className="relative">
            <button
              type="button"
              className={`w-full h-10 px-3 py-2 text-left bg-white rounded-md shadow-sm ${
                !date ? "text-gray-500" : "text-gray-900"
              } focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              onClick={() => document.getElementById('datepicker')?.focus()}
            >
              {date ? format(date, "MM/dd/yyyy") : "mm/dd/yyyy"}
              <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-blue-500" />
            </button>
            <input
              id="datepicker"
              type="date"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleDateChange(e.target.valueAsDate || undefined)}
            />
          </div>
        </div>

        {/* Insurance Card */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Insurance Card</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'insuranceCard')}
            className="hidden"
            id="insurance-card"
          />
          <label
            htmlFor="insurance-card"
            className="flex items-center cursor-pointer shadow-sm px-5 py-2 rounded-md text-[#2E8BC9] text-sm hover:bg-blue-50 focus:outline-none"
          >
            <Plus className="w-4 h-4 mr-1" />
            {insuranceCard ? insuranceCard.name : 'Upload Card'}
          </label>
        </div>

        {/* Digital Signature */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Digital Signature</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'digitalSignature')}
            className="hidden"
            id="digital-signature"
          />
          <label
            htmlFor="digital-signature"
            className="flex items-center cursor-pointer shadow-sm px-5 py-2 rounded-md text-[#2E8BC9] text-sm hover:bg-blue-50 focus:outline-none"
          >
            <Plus className="w-4 h-4 mr-1" />
            {digitalSignature ? digitalSignature.name : 'Upload Signature'}
          </label>
        </div>

        {/* OR Divider */}
        <div className="flex my-4">
          <span className="px-3 text-sm font-bold text-gray-500">OR</span>
          <div className="flex-1 mt-2 border-t border-gray-200"></div>
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
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-12 px-4 py-2 bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium rounded-md shadow-sm mt-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Change'}
        </button>
      </div>
    </div>
  )
}