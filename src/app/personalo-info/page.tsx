"use client"

import { useState } from 'react';
import { ChevronDown, Calendar, Upload, Plus, Trash2, Eye, Edit3 } from 'lucide-react';

type FormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  maritalStatus: string;
  bloodGroup: string;
  numberOfChildren: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  employer: string;
  driversLicense: string;
};

type InsuranceCard = {
  insuranceName: string;
  contractId: string;
  groupNumber: string;
  expirationDate: string;
  patientRelationship: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contractIdSecondary: string;
  addressLine1: string;
  city: string;
  state: string;
  zip: string;
  employerName: string;
  sex: string;
  dateOfBirth: string;
};

type InsuranceData = {
  primaryCard: InsuranceCard;
  otherCard: InsuranceCard;
  hasOtherCard: boolean;
  signature: string;
};

type Allergy = {
  name: string;
  severity: string;
};

type Medication = {
  name: string;
  dosage: string;
};

type MedicalData = {
  allergies: Allergy[];
  medications: Medication[];
  conditions: string[];
  lifestyle: string[];
};

type ModalType = 'allergy' | 'medication' | 'conditions' | 'lifestyle' | null;

export default function PatientInformationForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    sex: 'Male',
    maritalStatus: 'Select status',
    bloodGroup: 'O+',
    numberOfChildren: '0',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Select',
    zipCode: '',
    employer: '',
    driversLicense: ''
  });

  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    primaryCard: {
      insuranceName: 'BlueSky',
      contractId: 'G987654321',
      groupNumber: 'H123456789',
      expirationDate: '31/12/2025',
      patientRelationship: 'Father',
      firstName: 'Kamal',
      middleName: 'Ahmed',
      lastName: 'Dane',
      contractIdSecondary: 'G987654321',
      addressLine1: 'G987654321',
      city: 'Manhattan',
      state: 'NYC',
      zip: '10076',
      employerName: 'Mahmudcompany',
      sex: 'Male',
      dateOfBirth: '31/12/2000'
    },
    otherCard: {
      insuranceName: '',
      contractId: '',
      groupNumber: '',
      expirationDate: '',
      patientRelationship: '',
      firstName: '',
      middleName: '',
      lastName: '',
      contractIdSecondary: '',
      addressLine1: '',
      city: '',
      state: '',
      zip: '',
      employerName: '',
      sex: 'Male',
      dateOfBirth: ''
    },
    hasOtherCard: false,
    signature: 'Mahmud'
  });

  const [medicalData, setMedicalData] = useState<MedicalData>({
    allergies: [
      { name: 'Penicillin', severity: 'Moderate' },
      { name: 'Penicillin', severity: 'Moderate' }
    ],
    medications: [
      { name: 'Lisinopril', dosage: 'Once daily' },
      { name: 'Metformin', dosage: 'Twice daily' }
    ],
    conditions: [
      'Diabetes',
      'Hypertension', 
      'Anxiety',
      'Depression',
      'Asthma',
      'None'
    ],
    lifestyle: [
      'Smoking',
      'Former Smoker',
      'Alcohol'
    ]
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAllergy = () => {
    setMedicalData(prev => ({
      ...prev,
      allergies: [...prev.allergies, { name: '', severity: 'Mild' }]
    }));
  };

  const removeAllergy = (index: number) => {
    setMedicalData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const updateAllergy = (index: number, field: keyof Allergy, value: string) => {
    setMedicalData(prev => ({
      ...prev,
      allergies: prev.allergies.map((allergy, i) => 
        i === index ? { ...allergy, [field]: value } : allergy
      )
    }));
  };

  const addMedication = () => {
    setMedicalData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '' }]
    }));
  };

  const removeMedication = (index: number) => {
    setMedicalData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setMedicalData(prev => ({
      ...prev,
      medications: prev.medications.map((med, i) => 
        i === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const handleInsuranceChange = (cardType: 'primaryCard' | 'otherCard', field: keyof InsuranceCard, value: string) => {
    setInsuranceData(prev => ({
      ...prev,
      [cardType]: { ...prev[cardType], [field]: value }
    }));
  };

  const addOtherCard = () => {
    setInsuranceData(prev => ({ ...prev, hasOtherCard: true }));
  };

  const openModal = (modalName: ModalType) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const Modal = ({ isOpen, children }: { isOpen: boolean, children: React.ReactNode }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4">
          {children}
        </div>
      </div>
    );
  };

  const ModalHeader = ({ title }: { title: string }) => (
    <div className="bg-gray-100 px-4 py-3 rounded-t-lg border-b">
      <h3 className="text-sm font-medium text-gray-700">{title}</h3>
    </div>
  );

  const ModalFooter = ({ onCancel, onAdd }: { onCancel: () => void, onAdd: () => void }) => (
    <div className="px-4 py-3 flex justify-end space-x-2 border-t">
      <button 
        onClick={onCancel}
        className="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
      <button 
        onClick={onAdd}
        className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-6">
      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center text-sm font-medium`}>
            1
          </div>
          <div className="ml-2 text-sm text-gray-600">Step</div>
        </div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center text-sm`}>
            2
          </div>
          <div className="ml-2 text-sm text-gray-600">Step</div>
        </div>
        <div className="flex-1 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'} rounded-full flex items-center justify-center text-sm`}>
            3
          </div>
          <div className="ml-2 text-sm text-gray-600">Step</div>
        </div>
      </div>

      {/* Form Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
            <span className="text-white text-xs">i</span>
          </div>
          <h2 className="text-lg font-medium text-gray-900">
            {currentStep === 1 ? 'Patient Information' : currentStep === 2 ? 'Medical Information' : 'Insurance Information'}
          </h2>
        </div>
        <p className="text-sm text-gray-600 ml-8">
          {currentStep === 1 
            ? 'Hi! Please share your personal info to verify your identity and stay connected with your healthcare providers.'
            : currentStep === 2 
            ? 'Hi! Please share your medical information to help us provide better healthcare services.'
            : 'Greetings! To keep your insurance information current and facilitate ongoing communication with your healthcare providers, we kindly request that you provide your insurance details.'
          }
        </p>
      </div>

      {/* Form Content */}
      {currentStep === 1 ? (
        // Step 1 - Patient Information
        <div className="space-y-6">
          {/* Full Name Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Full Name</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Middle"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Date Of Birth</h3>
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-blue-500" />
            </div>
          </div>

          {/* Sex */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Sex</h3>
            <div className="relative w-full md:w-1/3">
              <select
                value={formData.sex}
                onChange={(e) => handleInputChange('sex', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Marital Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Marital Status</h3>
            <div className="relative w-full md:w-1/3">
              <select
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Select status">Select status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Blood Group */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Blood Group</h3>
            <div className="relative w-full md:w-1/3">
              <select
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Number of Children */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Number Of Children <span className="text-gray-400 font-normal">(optional)</span>
            </h3>
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="0"
                value={formData.numberOfChildren}
                onChange={(e) => handleInputChange('numberOfChildren', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Email</h3>
            <div className="w-full md:w-1/2">
              <input
                type="email"
                placeholder="saltib@gmail.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Phone</h3>
            <div className="w-full md:w-1/2">
              <input
                type="tel"
                placeholder="+1 9999999999"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Address Line 1 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Address Line 1</h3>
            <div className="w-full">
              <input
                type="text"
                placeholder="Street address"
                value={formData.addressLine1}
                onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Address Line 2 */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Address Line 2 <span className="text-gray-400 font-normal">(optional)</span>
            </h3>
            <div className="w-full">
              <input
                type="text"
                placeholder="Apartment, suite, unit, etc."
                value={formData.addressLine2}
                onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">City</h3>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">State</h3>
              <div className="relative">
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Select">Select</option>
                  <option value="AL">Alabama</option>
                  <option value="CA">California</option>
                  <option value="FL">Florida</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Zip Code</h3>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Employer */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Employer</h3>
            <div className="w-full">
              <input
                type="text"
                placeholder="Company name"
                value={formData.employer}
                onChange={(e) => handleInputChange('employer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Driver's License */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Driver's License</h3>
            <div className="w-full">
              <input
                type="text"
                value={formData.driversLicense}
                onChange={(e) => handleInputChange('driversLicense', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Upload Driver's License */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Upload Driver's License Images</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
          </div>
        </div>
      ) : currentStep === 2 ? (
        // Step 2 - Medical Information
        <div className="space-y-6">
          {/* Allergies */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Allergies</h3>
              <button
                onClick={() => openModal('allergy')}
                className="flex items-center text-sm text-blue-500 hover:text-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            
            {medicalData.allergies.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 mb-3">
                  <div>Name</div>
                  <div>Severity</div>
                  <div>Action</div>
                  <div></div>
                </div>
                
                {medicalData.allergies.map((allergy, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div className="text-sm text-gray-900">{allergy.name}</div>
                    <div className="text-sm text-gray-700">{allergy.severity}</div>
                    <div>
                      <button
                        onClick={() => removeAllergy(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Medications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Current Medications</h3>
              <button
                onClick={() => openModal('medication')}
                className="flex items-center text-sm text-blue-500 hover:text-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            
            {medicalData.medications.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-4 gap-4 text-xs font-medium text-gray-500 mb-3">
                  <div>Name</div>
                  <div>Dosage</div>
                  <div>Action</div>
                  <div></div>
                </div>
                
                {medicalData.medications.map((medication, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center py-2 border-b border-gray-200 last:border-b-0">
                    <div className="text-sm text-gray-900">{medication.name}</div>
                    <div className="text-sm text-gray-700">{medication.dosage}</div>
                    <div>
                      <button
                        onClick={() => removeMedication(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Existing Conditions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Existing Conditions</h3>
              <button 
                onClick={() => openModal('conditions')}
                className="flex items-center text-sm text-blue-500 hover:text-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            
            <div className="space-y-2">
              {medicalData.conditions.map((condition, index) => (
                <div key={index} className="flex items-center py-2">
                  <div className="text-sm text-gray-900">{condition}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Lifestyle Factors</h3>
              <button 
                onClick={() => openModal('lifestyle')}
                className="flex items-center text-sm text-blue-500 hover:text-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            
            <div className="space-y-2">
              {medicalData.lifestyle.map((factor, index) => (
                <div key={index} className="flex items-center py-2">
                  <div className="text-sm text-gray-900">{factor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Step 3 - Insurance Information
        <div className="space-y-6">
          {/* Primary Insurance Card */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setIsOpen(true)} className="text-sm font-medium text-gray-700 flex items-center">
                <Plus className="w-4 h-4 mr-2 text-blue-500" />
                Add Primary Card
              </button>
            </div>
          </div>
    
          <div className="bg-white rounded-lg p-4 border">
            <div className="space-y-4">
              {/* Insurance Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Insurance Name</label>
                <div className="flex items-center justify-between">
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.insuranceName || '-'}</p>
                  <button className="p-2 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contract ID */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contract ID</label>
                <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.contractId || '-'}</p>
              </div>

              {/* Group Number */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Group Number</label>
                <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.groupNumber || '-'}</p>
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Expiration Date</label>
                <p className="px-3 py-2 text-sm text-gray-800">
                  {insuranceData.primaryCard.expirationDate || 'Not specified'}
                </p>
              </div>

              {/* Patient Relationship to Policy Holder */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Patient Relationship to Policy Holder</label>
                <p className="px-3 py-2 text-sm text-gray-800">
                  {insuranceData.primaryCard.patientRelationship || '-'}
                </p>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.firstName || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Middle Name</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.middleName || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.lastName || '-'}</p>
                </div>
              </div>

              {/* Contract ID (Secondary) */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Contract ID</label>
                <p className="px-3 py-2 text-sm text-gray-800">
                  {insuranceData.primaryCard.contractIdSecondary || '-'}
                </p>
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address Line 1</label>
                <p className="px-3 py-2 text-sm text-gray-800">
                  {insuranceData.primaryCard.addressLine1 || 'Not specified'}
                </p>
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">City</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.city || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">State</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.state || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ZIP</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.zip || '-'}</p>
                </div>
              </div>

              {/* Employer Name */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Employer Name</label>
                <p className="px-3 py-2 text-sm text-gray-800">
                  {insuranceData.primaryCard.employerName || 'Not specified'}
                </p>
              </div>

              {/* Sex and Date of Birth */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Sex</label>
                  <p className="px-3 py-2 text-sm text-gray-800">{insuranceData.primaryCard.sex || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                  <p className="px-3 py-2 text-sm text-gray-800">
                    {insuranceData.primaryCard.dateOfBirth || 'Not specified'}
                  </p>
                </div>
              </div>

              {/* Insurance Card Section */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Insurance Card</h4>
                <button className="flex items-center text-sm text-blue-500 hover:text-blue-600 mb-2">
                  <Eye className="w-4 h-4 mr-1" />
                  View Card
                </button>
              </div>

              {/* Digital Signature Section */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Digital Signature</h4>
                <button className="flex items-center text-sm text-blue-500 hover:text-blue-600 mb-4">
                  <Eye className="w-4 h-4 mr-1" />
                  View Signature
                </button>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Draw Signature</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                    <div className="text-4xl font-cursive text-gray-800 mb-2" style={{fontFamily: 'cursive'}}>
                      {insuranceData.signature || 'No signature available'}
                    </div>
                    <button className="flex items-center justify-center mx-auto text-sm text-blue-500 hover:text-blue-600">
                      <Edit3 className="w-4 h-4 mr-1" />
                      Edit Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Other Card Button */}
          {!insuranceData.hasOtherCard && (
            <div className="bg-blue-50 rounded-lg p-4">
              <button
                onClick={addOtherCard}
                className="flex items-center text-sm text-blue-500 hover:text-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Other Card
              </button>
            </div>
          )}

          {/* Other Insurance Card */}
          {insuranceData.hasOtherCard && (
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <Plus className="w-4 h-4 mr-2 text-blue-500" />
                  Add Other Card
                </h3>
              </div>
              
              <div className="bg-white rounded-lg p-4 border">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Insurance Name</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={insuranceData.otherCard.insuranceName}
                        onChange={(e) => handleInsuranceChange('otherCard', 'insuranceName', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter insurance name"
                      />
                      <button 
                        onClick={() => setInsuranceData(prev => ({...prev, hasOtherCard: false}))}
                        className="ml-2 p-2 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* Add similar fields as primary card but for otherCard */}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Insurance Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div 
              className="fixed inset-0 bg-white bg-opacity-30 transition-opacity" 
              onClick={() => setIsOpen(false)}
            ></div>
            
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="space-y-4 p-1">
                  {/* Insurance Name */}
                  <div className="space-y-2">
                    <label htmlFor="insurance-name" className="block text-sm font-medium text-gray-700">
                      Insurance Name
                    </label>
                    <select
                      id="insurance-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-2 px-3 border"
                    >
                      <option value="">Select</option>
                      <option value="aetna">Aetna</option>
                      <option value="blue-cross">Blue Cross</option>
                      <option value="cigna">Cigna</option>
                    </select>
                  </div>

                  {/* Contract ID */}
                  <div className="space-y-2">
                    <label htmlFor="contract-id" className="block text-sm font-medium text-gray-700">
                      Contract ID
                    </label>
                    <input
                      type="text"
                      id="contract-id"
                      defaultValue="0987654321"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-2 px-3 border"
                    />
                  </div>

                  {/* Group Number */}
                  <div className="space-y-2">
                    <label htmlFor="group-number" className="block text-sm font-medium text-gray-700">
                      Group Number
                    </label>
                    <input
                      type="text"
                      id="group-number"
                      defaultValue="0987654321"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-2 px-3 border"
                    />
                  </div>

                  {/* Patient Relationship To Insured */}
                  <div className="space-y-2">
                    <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                      Patient Relationship To Insured
                    </label>
                    <select
                      id="relationship"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-2 px-3 border"
                    >
                      <option value="">Select</option>
                      <option value="self">Self</option>
                      <option value="spouse">Spouse</option>
                      <option value="child">Child</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Middle"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                        />
                        <input
                          type="text"
                          placeholder="Last"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contract ID (second one) */}
                  <div className="space-y-2">
                    <label htmlFor="contract-id-2" className="block text-sm font-medium text-gray-700">
                      Contract ID
                    </label>
                    <input
                      type="text"
                      id="contract-id-2"
                      defaultValue="0987654321"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 py-2 px-3 border"
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Street address"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <select
                        id="state"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                      >
                        <option value="">Select</option>
                        <option value="ca">CA</option>
                        <option value="ny">NY</option>
                        <option value="tx">TX</option>
                        <option value="fl">FL</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                        ZIP
                      </label>
                      <input
                        type="text"
                        id="zip"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                      />
                    </div>
                  </div>

                  {/* Employer Name */}
                  <div className="space-y-2">
                    <label htmlFor="employer" className="block text-sm font-medium text-gray-700">
                      Employer Name
                    </label>
                    <input
                      type="text"
                      id="employer"
                      placeholder="Company name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                    />
                  </div>

                  {/* Sex */}
                  <div className="space-y-2">
                    <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
                      Sex
                    </label>
                    <select
                      id="sex"
                      defaultValue="male"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Date Of Birth */}
                  <div className="space-y-2">
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                      Date Of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="dob"
                        placeholder="mm/dd/yyyy"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                    </div>
                  </div>

                  {/* Insurance Card */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Insurance Card</label>
                    <button className="flex items-center gap-1 text-blue-500 text-sm hover:text-blue-600">
                      <Plus className="h-4 w-4" />
                      Upload Card
                    </button>
                  </div>

                  {/* Digital Signature */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Digital Signature</label>
                    <button className="flex items-center gap-1 text-blue-500 text-sm hover:text-blue-600">
                      <Plus className="h-4 w-4" />
                      Upload Signature
                    </button>
                  </div>

                  {/* OR */}
                  <div className="text-center text-sm font-medium text-gray-700">OR</div>

                  {/* Draw Signature */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Draw Signature</label>
                    <div className="border rounded-md p-4 bg-white min-h-[80px] flex items-center justify-center">
                      <div className="text-2xl font-signature text-gray-800" style={{ fontFamily: "cursive" }}>
                        Mahmud
                      </div>
                    </div>
                  </div>

                  {/* Save Change Button */}
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    Save Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Medical Modals */}
      {/* Add Allergy Modal */}
      <Modal isOpen={activeModal === 'allergy'}>
        <ModalHeader title="Add Allergy" />
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Allergy Name
            </label>
            <input 
              type="text" 
              placeholder="Enter allergy name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input type="radio" name="severity" value="mild" className="mr-2" />
                <span className="text-sm text-gray-700">Mild</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="severity" value="moderate" className="mr-2" />
                <span className="text-sm text-gray-700">Moderate</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="severity" value="severe" className="mr-2" />
                <span className="text-sm text-gray-700">Severe</span>
              </label>
            </div>
          </div>
        </div>
        <ModalFooter onCancel={closeModal} onAdd={closeModal} />
      </Modal>

      {/* Add Medication Modal */}
      <Modal isOpen={activeModal === 'medication'}>
        <ModalHeader title="Add Medication" />
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medication Name
            </label>
            <input 
              type="text" 
              placeholder="Enter medication name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dosage
            </label>
            <input 
              type="text" 
              placeholder="e.g. 10mg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <input 
              type="text" 
              placeholder="e.g. Twice daily"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <ModalFooter onCancel={closeModal} onAdd={closeModal} />
      </Modal>

      {/* Add Existing Conditions Modal */}
      <Modal isOpen={activeModal === 'conditions'}>
        <ModalHeader title="Add Existing Conditions" />
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Existing Conditions Name
            </label>
            <input 
              type="text" 
              placeholder="Condition Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <ModalFooter onCancel={closeModal} onAdd={closeModal} />
      </Modal>

      {/* Add Lifestyle Factors Modal */}
      <Modal isOpen={activeModal === 'lifestyle'}>
        <ModalHeader title="Add Lifestyle Factors" />
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lifestyle Factors Name
            </label>
            <input 
              type="text" 
              placeholder="Enter lifestyle factors name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <ModalFooter onCancel={closeModal} onAdd={closeModal} />
      </Modal>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        {currentStep > 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        
        <button
          onClick={() => currentStep < 3 ? setCurrentStep(currentStep + 1) : null}
          className="px-6 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {currentStep < 3 ? 'Save & Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
}