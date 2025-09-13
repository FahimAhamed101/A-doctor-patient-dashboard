"use client"
import { Search, Heart, Clock, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface Doctor {
  id: number
  name: string
  specialization: string
  organization: string
  image: string
  timesAvailable: number
  isFavorite: boolean
  isVerified?: boolean,
  specialty?:string
 
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Leo Marwick",
    specialization: "Heart Health Expert",
    organization: "Riverbend Health",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    timesAvailable: 3,
    isFavorite: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    organization: "Harmony Health",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    timesAvailable: 3,
    isFavorite: true,
    isVerified: true,
  },
  {
    id: 3,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    organization: "NeuroCare Center",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    timesAvailable: 2,
    isFavorite: true,
    isVerified: true,
  },
  {
    id: 4,
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    organization: "Children's Health Network",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    timesAvailable: 4,
    isFavorite: true,
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    specialization: "Orthopedic Surgeon",
    organization: "Bone & Joint Institute",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    timesAvailable: 1,
    isFavorite: true,
    isVerified: true,
  },
  {
    id: 6,
    name: "Dr. Olivia Parker",
    specialization: "Dermatologist",
    organization: "Skin Health Associates",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    timesAvailable: 5,
    isFavorite: false,
  },
  {
    id: 7,
    name: "Dr. Robert Kim",
    specialization: "Oncologist",
    organization: "Cancer Treatment Center",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    timesAvailable: 2,
    isFavorite: false,
    isVerified: true,
  },
]

export default function DoctorSearch() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorite'>('all')
  const favoriteCount = doctors.filter((doctor) => doctor.isFavorite).length
  
  const filteredDoctors = activeTab === 'favorite' 
    ? doctors.filter(doctor => doctor.isFavorite)
    : doctors

  return (
    <div className="mx-auto p-3 bg-gray-50 min-h-screen">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for a doctor by name or designation..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-12"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-6 mb-6">
        <button 
          className={`${activeTab === 'all' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'} rounded-none px-0 pb-2 font-medium text-sm`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`${activeTab === 'favorite' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-900'} rounded-none px-0 pb-2 font-medium text-sm`}
          onClick={() => setActiveTab('favorite')}
        >
          Favorite ({favoriteCount})
        </button>
      </div>

      {/* Available Doctor Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {activeTab === 'favorite' ? 'Favorite Doctors' : 'Available Doctors'}
        </h2>
      </div>

       <div className="w-full mx-auto p-2 bg-gray-50 min-h-screen">
  

      {/* Doctor Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredDoctors.map((doctor) => (
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
                <Link href="/doctor/book">
                  <button className="w-full bg-[#2E8BC9] text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                  Book Now
                </button>
                </Link>
              
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
  )
}