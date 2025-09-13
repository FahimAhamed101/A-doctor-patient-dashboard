"use client";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import React, { useState } from "react";

const HomePage = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Moule Marrk",
      specialty: "Cardiologist",
      location: "Sylhet Health Center",
      isFavorite: true,
      image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
      id: 2,
      name: "Dr. John Doe",
      specialty: "Dermatologist",
      location: "Los Angeles, CA",
      isFavorite: false,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    
  ];

  return (
    <>
      <div className="p-6 bg-Surface-Dashboard-dashboard-page h-screen flex flex-col gap-6 mb-10">
        {/* Hey Section */}
        <div className="w-full self-stretch p-3 shadow-md bg-Surface-warning rounded-lg inline-flex justify-start items-start gap-3 border md:border-0 border-Border-warning">
          <div className="flex-1 inline-flex flex-col justify-center items-start gap-2">
            <div className="self-stretch flex flex-col justify-start items-start gap-5 ">
              <div className="self-stretch flex flex-col justify-start items-start gap-[3px] ">
                <div className="self-stretch justify-center ">
                  <span className="text-Text-primary text-base font-bold  leading-tight tracking-tight">
                    Hey!
                    <br />
                  </span>
                  <span className="text-Text-primary text-base font-medium  leading-tight tracking-tight">
                    Make sure your profile is at least 70% complete before you
                    can book an appointment.
                  </span>
                </div>
              </div>
            </div>
            <div
              data-show-left-icon-2="false"
              data-show-left-icon="false"
              data-state="Default"
              data-style="Outline"
              data-variant="Secondary"
              className="rounded-lg inline-flex justify-start items-center gap-2 overflow-hidden"
            >
              <div className="justify-center text-[#2E8BC9] text-base font-medium  capitalize leading-tight tracking-tight">
                Start
              </div>
              <div className="w-4 h-4 relative">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3336 8H2.66699"
                    stroke="#2E8BC9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.0001 11.3327C10.0001 11.3327 13.3333 8.87775 13.3333 7.99935C13.3333 7.12095 10 4.66602 10 4.66602"
                    stroke="#2E8BC9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Next Appointment */}
        <div className="self-stretch flex justify-center items-center gap-2.5">
          <div className="justify-center text-[#3D3D3D] text-xl md:text-2xl font-medium  leading-loose tracking-tight">
            Next Appointment
          </div>
          <div className="flex-1 text-right justify-center text-Text-action text-sm md:text-lg font-medium  leading-normal tracking-tight">
            View all
          </div>
        </div>

    
      {/* Doctor Cards Grid - now 2 columns on md screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="p-3 bg-white rounded-lg shadow-[0px_3px_4px_0px_rgba(26,64,96,0.10)] flex flex-col gap-3"
          >
            {/* Doctor Header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  className="w-16 h-16 rounded-[40.50px] object-cover"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col gap-0.5">
                    <div className="text-xl font-medium  leading-7 tracking-tight text-gray-900">
                      {doctor.name}
                    </div>
                    <div className="text-base font-medium  leading-tight tracking-tight text-gray-600">
                      {doctor.specialty}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4163 1.66602C6.50432 1.66602 3.33301 4.68087 3.33301 8.39993C3.33301 10.5264 4.21842 12.1799 5.98926 13.6568C7.23744 14.6978 8.74959 16.4269 9.65742 17.8286C10.0928 18.5007 10.7086 18.5007 11.1753 17.8286C12.1291 16.4548 13.5953 14.6978 14.8434 13.6568C16.6143 12.1799 17.4997 10.5264 17.4997 8.39993C17.4997 4.68087 14.3283 1.66602 10.4163 1.66602Z"
                        stroke="#3D75E6"
                        strokeWidth="1.25"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.75 5.83398V8.33398M8.75 8.33398V10.834M8.75 8.33398H12.0833M12.0833 5.83398V8.33398M12.0833 8.33398V10.834"
                        stroke="#3D75E6"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-base font-medium  leading-tight tracking-tight text-gray-900">
                      {doctor.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-10 p-2 bg-[#2E8BC9] rounded-lg shadow-[0px_0px_4px_1px_rgba(228,239,250,1.00)] flex justify-center items-center gap-3">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.5C17.5221 2.5 21.9998 6.78341 22 12.0664C22 17.3496 17.5222 21.6338 12 21.6338C11.3507 21.6347 10.7032 21.5738 10.0654 21.4541C9.60664 21.3679 9.37703 21.3252 9.2168 21.3496C9.05654 21.3741 8.82916 21.4947 8.375 21.7363C7.0902 22.4196 5.59215 22.6605 4.15137 22.3926C4.69879 21.7191 5.07229 20.9111 5.2373 20.0449C5.3373 19.5149 5.08986 18.9999 4.71875 18.623C3.03325 16.9115 2 14.6048 2 12.0664C2.00017 6.78341 6.47788 2.5 12 2.5ZM8 11.5C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H8.00879C8.56107 13.5 9.00879 13.0523 9.00879 12.5C9.00879 11.9477 8.56107 11.5 8.00879 11.5H8ZM11.9951 11.5C11.443 11.5002 10.9951 11.9478 10.9951 12.5C10.9951 13.0522 11.443 13.4998 11.9951 13.5H12.0049L12.1064 13.4951C12.6109 13.4441 13.0049 13.0179 13.0049 12.5C13.0049 11.9821 12.6109 11.5559 12.1064 11.5049L12.0049 11.5H11.9951ZM15.9912 11.5C15.4389 11.5 14.9912 11.9477 14.9912 12.5C14.9912 13.0523 15.4389 13.5 15.9912 13.5H16C16.5523 13.5 17 13.0523 17 12.5C17 11.9477 16.5523 11.5 16 11.5H15.9912Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="">
            <div className="relative w-full py-2">
              <p className="text-sm font-medium text-gray-700 inline-block pr-2 bg-white relative z-10">
               Date & Time
              </p>
              <span className="absolute left-0 right-0 top-1/2 h-px bg-gray-200 -z-0"></span>
            </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">May 16, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">10:30 PM</span>
                </div>
                <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33301 9.33398L5.66634 11.6673L12.6663 4.33398" stroke="#237B10" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <span className="text-green-600 text-sm font-medium">Complete</span>
                </div>
              </div>
            </div>

           
            {/* Action Buttons */}
            <div className="pt-3 flex flex-col gap-2.5">
              <div className="text-base font-medium  leading-tight tracking-tight text-gray-600">
                Can't make it on this date?
              </div>
              <div className="flex items-center gap-4">
                <div className="px-3.5 py-2 bg-[#EEFEE7] shadow-md cursor-pointer rounded-lg  flex items-center gap-2 group">
               <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3178 13C12.9345 11.9251 14 10.087 14 8C14 4.68629 11.3137 2 8 2C7.54173 2 7.09547 2.05137 6.66667 2.14868M11.3178 13V10.6667M11.3178 13H13.6667M4.66667 3.01037C3.05869 4.08671 2 5.91972 2 8C2 11.3137 4.68629 14 8 14C8.45827 14 8.90453 13.9486 9.33333 13.8513M4.66667 3.01037V5.33333M4.66667 3.01037H2.33333" stroke="#2E8BC9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                  <div className="text-base font-medium  capitalize leading-tight tracking-wide text-[#2E8BC9] cursor-pointer">
                    Reschedule
                  </div>
                </div>
                <div className="text-base font-medium  leading-tight tracking-tight text-[#7C7C7C]">
                  OR
                </div>
                <div className="px-3.5 py-2 bg-white rounded-lg shadow-md flex items-center gap-2">
                  <div className="text-base font-medium  capitalize leading-tight tracking-tight text-[#B42121] cursor-pointer">
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
 

        {/* Available Doctor */}
        <div className="self-stretch flex justify-center items-center gap-2.5">
          <div className="justify-center text-Text-primary text-xl md:text-2xl font-medium  leading-loose tracking-tight">
            Available Doctor
          </div>
          <div className="flex-1 text-right justify-center text-Text-action text-sm md:text-lg font-medium  leading-normal tracking-tight">
            View all
          </div>
        </div>

    <div className="w-full mx-auto p-4 bg-gray-50 min-h-screen">
  

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            {/* Doctor Image with Favorite Button */}
            <div className="relative">               
  <div className=" overflow-hidden"> 
    <img                 
      src="./doctor.png"                 
      alt={doctor.name}                 
      className=" object-cover p-3 rounded-3xl"               
    />                             
    {/* Favorite Heart Icon */}               
    <button                                 
      className="absolute top-5 right-5 hover:bg-opacity-100 transition-all duration-200"               
    >                 
      {doctor.isFavorite ? (                   
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
          <path fillRule="evenodd" clipRule="evenodd" d="M1.70584 12.4371C0.418241 8.41709 1.92424 3.41909 6.14464 2.06069C8.36464 1.34429 11.1042 1.94189 12.6606 4.08869C14.1282 1.86269 16.947 1.34909 19.1646 2.06069C23.3838 3.41909 24.8982 8.41709 23.6118 12.4371C21.6078 18.8091 14.6154 22.1283 12.6606 22.1283C10.707 22.1283 3.77704 18.8835 1.70584 12.4371Z" fill="#E63D75" stroke="#E63D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
          <path d="M17.1465 6.57812C18.5949 6.72693 19.5009 7.87533 19.4469 9.48453" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
        </svg>                  
      ) : (                  
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
          <path fillRule="evenodd" clipRule="evenodd" d="M1.70584 12.4371C0.418241 8.41709 1.92424 3.41909 6.14464 2.06069C8.36464 1.34429 11.1042 1.94189 12.6606 4.08869C14.1282 1.86269 16.947 1.34909 19.1646 2.06069C23.3838 3.41909 24.8982 8.41709 23.6118 12.4371C21.6078 18.8091 14.6154 22.1283 12.6606 22.1283C10.707 22.1283 3.77704 18.8835 1.70584 12.4371Z" fill="#E63D75" stroke="#E63D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
          <path d="M17.1465 6.57812C18.5949 6.72693 19.5009 7.87533 19.4469 9.48453" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
        </svg>                  
      )}               
    </button>
  </div>             
</div>

            {/* Doctor Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {doctor.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {doctor.specialty}
              </p>

              {/* Action Buttons */}
              <div className="space-y-2 space-x-4">
                <button className="w-full bg-[#2E8BC9] text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                  Book Now
                </button>
                <button className="w-full shadow-md text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </>
  );
};

export default HomePage;
