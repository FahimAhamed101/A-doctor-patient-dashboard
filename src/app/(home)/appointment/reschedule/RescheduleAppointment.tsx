"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAppointmentDetailsQuery, useRescheduleAppointmentMutation } from "@/redux/features/appointments/appointmentsApi";
import { useJoinWaitlistMutation } from "@/redux/features/waitlist/waitlistApi";

interface WaitlistPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinWaitlist: (option: 'next_available' | 'specific_date', specificDate?: string) => Promise<void>;
  onCancel?: () => void;
  doctorId: string;
  isLoading?: boolean;
}

const WaitlistPopup: React.FC<WaitlistPopupProps> = ({
  isOpen,
  onClose,
  onJoinWaitlist,
  onCancel,
  doctorId,
  isLoading = false
}) => {
  const [selectedOption, setSelectedOption] = useState<'next_available' | 'specific_date'>('next_available');
  
  if (!isOpen) return null;

  const handleJoinWaitlist = async () => {
    await onJoinWaitlist(
      selectedOption, 
      selectedOption === 'specific_date' ? '2025-06-04' : undefined
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        {/* Header with alarm clock icon */}
        <div className="mb-6">
          <div className="mx-auto rounded-full flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 19L3 21M19 19L21 21" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 9.5V13.5L14 15.5" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3.5V2" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 2H14" stroke="#2B4DCA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="text-lg p-2 font-semibold text-gray-900 text-center ">Waitlist</h3>
          </div>
         
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            Get notified if an earlier<br />appointment becomes available.
          </p>
        </div>

        {/* Radio Options */}
        <div className="space-y-4 mb-6">
          <label className="flex items-start cursor-pointer">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name="waitlist-option"
                value="next_available"
                checked={selectedOption === 'next_available'}
                onChange={(e) => setSelectedOption(e.target.value as 'next_available')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900 mb-1">Next available</div>
              <div className="text-xs text-gray-500 leading-tight">
                We'll alert you as soon as a new<br />slot opens up.
              </div>
            </div>
          </label>

          <label className="flex items-start cursor-pointer">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name="waitlist-option"
                value="specific_date"
                checked={selectedOption === 'specific_date'}
                onChange={(e) => setSelectedOption(e.target.value as 'specific_date')}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                disabled={isLoading}
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-900 mb-1">This day</div>
              <div className="text-xs text-gray-500">Jun 4, 2025</div>
            </div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <button
            onClick={handleJoinWaitlist}
            disabled={isLoading}
            className="w-full text-[#2E8BC9] border-t border-[#DCDCDC] font-semibold py-3 px-6 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Joining...' : 'Join Waitlist'}
          </button>
          <button
            onClick={onCancel || onClose}
            disabled={isLoading}
            className="w-full text-[#B42121] border-t border-[#DCDCDC] font-semibold py-3 px-6 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Calendar utility functions
const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const emptyCells = [];
  for (let i = 0; i < firstDay; i++) {
    emptyCells.push(null);
  }

  const dayCells = [];
  for (let i = 1; i <= daysInMonth; i++) {
    dayCells.push(i);
  }

  const allCells = [...emptyCells, ...dayCells];
  const rows = [];
  
  for (let i = 0; i < allCells.length; i += 7) {
    rows.push(allCells.slice(i, i + 7));
  }

  return rows;
};

// Convert time string to 24-hour format for API
const timeTo24Hour = (timeStr: string): string => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
};

export default function RescheduleAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('id') || '6915039bba268c6591014277';
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1)); // February 2025
  const [selectedDate, setSelectedDate] = useState<number | null>(4);
  const [selectedTime, setSelectedTime] = useState<string>("2:15 PM");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);

  // RTK Query hooks
  const { data: appointment, isLoading: isLoadingAppointment, error } = useGetAppointmentDetailsQuery(appointmentId);
  const [rescheduleAppointment, { isLoading: isRescheduling }] = useRescheduleAppointmentMutation();
  const [joinWaitlist, { isLoading: isJoiningWaitlist }] = useJoinWaitlistMutation();

  // Generate calendar
  const calendarRows = generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

  // Available time slots
  const timeSlots = [
    "11:45 AM", "2:15 PM", "4:30 PM",
    "6:20 PM", "10:05 PM", "7:00 PM"
  ];

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getMonthYearString = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleReschedule = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    try {
      // Create the new date with selected date and time
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate);
      
      // Convert selected time to 24-hour format and set it
      const time24Hour = timeTo24Hour(selectedTime);
      const [hours, minutes] = time24Hour.split(':');
      newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // Format for API (ISO string)
      const formattedDateTime = newDate.toISOString();
      
      console.log('Rescheduling to:', {
        selectedDate,
        selectedTime,
        formattedDateTime,
        display: newDate.toLocaleString()
      });

      const result = await rescheduleAppointment({
        appointmentId,
        newDateTime: formattedDateTime
      }).unwrap();

      console.log('Reschedule successful:', result);
      router.push('/doctor/book-report');
    } catch (error) {
      console.error('Reschedule failed:', error);
      alert('Failed to reschedule appointment. Please try again.');
    }
  };

  const handleJoinWaitlist = async (option: 'next_available' | 'specific_date', specificDate?: string) => {
    try {
      if (!appointment?.doctorId?._id) {
        console.error('No doctor ID available');
        return;
      }

      const waitlistData = {
        doctorId: appointment.doctorId._id,
        preference: option,
        ...(specificDate && { specificDate })
      };

      const result = await joinWaitlist(waitlistData).unwrap();
      console.log('Joined waitlist successfully:', result);
      
      setShowWaitlistPopup(false);
      router.push('/waitlist');
    } catch (error) {
      console.error('Failed to join waitlist:', error);
      alert('Failed to join waitlist. Please try again.');
    }
  };

  const handleWaitlistCancel = () => {
    setShowWaitlistPopup(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoadingAppointment) {
    return (
      <div className="max-w-2/4 mx-auto bg-gray-50 p-4 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E8BC9] mx-auto mb-4"></div>
          <div>Loading appointment details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2/4 mx-auto bg-gray-50 p-4">
        <div className="bg-white rounded-xl p-6 text-center">
          <h2 className="text-xl text-red-600 mb-4">Error Loading Appointment</h2>
          <p className="text-gray-600 mb-4">Unable to load appointment details. Please try again.</p>
          <button 
            onClick={() => router.back()} 
            className="bg-[#2E8BC9] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2/4 mx-auto bg-gray-50 p-4">
      {/* Current Appointment Info */}
      {appointment && (
        <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Current Appointment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Doctor:</span> {appointment.doctorId.fullName}
            </div>
            <div>
              <span className="font-medium">Specialty:</span> {appointment.doctorId.discipline}
            </div>
            <div>
              <span className="font-medium">Date & Time:</span> {new Date(appointment.dateTime).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Reason:</span> {appointment.visitReason}
            </div>
          </div>
        </div>
      )}

      {/* Doctor Profile Section */}
      <div className="bg-white text-black rounded-xl p-4 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Doctor Image */}
          <div className="relative w-full md:w-48 flex-shrink-0">
            <div className="w-full h-48 rounded-lg flex items-center justify-center bg-gray-100">
              <img
                src="/maleDoctor.png"
                alt="Doctor"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            {/* Favorite Heart Icon */}
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 hover:bg-opacity-100 transition-all duration-200"
            >
              {isFavorite ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.92153 12.4469C1.84853 9.09692 3.10353 4.93192 6.62053 3.79992C8.47054 3.20292 10.7535 3.70092 12.0505 5.48992C13.2735 3.63492 15.6225 3.20692 17.4705 3.79992C20.9865 4.93192 22.2485 9.09692 21.1765 12.4469C19.5065 17.7569 13.6795 20.5229 12.0505 20.5229C10.4225 20.5229 4.64753 17.8189 2.92153 12.4469Z" fill="#E63D75" stroke="#E63D75" strokeWidth="2.16" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.7891 7.56641C16.9961 7.69041 17.7511 8.64741 17.7061 9.98841" stroke="white" strokeWidth="2.16" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.92153 12.4469C1.84853 9.09692 3.10353 4.93192 6.62053 3.79992C8.47054 3.20292 10.7535 3.70092 12.0505 5.48992C13.2735 3.63492 15.6225 3.20692 17.4705 3.79992C20.9865 4.93192 22.2485 9.09692 21.1765 12.4469C19.5065 17.7569 13.6795 20.5229 12.0505 20.5229C10.4225 20.5229 4.64753 17.8189 2.92153 12.4469Z" fill="none" stroke="#E63D75" strokeWidth="2.16" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
          
          {/* Doctor Info */}
          <div className="flex-1 bg-white pt-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-[#3D3D3D]">
                {appointment?.doctorId?.fullName || "Dr. Moule Marrk"}
              </h1>
              <div className="flex items-center p-1">
                {/* Chat and Share icons */}
                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_965_18190)">
                    <rect x="4" y="1.5" width="40" height="40" rx="8" fill="#2E8BC9"/>
                    <path d="M24 11.5C29.5221 11.5 33.9998 15.7834 34 21.0664C34 26.3496 29.5222 30.6338 24 30.6338C23.3507 30.6347 22.7032 30.5738 22.0654 30.4541C21.6066 30.3679 21.377 30.3252 21.2168 30.3496C21.0565 30.3741 20.8292 30.4947 20.375 30.7363C19.0902 31.4196 17.5922 31.6605 16.1514 31.3926C16.6988 30.7191 17.0723 29.9111 17.2373 29.0449C17.3373 28.5149 17.0899 27.9999 16.7188 27.623C15.0332 25.9115 14 23.6048 14 21.0664C14.0002 15.7834 18.4779 11.5 24 11.5ZM20 20.5C19.4477 20.5 19 20.9477 19 21.5C19 22.0523 19.4477 22.5 20 22.5H20.0088C20.5611 22.5 21.0088 22.0523 21.0088 21.5C21.0088 20.9477 20.5611 20.5 20.0088 20.5H20ZM23.9951 20.5C23.443 20.5002 22.9951 20.9478 22.9951 21.5C22.9951 22.0522 23.443 22.4998 23.9951 22.5H24.0049L24.1064 22.4951C24.6109 22.4441 25.0049 22.0179 25.0049 21.5C25.0049 20.9821 24.6109 20.5559 24.1064 20.5049L24.0049 20.5H23.9951ZM27.9912 20.5C27.4389 20.5 26.9912 20.9477 26.9912 21.5C26.9912 22.0523 27.4389 22.5 27.9912 22.5H28C28.5523 22.5 29 22.0523 29 21.5C29 20.9477 28.5523 20.5 28 20.5H27.9912Z" fill="white"/>
                  </g>
                </svg>

                <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_965_18191)">
                    <rect x="4" y="1.5" width="40" height="40" rx="8" fill="white"/>
                    <path d="M21.3962 14H20.3545C17.4082 14 15.9351 14 15.0198 14.8787C14.1045 15.7574 14.1045 17.1716 14.1045 20V24C14.1045 26.8284 14.1045 28.2426 15.0198 29.1213C15.9351 30 17.4082 30 20.3545 30H24.5611C27.5074 30 28.9805 30 29.8958 29.1213C30.4888 28.552 30.6976 27.7579 30.7711 26.5" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M28.1667 16.5V13.3535C28.1667 13.1583 28.3316 13 28.535 13C28.6326 13 28.7263 13.0372 28.7954 13.1035L33.5275 17.6465C33.7634 17.8728 33.8958 18.1799 33.8958 18.5C33.8958 18.8201 33.7634 19.1272 33.5275 19.3535L28.7954 23.8964C28.7263 23.9628 28.6326 24 28.535 24C28.3316 24 28.1667 23.8417 28.1667 23.6464V20.5H25.1157C20.875 20.5 19.3125 24 19.3125 24V21.5C19.3125 18.7386 21.6443 16.5 24.5208 16.5H28.1667Z" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
            </div>
            
            <p className="text-[#7C7C7C] text-sm mb-4">
              {appointment?.doctorId?.discipline || "Cardiology"}
            </p>
            <div className="flex items-start gap-1 mb-2">
              <span className="text-blue-500">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2.5C7.80558 2.5 4 6.11783 4 10.5807C4 13.1325 5.0625 15.1167 7.1875 16.889C8.68532 18.1382 10.4999 20.2131 11.5893 21.8951C12.1118 22.7016 12.8507 22.7016 13.4107 21.8951C14.5553 20.2466 16.3147 18.1382 17.8125 16.889C19.9375 15.1167 21 13.1325 21 10.5807C21 6.11783 17.1944 2.5 12.5 2.5Z" stroke="#3D75E6" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M10.5 7.5V10.5M10.5 10.5V13.5M10.5 10.5H14.5M14.5 7.5V10.5M14.5 10.5V13.5" stroke="#3D75E6" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </span>
              <span className="text-sm font-medium">Sylhet Health Center</span>
            </div>
            
            <p className="text-xs text-gray-600 mb-4">
              Calle Ciela #142, Ufb. Alunza de Monte Vende,<br />
              Trujillo Alto, PR 00926
            </p>
          </div>
        </div>
        
        {/* Date Selection Section */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Select new date</h2>
            <div className="flex items-center gap-2 text-gray-500">
              <button 
                onClick={goToPreviousMonth}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <span className="text-sm font-medium min-w-32 text-center">{getMonthYearString()}</span>
              <button 
                onClick={goToNextMonth}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
                <div key={index} className="text-center text-xs text-gray-500 font-medium py-1">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            {calendarRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-7 gap-1 mb-1 justify-items-center">
                {row.map((day, dayIndex) => (
                  <div key={dayIndex} className="w-10 h-10 flex items-center justify-center">
                    {day ? (
                      <button 
                        onClick={() => setSelectedDate(day)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-colors flex items-center justify-center ${
                          day === selectedDate 
                            ? 'bg-[#2E8BC9] text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {day}
                      </button>
                    ) : (
                      <div className="w-8 h-8"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
            
            {/* Selected Date Display */}
            {selectedDate && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Selected Date:</span> {getMonthYearString()} {selectedDate}
                </p>
              </div>
            )}
            
            {/* Time Slots */}
            <h3 className="text-md font-semibold text-gray-800 mb-3 mt-6">Available Time Slots</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-md text-sm flex items-center justify-center gap-2 font-medium border transition-colors ${
                    time === selectedTime 
                      ? "bg-[#2E8BC9] text-white border-blue-500" 
                      : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {time === selectedTime && (
                    <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.83301 9.33398L6.16634 11.6673L13.1663 4.33398" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button 
            onClick={() => setShowWaitlistPopup(true)} 
            className="flex-1 gap-2 py-3 px-4 bg-white shadow-md text-[#2E8BC9] rounded-xl font-medium flex items-center justify-center hover:bg-blue-50 transition-colors border border-gray-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5 19L3 21M19 19L21 21" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 3.5697L19.5955 3.27195C20.4408 2.84932 20.7583 2.89769 21.4303 3.5697C22.1023 4.2417 22.1507 4.55924 21.728 5.4045L21.4303 6M5 3.5697L4.4045 3.27195C3.55924 2.84932 3.2417 2.89769 2.5697 3.5697C1.89769 4.2417 1.84932 4.55924 2.27195 5.4045L2.5697 6" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 9.5V13.5L14 15.5" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3.5V2" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 2H14" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Waitlist
          </button>
         
          <button 
            onClick={handleReschedule}
            disabled={isRescheduling || !selectedDate}
            className="flex-1 py-3 px-4 gap-2 bg-[#2E8BC9] text-white rounded-xl font-medium flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4767 19.5C19.9017 17.8876 21.5 15.1305 21.5 12C21.5 7.02944 17.4706 3 12.5 3C11.8126 3 11.1432 3.07706 10.5 3.22302M17.4767 19.5V16M17.4767 19.5H21M7.5 4.51555C5.08803 6.13007 3.5 8.87958 3.5 12C3.5 16.9706 7.52944 21 12.5 21C13.1874 21 13.8568 20.9229 14.5 20.777M7.5 4.51555V8M7.5 4.51555H4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isRescheduling ? 'Rescheduling...' : 'Done Reschedule'}
          </button>
        </div>
      </div>
      
      <WaitlistPopup
        isOpen={showWaitlistPopup}
        onClose={() => setShowWaitlistPopup(false)}
        onJoinWaitlist={handleJoinWaitlist}
        onCancel={handleWaitlistCancel}
        doctorId={appointment?.doctorId?._id || ''}
        isLoading={isJoiningWaitlist}
      />
    </div>
  );
}