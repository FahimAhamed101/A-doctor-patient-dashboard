"use client";

import React, { useState } from "react";
import { Plus, Trash2, User, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/Dialog";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Card from "@/components/UI/Card";

interface Allergy {
  id: string;
  name: string;
  severity: string;
}

interface Medication {
  id: string;
  name: string;
  frequency: string;
}

interface MedicalFormData {
  allergies: Allergy[];
  medications: Medication[];
  conditions: string[];
  lifestyleFactors: string[];
}

const MedicalInformationPage = () => {
  const [currentStep] = useState(2);
  const [formData, setFormData] = useState<MedicalFormData>({
    allergies: [
      { id: "1", name: "Penicillin", severity: "Moderate" },
      { id: "2", name: "Penicillin", severity: "Moderate" },
    ],
    medications: [
      { id: "1", name: "Lisinopril", frequency: "Once daily" },
      { id: "2", name: "Metformin", frequency: "Twice daily" },
    ],
    conditions: [],
    lifestyleFactors: [],
  });

  const [newAllergy, setNewAllergy] = useState({ name: "", severity: "" });
  const [newMedication, setNewMedication] = useState({
    name: "",
    frequency: "",
  });
  const [newCondition, setNewCondition] = useState("");
  const [newLifestyleFactor, setNewLifestyleFactor] = useState("");
  const [allergyModalOpen, setAllergyModalOpen] = useState(false);
  const [medicationModalOpen, setMedicationModalOpen] = useState(false);
  const [conditionModalOpen, setConditionModalOpen] = useState(false);
  const [lifestyleModalOpen, setLifestyleModalOpen] = useState(false);

  const [conditionOptions, setConditionOptions] = useState([
    "Diabetes",
    "Hypertension",
    "Anxiety",
    "Depression",
    "Asthma",
    "None",
  ]);

  const [lifestyleOptions, setLifestyleOptions] = useState([
    "Smoking",
    "Former Smoker",
    "Alcohol",
  ]);

  const handleAddAllergy = () => {
    if (newAllergy.name && newAllergy.severity) {
      const allergy: Allergy = {
        id: Date.now().toString(),
        name: newAllergy.name,
        severity: newAllergy.severity,
      };
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, allergy],
      }));
      setNewAllergy({ name: "", severity: "" });
      setAllergyModalOpen(false);
    }
  };

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.frequency) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name,
        frequency: newMedication.frequency,
      };
      setFormData((prev) => ({
        ...prev,
        medications: [...prev.medications, medication],
      }));
      setNewMedication({ name: "", frequency: "" });
      setMedicationModalOpen(false);
    }
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      // Check if condition already exists
      if (!conditionOptions.includes(newCondition)) {
        // Add to options list
        setConditionOptions((prev) => [...prev, newCondition]);
      }
      // Add to selected conditions
      if (newCondition === "None") {
        setFormData((prev) => ({
          ...prev,
          conditions: ["None"],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          conditions: [
            ...prev.conditions.filter((c) => c !== "None"),
            newCondition,
          ],
        }));
      }
      setNewCondition("");
      setConditionModalOpen(false);
    }
  };

  const handleAddLifestyleFactor = () => {
    if (newLifestyleFactor.trim()) {
      // Check if lifestyle factor already exists
      if (!lifestyleOptions.includes(newLifestyleFactor)) {
        // Add to options list
        setLifestyleOptions((prev) => [...prev, newLifestyleFactor]);
      }
      // Add to selected lifestyle factors
      setFormData((prev) => ({
        ...prev,
        lifestyleFactors: [...prev.lifestyleFactors, newLifestyleFactor],
      }));
      setNewLifestyleFactor("");
      setLifestyleModalOpen(false);
    }
  };

  const handleRemoveAllergy = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((allergy) => allergy.id !== id),
    }));
  };

  const handleRemoveMedication = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      medications: prev.medications.filter(
        (medication) => medication.id !== id
      ),
    }));
  };

  const handleConditionChange = (condition: string) => {
    if (condition === "None") {
      setFormData((prev) => ({
        ...prev,
        conditions: prev.conditions.includes("None") ? [] : ["None"],
      }));
    } else {
      setFormData((prev) => {
        const newConditions = prev.conditions.includes(condition)
          ? prev.conditions.filter((c) => c !== condition)
          : [...prev.conditions.filter((c) => c !== "None"), condition];
        return { ...prev, conditions: newConditions };
      });
    }
  };

  const handleLifestyleChange = (factor: string) => {
    setFormData((prev) => ({
      ...prev,
      lifestyleFactors: prev.lifestyleFactors.includes(factor)
        ? prev.lifestyleFactors.filter((f) => f !== factor)
        : [...prev.lifestyleFactors, factor],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Medical information:", formData);
    // Handle form submission
  };

  const SeverityButton = ({
    severity,
    selected,
    onClick,
  }: {
    severity: string;
    selected: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
        selected
          ? "border-action-hover bg-action-light text-action-hover"
          : "border-gray-300 bg-white text-text-secondary hover:border-gray-400"
      }`}
    >
      {severity}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center md:p-4">
      <div className="w-full max-w-2xl">
        <Card>
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col justify-center items-center">
              <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="text-sm text-gray-600 font-medium">Step</span>
            </div>

            <div className="flex-1 h-px bg-primary-500 mb-4"></div>

            <div className="flex flex-col justify-center items-center">
              <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm text-gray-600 font-medium">Step</span>
            </div>

            <div className="flex-1 h-px bg-gray-300 mb-4"></div>

            <div className="flex flex-col justify-center items-center">
              <div className="w-10 h-10  bg-white text-black rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-gray-600 font-medium">Step</span>
            </div>
          </div>

          {/* Main Form Card */}
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9V7.81818C19 6.12494 19 5.27832 18.7478 4.60214C18.3424 3.5151 17.4849 2.65765 16.3979 2.2522C15.7217 2 14.8751 2 13.1818 2C10.2186 2 8.73706 2 7.55375 2.44135C5.65142 3.15088 4.15088 4.65142 3.44135 6.55375C3 7.73706 3 9.21865 3 12.1818V14.7273C3 17.7966 3 19.3313 3.79783 20.3971C4.02643 20.7025 4.29752 20.9736 4.60289 21.2022C5.66867 22 7.20336 22 10.2727 22H11C12.1698 22 14.5 22 14.5 22"
                  stroke="#3D3D3D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 14.3333H11.8403C12.5019 14.3333 12.8326 14.3333 13.0985 14.5076C13.3643 14.6818 13.5122 14.9956 13.8081 15.6232L15.4 19L17.6 12L19.1919 15.3768C19.4878 16.0044 19.6357 16.3182 19.9015 16.4924C20.1674 16.6667 20.4981 16.6667 21.1597 16.6667H22"
                  stroke="#3D3D3D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667H7.44444C7.9611 8.66667 8.21942 8.66667 8.43137 8.60988C9.00652 8.45577 9.45576 8.00652 9.60988 7.43137C9.66667 7.21942 9.66667 6.9611 9.66667 6.44444V5.33333C9.66667 3.49238 11.1591 2 13 2"
                  stroke="#3D3D3D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <h1 className="ml-2 text-2xl font-medium text-black">
                Medical Information
              </h1>
            </div>
            <p className="text-Text-secondary text-[16px] font-medium">
              Hi! Please share your personal info to verify your identity and
              stay connected with your healthcare providers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Allergies Section */}
            <div className="bg-white p-2 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Allergies</h2>
                <Dialog
                  open={allergyModalOpen}
                  onOpenChange={setAllergyModalOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center text-primary-500 hover:text-primary-500 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-text-primary font-medium text-[20px] border-b border-tertiary p-4">
                        Add Allergy
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-6">
                      <div>
                        <label className="block text-[18px] font-medium text-text-primary mb-2">
                          Allergy Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter allergy name"
                          value={newAllergy.name}
                          onChange={(e) =>
                            setNewAllergy((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium focus:border-transparent outline-none transition-all text-[#7C7C7C] placeholder:text-text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-[18px] font-medium text-text-primary mb-3">
                          Severity
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <SeverityButton
                            severity="Mild"
                            selected={newAllergy.severity === "Mild"}
                            onClick={() =>
                              setNewAllergy((prev) => ({
                                ...prev,
                                severity: "Mild",
                              }))
                            }
                          />
                          <SeverityButton
                            severity="Moderate"
                            selected={newAllergy.severity === "Moderate"}
                            onClick={() =>
                              setNewAllergy((prev) => ({
                                ...prev,
                                severity: "Moderate",
                              }))
                            }
                          />
                          <SeverityButton
                            severity="Severe"
                            selected={newAllergy.severity === "Severe"}
                            onClick={() =>
                              setNewAllergy((prev) => ({
                                ...prev,
                                severity: "Severe",
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex ">
                          <Button
                            type="button"
                            onClick={() => {
                              setNewAllergy({ name: "", severity: "" });
                              setAllergyModalOpen(false);
                            }}
                            className="border border-text-secondary bg-white text-text-secondary hover:border-gray-400 font-medium"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={handleAddAllergy}
                            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-[#1a588a] cursor-pointer border border-primary-500"
                            disabled={!newAllergy.name || !newAllergy.severity}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-[#F0F5FE] px-4 py-3 grid grid-cols-3 text-sm font-medium text-gray-700">
                  <div>Name</div>
                  <div className="text-center">Dosage</div>
                  <div className="text-right">Action</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {formData.allergies.map((allergy, index) => (
                    <div
                      key={allergy.id}
                      className={`px-4 py-3 grid grid-cols-3 items-center ${
                        index % 2 !== 0 ? "bg-[#F0F5FE]" : ""
                      }`}
                    >
                      <div className="text-gray-900">{allergy.name}</div>
                      <div className="text-gray-600 text-center">
                        {allergy.severity}
                      </div>
                      <div className="text-right pr-5">
                        <button
                          type="button"
                          onClick={() => handleRemoveAllergy(allergy.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Medications Section */}
            <div className="bg-white p-2 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Current Medications
                </h2>
                <Dialog
                  open={medicationModalOpen}
                  onOpenChange={setMedicationModalOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center text-primary-500 hover:text-primary-500 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-text-primary font-medium text-[20px] border-b border-tertiary p-4">
                        Add Medication
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-6">
                      <div>
                        <label className="block text-[18px] font-medium text-text-primary mb-2">
                          Medication Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter medication name"
                          value={newMedication.name}
                          onChange={(e) =>
                            setNewMedication((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium focus:border-transparent outline-none transition-all text-[#7C7C7C] placeholder:text-text-secondary"
                        />
                      </div>
                      <div>
                        <label className="block text-[18px] font-medium text-text-primary mb-3">
                          Frequency
                        </label>
                        <select
                          value={newMedication.frequency}
                          onChange={(e) =>
                            setNewMedication((prev) => ({
                              ...prev,
                              frequency: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                          <option value="">Select frequency</option>
                          <option value="Once daily">Once daily</option>
                          <option value="Twice daily">Twice daily</option>
                          <option value="Three times daily">
                            Three times daily
                          </option>
                          <option value="As needed">As needed</option>
                        </select>
                      </div>
                      <div className="flex justify-end">
                        <div className="flex">
                          <Button
                            type="button"
                            onClick={() => {
                              setNewMedication({ name: "", frequency: "" });
                              setMedicationModalOpen(false);
                            }}
                            className="border border-text-secondary bg-white text-text-secondary hover:border-gray-400 font-medium"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            onClick={handleAddMedication}
                            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-[#1a588a] cursor-pointer border border-primary-500"
                            disabled={
                              !newMedication.name || !newMedication.frequency
                            }
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-[#F0F5FE] px-4 py-3 grid grid-cols-3 text-sm font-medium text-gray-700">
                  <div>Name</div>
                  <div className="text-center">Frequency</div>
                  <div className="text-right">Action</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {formData.medications.map((medication, index) => (
                    <div
                      key={medication.id}
                      className={`px-4 py-3 grid grid-cols-3 items-center ${
                        index % 2 !== 0 ? "bg-[#F0F5FE]" : ""
                      }`}
                    >
                      <div className="text-gray-900">{medication.name}</div>
                      <div className="text-gray-600 text-center">
                        {medication.frequency}
                      </div>
                      <div className="text-right pr-5">
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(medication.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Existing Conditions Section */}
            <div className="bg-white p-2 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Existing Conditions
                </h2>
                <Dialog
                  open={conditionModalOpen}
                  onOpenChange={setConditionModalOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-text-primary font-medium text-[20px] border-b border-tertiary p-4">
                        Add Existing Conditions
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-6">
                      <div>
                        <label className="block text-[18px] font-medium text-text-primary mb-2">
                          Existing Conditions Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter existing conditions name"
                          value={newCondition}
                          onChange={(e) => setNewCondition(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium focus:border-transparent outline-none transition-all text-[#7C7C7C] placeholder:text-text-secondary"
                        />
                      </div>
                      <div className="flex justify-end">
                        <div className="flex">
                          <Button
                          type="button"
                          onClick={() => {
                            setNewCondition("");
                            setConditionModalOpen(false);
                          }}
                          className="border border-text-secondary bg-white text-text-secondary hover:border-gray-400 font-medium"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleAddCondition}
                          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-[#1a588a] cursor-pointer border border-primary-500"
                          disabled={!newCondition.trim()}
                        >
                          Add
                        </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-3">
                {conditionOptions.map((condition) => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.conditions.includes(condition)}
                      onChange={() => handleConditionChange(condition)}
                      className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lifestyle Factors Section */}
            <div className="bg-white p-2 rounded-lg mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Lifestyle Factors
                </h2>
                <Dialog
                  open={lifestyleModalOpen}
                  onOpenChange={setLifestyleModalOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center text-primary-500 hover:text-primary-500 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-text-primary font-medium text-[20px] border-b border-tertiary p-4">
                        Add Lifestyle Factors
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 p-6">
                      <div>
                        <label className="block text-[18px] font-medium text-text-primary mb-2">
                          Lifestyle Factors Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter lifestyle factors name"
                          value={newLifestyleFactor}
                          onChange={(e) =>
                            setNewLifestyleFactor(e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium focus:border-transparent outline-none transition-all text-[#7C7C7C] placeholder:text-text-secondary"
                        />
                      </div>
                      <div className="flex justify-end">
                        <div className="flex">
                          <Button
                          type="button"
                          onClick={() => {
                            setNewLifestyleFactor("");
                            setLifestyleModalOpen(false);
                          }}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={handleAddLifestyleFactor}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                          disabled={!newLifestyleFactor.trim()}
                        >
                          Add
                        </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-3">
                {lifestyleOptions.map((factor) => (
                  <label key={factor} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.lifestyleFactors.includes(factor)}
                      onChange={() => handleLifestyleChange(factor)}
                      className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-gray-700">{factor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Link href="/patient-information">
                <button
                  type="button"
                  className="flex cursor-pointer bg-white items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              </Link>
              <Link href="/insurance-info">
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-[#1a588a] cursor-pointer transition-colors"
                >
                  Save & Next
                </button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default MedicalInformationPage;
