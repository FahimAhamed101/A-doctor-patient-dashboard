"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PasswordChangedPage = () => {
  return (
    <div className="w-full md:w-[440px] px-4 flex flex-col md:items-center justify-center md:p-4">
      {/* Success Icon with Badge Design */}
      <div className="flex justify-center mb-6">
        <svg
          width="70"
          height="55"
          viewBox="0 0 70 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M67.6815 1.302C70.6207 3.77743 70.9972 8.16709 68.5221 11.1066L33.3637 52.8569C32.0765 54.3857 30.1942 55.2868 28.1958 55.3313C26.198 55.3758 24.2768 54.5589 22.9235 53.0886L2.41439 30.822C-0.189068 27.9955 -0.00822282 23.5929 2.81846 20.9898C5.64515 18.386 10.0473 18.5669 12.6507 21.3934L27.8075 37.8499L57.8766 2.14243C60.3523 -0.797123 64.7416 -1.17343 67.6815 1.302Z"
            fill="#2E8BC9"
          />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="font-medium text-center text-[32px] text-gray-900 mb-4">
        Password Changed!
      </h1>

      <p className="font-normal text-center text-[18px] text-Text-secondary leading-relaxed mb-8 md:w-[440px]">
        Return to the login page to enter your account with your new password.
      </p>

      {/* Back to Login Button */}
      <Link
        href="/login"
        className="bg-primary-500 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Sign In
      </Link>
    </div>
  );
};

export default PasswordChangedPage;
