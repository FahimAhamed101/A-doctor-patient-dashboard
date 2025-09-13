"use client";
import React from "react";

const GoogleSignInButton = () => {
  return (
    <button
      type="button"
      className="bg-white shadow-[0px_3px_4px_0px_rgba(26,64,96,0.10)] text-primary-700 px-6 py-3 rounded-lg w-full flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer text-[16px] md:text-[18px]"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.6668 12.2362C21.6668 11.5702 21.6023 10.8828 21.4949 10.2383H12.1926V14.0408H17.5205C17.3056 15.2654 16.5967 16.3395 15.544 17.027L18.7235 19.4976C20.5926 17.7574 21.6668 15.2224 21.6668 12.2362Z"
          fill="#4280EF"
        />
        <path
          d="M12.1927 21.8609C14.8566 21.8609 17.0909 20.9801 18.7236 19.4763L15.5441 17.0272C14.6632 17.6287 13.5246 17.9725 12.1927 17.9725C9.61467 17.9725 7.44486 16.2323 6.64998 13.9121L3.38452 16.4257C5.06022 19.7556 8.45458 21.8609 12.1927 21.8609Z"
          fill="#34A353"
        />
        <path
          d="M6.64993 13.8908C6.24174 12.6662 6.24174 11.3343 6.64993 10.1097L3.38447 7.57471C1.98805 10.3675 1.98805 13.6545 3.38447 16.4258L6.64993 13.8908Z"
          fill="#F6B704"
        />
        <path
          d="M12.1927 6.04925C13.5891 6.02777 14.964 6.56485 15.9737 7.5316L18.788 4.6958C17.0049 3.02011 14.6418 2.11781 12.1927 2.13929C8.45458 2.13929 5.06022 4.24465 3.38452 7.57456L6.64998 10.1096C7.44486 7.76791 9.61467 6.04925 12.1927 6.04925Z"
          fill="#E54335"
        />
      </svg>
      Continue with Google
    </button>
  );
};

export default GoogleSignInButton;
