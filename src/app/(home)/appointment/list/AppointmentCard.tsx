"use client";

import { CheckCircle2, XCircle } from 'lucide-react';

interface Appointment {
  id: number;
  time: string;
  doctor: string;
  status: string;
  isHighlighted: boolean;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onViewDetails: () => void;
}

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-orange-100 text-orange-600";
      case "Next Follow Up In 7 Days":
        return "bg-[#F0F5FE] text-[#2B4DCA]";
      case "Complete":
        return "bg-[#EEFEE7] text-[#237B10]";
      case "Canceled":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Complete": return <CheckCircle2 className="w-4 h-4 mr-1" />;
    case "Canceled": return <XCircle className="w-4 h-4 mr-1" />;
    default: return null;
  }
};

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ 
  appointment,
  onViewDetails
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 rounded-lg shadow-sm ${
    appointment.isHighlighted 
      ? "border-l-4 border-[#2E8BC9] bg-blue-50" 
      : "bg-white border-l-4 border-[#DCDCDC]"
  }`}>
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-500">Appointment Time</span>
      <span className="font-sm">{appointment.time}</span>
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-500">Doctor</span>
      <span className="font-sm">{appointment.doctor}</span>
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-500">Status</span>
      <div className="flex flex-1/3">
        <span className={`flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${getStatusClasses(appointment.status)}`}>
          {getStatusIcon(appointment.status)}
          {appointment.status}
        </span>
      </div>
    </div>
    <div className="flex flex-col items-start md:items-end gap-2">
      <span className="text-sm text-gray-500">Action</span>
      <button 
        onClick={onViewDetails}
        className="text-blue-500 hover:underline font-medium"
      >
        Details
      </button>
    </div>
  </div>
);