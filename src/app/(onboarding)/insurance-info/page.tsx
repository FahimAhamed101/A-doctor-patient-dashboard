"use client";

import React, { useState } from "react";
import { User, Eye, Edit, Trash2 } from "lucide-react";
import { useInsurance } from "../InsuranceContext";
import Button from "@/components/UI/Button";
import Link from "next/link";
import Card from "@/components/UI/Card";

interface InsuranceCard {
  id: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  phone: string;
  effectiveDate: string;
  expirationDate: string;
  deductible: string;
  cardImage?: string;
}

const MedicalInformationPage = () => {
  const { insuranceCards, deleteInsuranceCard } = useInsurance();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this insurance card?")) {
      setDeletingId(id);
      try {
        deleteInsuranceCard(id);
      } catch (error) {
        console.error("Error deleting insurance card:", error);
        alert("Error deleting insurance card. Please try again.");
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle final form submission
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center md:p-4">
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

              <div className="flex-1 h-px bg-primary-500 mb-4"></div>

              <div className="flex flex-col justify-center items-center">
                <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="text-sm text-gray-600 font-medium">Step</span>
              </div>
            </div>

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
                    d="M14 8.5C14 9.60453 13.1046 10.5 12 10.5C10.8954 10.5 10 9.60453 10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.59003 13.6482C8.96125 14.0167 7.31261 14.7693 8.31674 15.711C8.80725 16.171 9.35355 16.5 10.0404 16.5H13.9596C14.6464 16.5 15.1928 16.171 15.6833 15.711C16.6874 14.7693 15.0388 14.0167 14.41 13.6482C12.9355 12.7839 11.0645 12.7839 9.59003 13.6482Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 11.1833V8.28029C21 6.64029 21 5.82028 20.5959 5.28529C20.1918 4.75029 19.2781 4.49056 17.4507 3.9711C16.2022 3.6162 15.1016 3.18863 14.2223 2.79829C13.0234 2.2661 12.424 2 12 2C11.576 2 10.9766 2.2661 9.77771 2.79829C8.89839 3.18863 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z"
                    stroke="#3D3D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <h1 className=" ml-3 text-2xl font-semibold text-gray-900">
                  Insurance Information
                </h1>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Greetings! To keep your insurance information current and
                facilitate ongoing communication with your healthcare providers,
                we kindly request that you provide your insurance details.
              </p>
            </div>

            {/* Add New Card Button */}
            <div className="mb-8">
              <Link href="/insurance-info/add-new">
                {insuranceCards.length === 0 ? (
                  <Button className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors font-medium">
                    + Add Primary Card
                  </Button>
                ) : (
                  <Button className="w-full border border-primary-500 px-6 py-3 bg-white text-primary-500 rounded-lg hover:bg-action-hover transition-colors font-medium hover:text-white">
                    + Add Other Card
                  </Button>
                )}
              </Link>
            </div>

            {/* Insurance Cards List */}
            {insuranceCards.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No insurance cards added yet.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Click "Add New Card" to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {insuranceCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="border border-gray-200 rounded-lg p-6 bg-gray-50"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Card-{index + 1}
                    </h3>

                    <div className="space-y-4">
                      {/* Insurance Provider */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Insurance Provider
                        </label>
                        <p className="text-gray-900">
                          {card.insuranceProvider}
                        </p>
                      </div>

                      {/* Policy Number */}
                      {card.policyNumber && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Policy Number
                          </label>
                          <p className="text-gray-900">{card.policyNumber}</p>
                        </div>
                      )}

                      {/* Group Number */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Group Number
                        </label>
                        <p className="text-gray-900">{card.groupNumber}</p>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <p className="text-gray-900">{card.phone}</p>
                      </div>

                      {/* Dates */}
                      {(card.effectiveDate || card.expirationDate) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {card.effectiveDate && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Effective Date
                              </label>
                              <p className="text-gray-900">
                                {formatDate(card.effectiveDate)}
                              </p>
                            </div>
                          )}
                          {card.expirationDate && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expiration Date
                              </label>
                              <p className="text-gray-900">
                                {formatDate(card.expirationDate)}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Deductible */}
                      {card.deductible && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deductible
                          </label>
                          <p className="text-gray-900">{card.deductible}</p>
                        </div>
                      )}

                      {/* Insurance Card File */}
                      {card.cardFileName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Insurance Card
                          </label>
                          <div className="flex items-center space-x-3">
                            <button className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                              <Eye className="w-4 h-4 mr-2" />
                              View Card
                            </button>
                            <span className="text-sm text-gray-600">
                              {card.cardFileName}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        <button className="flex-1 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                          <Edit className="w-4 h-4 inline mr-2" />
                          Edit Details
                        </button>
                        <button
                          onClick={() => handleDelete(card.id)}
                          disabled={deletingId === card.id}
                          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === card.id ? (
                            "Deleting..."
                          ) : (
                            <>
                              <Trash2 className="w-4 h-4 inline mr-2" />
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8">
              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Link href="/medical-info">
                  <button
                    type="button"
                    className="flex cursor-pointer items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                </Link>
                <Link href="/home">
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-action-hover transition-colors"
                  >
                    Save
                  </button>
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicalInformationPage;
