// app/doctor-search/page.tsx
'use client'

import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { 
  useGetDoctorsQuery, 
  useToggleFavoriteMutation
} from "@/redux/features/doctor/doctorApi"

export default function DoctorSearch() {
  const [activeTab, setActiveTab] = useState<'all' | 'favorite'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // RTK Query hooks
  const { data: doctors = [], isLoading, error, refetch } = useGetDoctorsQuery()
  
  // Favorite mutation
  const [toggleFavorite, { isLoading: isTogglingFavorite }] = useToggleFavoriteMutation()

  // Handle favorite toggle
  const handleToggleFavorite = async (doctorId: string, currentFavoriteStatus: boolean) => {
    try {
      await toggleFavorite({ doctorId, isFavorite: currentFavoriteStatus }).unwrap()
      // Refetch doctors to get updated favorite status
      refetch()
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  // Filter doctors based on active tab and search term
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesTab = activeTab === 'all' || doctor.isFavorite
    const matchesSearch = searchTerm === '' || 
      doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.discipline?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesTab && matchesSearch
  })

  const favoriteCount = doctors.filter((doctor) => doctor.isFavorite).length

  if (isLoading) {
    return (
      <div className="mx-auto p-3 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Error loading doctors:', error)
    return (
      <div className="mx-auto p-3 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Failed to load doctors. Please try again later.</p>
        </div>
      </div>
    )
  }

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          {searchTerm && ` (${filteredDoctors.length} found)`}
        </h2>
      </div>

      <div className="w-full mx-auto p-2 bg-gray-50 min-h-screen">
        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              {/* Doctor Image with Favorite Button */}
              <div className="relative">               
                <div className="overflow-hidden"> 
                  <img                 
                    src={doctor.profilePicture ? 
                      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/${doctor.profilePicture.replace(/\\/g, '/')}` 
                      : "/default-doctor.png"
                    }                 
                    alt={doctor.fullName}                 
                    className="object-cover p-3 rounded-3xl w-full h-48"               
                   
                  />                             
                  {/* Favorite Heart Icon */}               
                  <button
                    onClick={() => handleToggleFavorite(doctor._id, doctor.isFavorite)}
                    className="absolute top-5 right-5 p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200"
                    disabled={isTogglingFavorite}
                  >                 
                    {doctor.isFavorite ? (                   
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.70584 12.4371C0.418241 8.41709 1.92424 3.41909 6.14464 2.06069C8.36464 1.34429 11.1042 1.94189 12.6606 4.08869C14.1282 1.86269 16.947 1.34909 19.1646 2.06069C23.3838 3.41909 24.8982 8.41709 23.6118 12.4371C21.6078 18.8091 14.6154 22.1283 12.6606 22.1283C10.707 22.1283 3.77704 18.8835 1.70584 12.4371Z" fill="#E63D75" stroke="#E63D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
                        <path d="M17.1465 6.57812C18.5949 6.72693 19.5009 7.87533 19.4469 9.48453" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
                      </svg>                  
                    ) : (                  
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <path fillRule="evenodd" clipRule="evenodd" d="M1.70584 12.4371C0.418241 8.41709 1.92424 3.41909 6.14464 2.06069C8.36464 1.34429 11.1042 1.94189 12.6606 4.08869C14.1282 1.86269 16.947 1.34909 19.1646 2.06069C23.3838 3.41909 24.8982 8.41709 23.6118 12.4371C21.6078 18.8091 14.6154 22.1283 12.6606 22.1283C10.707 22.1283 3.77704 18.8835 1.70584 12.4371Z" stroke="#E63D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
                        <path d="M17.1465 6.57812C18.5949 6.72693 19.5009 7.87533 19.4469 9.48453" stroke="#E63D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/> 
                      </svg>                  
                    )}               
                  </button>
                </div>             
              </div>

              {/* Doctor Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {doctor.fullName}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {doctor.discipline}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link href={`/doctor/book/${doctor._id}`}>
                    <button className="w-full bg-[#2E8BC9] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#2578ac] transition-colors duration-200 mb-2">
                      Book Now
                    </button>
                  </Link>
                
                  <Link href={`/doctor/details/${doctor._id}`}>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No doctors found matching your search.' : 'No doctors available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}