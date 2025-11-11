"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface InsuranceCard {
  id: string;
  insuranceProvider: string;
  policyNumber: string;
  phone: string;
  groupNumber: string;
  effectiveDate: string;
  expirationDate: string;
  deductible: string;
  insuranceCard: File | null;
  cardFileName?: string;
}

interface InsuranceContextType {
  insuranceCards: InsuranceCard[];
  addInsuranceCard: (card: Omit<InsuranceCard, "id">) => void;
  updateInsuranceCard: (id: string, card: Partial<InsuranceCard>) => void;
  deleteInsuranceCard: (id: string) => void;
}

const InsuranceContext = createContext<InsuranceContextType | undefined>(
  undefined
);

export const useInsurance = () => {
  const context = useContext(InsuranceContext);
  if (!context) {
    throw new Error("useInsurance must be used within an InsuranceProvider");
  }
  return context;
};

export const InsuranceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [insuranceCards, setInsuranceCards] = useState<InsuranceCard[]>([]);

  const addInsuranceCard = (card: Omit<InsuranceCard, "id">) => {
    const newCard: InsuranceCard = {
      ...card,
      id: Date.now().toString(),
      cardFileName: card.insuranceCard?.name || undefined,
    };
    setInsuranceCards((prev) => [...prev, newCard]);
  };

  const updateInsuranceCard = (
    id: string,
    updatedCard: Partial<InsuranceCard>
  ) => {
    setInsuranceCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, ...updatedCard } : card))
    );
  };

  const deleteInsuranceCard = (id: string) => {
    setInsuranceCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <InsuranceContext.Provider
      value={{
        insuranceCards,
        addInsuranceCard,
        updateInsuranceCard,
        deleteInsuranceCard,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
};
