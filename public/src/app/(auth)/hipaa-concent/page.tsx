"use client";
import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

const HIPAAConsentPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-[600px] rounded-lg">
        {/* Header */}
        <h1 className="font-medium text-center text-[32px] text-gray-900 mb-8">
          HIPAA Consent
        </h1>

        {/* Greeting */}
        <div className="mb-6 bg-primary-50 p-4 rounded-lg">
          <p className=" text-[18px] text-black mb-3 font-bold">Hey</p>
          <p className="font-normal text-[18px] text-black leading-relaxed">
            Before we continue, we just need your OK on how we handle your
            health information.
          </p>
        </div>

        {/* Privacy Protection */}
        <div className="p-4 rounded-2xl bg-primary-100">
          <p className="font-normal text-[18px] text-black leading-relaxed">
            We follow strict HIPAA guidelines to protect your privacy and keep
            your data secure.
          </p>
          <br />
          <p className="font-normal text-[18px] text-black leading-relaxed">
            To keep improving your experience and help our technology get
            smarter over time, we may use some of your information — always
            anonymized and never linked to your name or identity.
          </p>
          <br />
          <p className="font-normal text-[18px] text-black leading-relaxed mb-5">
            Your privacy always comes first. You can choose how your data is
            used and change your preferences anytime.
          </p>
          <div className="bg-[#F2F8FD] rounded-2xl p-4 mb-2">
            <p className="font-normal text-[18px] text-black mb-3">
              Tap "I Agree" to continue.
            </p>
            <Link
              href="/patient-information"
              ><button className="bg-primary-500 cursor-pointer text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-[#3A8BC9] transition-colors flex items-center justify-center gap-2">
              <Check size={20} />I Agree
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HIPAAConsentPage;
