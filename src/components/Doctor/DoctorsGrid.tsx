// components/DoctorsGrid.tsx
import DoctorCard from './DoctorCard';

// Match the same flexible interface
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

interface DoctorsGridProps {
  doctors: Doctor[];
  showFavoriteButton?: boolean;
  onToggleFavorite?: (doctorId: string, currentFavoriteStatus: boolean) => void;
  isTogglingFavorite?: boolean;
  variant?: 'default' | 'compact';
  emptyMessage?: string;
}

export default function DoctorsGrid({ 
  doctors, 
  showFavoriteButton = true,
  onToggleFavorite,
  isTogglingFavorite = false,
  variant = 'default',
  emptyMessage = "No doctors available."
}: DoctorsGridProps) {
  
  const gridClass = variant === 'compact' 
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6";

  return (
    <div className="w-full">
      {doctors.length > 0 ? (
        <div className={gridClass}>
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              showFavoriteButton={showFavoriteButton}
              onToggleFavorite={onToggleFavorite}
              isTogglingFavorite={isTogglingFavorite}
              variant={variant}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}