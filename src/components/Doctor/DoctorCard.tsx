// components/DoctorCard.tsx
import Link from "next/link";
import Image from "next/image";

// More flexible interface that matches API response
interface Doctor {
  _id: string;
  fullName: string;
  discipline: string;
  profilePicture?: string;
  clinicName?: string;
  officeLocation?: string[];
  qualifications?: string[] | Array<{ degree: string; university: string }> | any[];
  popularReasonsToVisit?: string[];
  isFavorite?: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
  showFavoriteButton?: boolean;
  onToggleFavorite?: (doctorId: string, currentFavoriteStatus: boolean) => void;
  isTogglingFavorite?: boolean;
  variant?: 'default' | 'compact';
}

export default function DoctorCard({ 
  doctor, 
  showFavoriteButton = true, 
  onToggleFavorite,
  isTogglingFavorite = false,
  variant = 'default'
}: DoctorCardProps) {
  
  // Helper function to build profile picture URL
  const getProfilePictureUrl = (profilePicture: string | undefined): string => {
    if (!profilePicture) {
      return "/default-doctor.png";
    }
    
    const cleanPath = profilePicture.replace(/\\/g, '/');
    
    if (cleanPath.startsWith('http')) {
      return cleanPath;
    }
    
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath;
    
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'}/${normalizedPath}`;
  };

  // Format qualifications to handle different API response formats
  const formatQualifications = (): string => {
    if (!doctor.qualifications) {
      return "";
    }

    // Handle string array
    if (Array.isArray(doctor.qualifications) && doctor.qualifications.length > 0) {
      if (typeof doctor.qualifications[0] === 'string') {
        return (doctor.qualifications as string[]).join(', ');
      }
      
      // Handle object array with degree property
      if (typeof doctor.qualifications[0] === 'object' && doctor.qualifications[0] !== null) {
        return (doctor.qualifications as Array<{ degree: string; university: string }>)
          .map(q => q.degree)
          .filter(degree => degree) // Remove empty/null degrees
          .join(', ');
      }
    }
    
    return "";
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="p-4 flex items-center gap-4">
          <Image
            src={getProfilePictureUrl(doctor.profilePicture)}
            alt={doctor.fullName}
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{doctor.fullName}</h3>
            <p className="text-gray-600 text-sm">{doctor.discipline}</p>
            <p className="text-gray-500 text-xs">{doctor.clinicName}</p>
          </div>
          <Link href={`/doctor/book-overview/${doctor._id}`}>
            <button className="bg-[#2E8BC9] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2578ac] transition-colors duration-200">
              Book
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Doctor Image with Favorite Button */}
      <div className="relative">               
        <div className="overflow-hidden"> 
          <Image
            src={getProfilePictureUrl(doctor.profilePicture)}
            alt={doctor.fullName}
            width={300}
            height={192}
            className="object-cover p-3 rounded-3xl w-full h-48"
          />                             
          {/* Favorite Heart Icon */}               
          {showFavoriteButton && onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(doctor._id, !!doctor.isFavorite)}
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
          )}
        </div>             
      </div>

      {/* Doctor Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {doctor.fullName}
        </h3>
        <p className="text-gray-600 text-sm mb-1">
          {doctor.discipline}
        </p>
        
        {/* Qualifications - Only show if available */}
        {formatQualifications() && (
          <p className="text-gray-500 text-xs mb-2">
            {formatQualifications()}
          </p>
        )}
        
        {doctor.clinicName && (
          <p className="text-gray-600 text-sm mb-3">
            {doctor.clinicName}
          </p>
        )}

        {/* Popular Reasons */}
        {doctor.popularReasonsToVisit && doctor.popularReasonsToVisit.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Common visits:</p>
            <div className="flex flex-wrap gap-1">
              {doctor.popularReasonsToVisit.slice(0, 2).map((reason, index) => (
                <span 
                  key={index}
                  className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full"
                >
                  {reason}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link href={`/doctor/book-overview/${doctor._id}`}>
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
  );
}