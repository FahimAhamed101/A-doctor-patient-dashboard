// app/doctor-search/page.tsx
'use client'

import { Search } from "lucide-react"
import { useState } from "react"
import { 
  useGetDoctorsQuery, 
  useToggleFavoriteMutation
} from "@/redux/features/doctor/doctorApi"
import DoctorsGrid from "@/components/Doctor/DoctorsGrid"

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

      <DoctorsGrid
        doctors={filteredDoctors}
        showFavoriteButton={true}
        onToggleFavorite={handleToggleFavorite}
        isTogglingFavorite={isTogglingFavorite}
        emptyMessage={searchTerm ? 'No doctors found matching your search.' : 'No doctors available.'}
      />
    </div>
  )
}