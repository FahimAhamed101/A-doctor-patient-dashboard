"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

export default function WaitList() {
  const appointments = [
    {
      id: 1,
      date: "May 16, 2025",
      time: "10:32 PM",
      status: "Complete",
      statusColor: "text-green-500",
      hasNewDate: true,
      newDate: "Dr. Moule Marrk",
      newTime: "1:45 PM on February 4, 2025",
      hasReschedule: true,
      hasRemoveRequest: false
    },
    {
      id: 2,
      date: "May 16, 2025",
      time: "10:32 PM",
      status: "Complete",
      statusColor: "text-green-500",
      hasNewDate: false,
      hasReschedule: false,
      hasRemoveRequest: true
    },
    {
      id: 3,
      date: "May 16, 2025",
      time: "10:32 PM",
      status: "Complete",
      statusColor: "text-green-500",
      hasNewDate: false,
      hasReschedule: false,
      hasRemoveRequest: true
    }
  ];
 const router = useRouter()
 const onhandleClick =() =>{
router.push("/waitlist/success")
}
  return (
    <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen p-4">
      {appointments.map((appointment, index) => (
        <div key={appointment.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src="./placeholder.svg"
                alt="Dr. Moule Marrk"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">Dr. Moule Marrk</h3>
                <p className="text-xs text-gray-500">Cardiologist</p>
                <p className="text-xs text-gray-500 flex items-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.4163 1.66797C6.50432 1.66797 3.33301 4.68283 3.33301 8.40189C3.33301 10.5284 4.21842 12.1819 5.98926 13.6588C7.23744 14.6998 8.74959 16.4289 9.65742 17.8306C10.0928 18.5026 10.7086 18.5026 11.1753 17.8306C12.1291 16.4568 13.5953 14.6998 14.8434 13.6588C16.6143 12.1819 17.4997 10.5284 17.4997 8.40189C17.4997 4.68283 14.3283 1.66797 10.4163 1.66797Z" stroke="#3D75E6" stroke-width="1.25" stroke-linejoin="round"/>
<path d="M8.75 5.83203V8.33203M8.75 8.33203V10.832M8.75 8.33203H12.0833M12.0833 5.83203V8.33203M12.0833 8.33203V10.832" stroke="#3D75E6" stroke-width="1.25" stroke-linecap="round"/>
</svg>
 Sylhet Health Center</p>
              </div>
            </div>
            
            <button className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C17.522 2 22 6.477 22 12C22 17.523 17.522 22 12 22C11.35 22 10.703 21.939 10.065 21.814C9.606 21.728 9.377 21.685 9.217 21.71C9.057 21.734 8.829 21.855 8.375 22.096C7.09 22.779 5.592 23.02 4.151 22.752C4.699 22.079 5.072 21.271 5.237 20.404C5.337 19.874 5.09 19.359 4.719 18.982C3.033 17.27 2 14.964 2 12C2 6.477 6.478 2 12 2ZM9 11C8.448 11 8 11.448 8 12C8 12.552 8.448 13 9 13H9.009C9.561 13 10.009 12.552 10.009 12C10.009 11.448 9.561 11 9.009 11H9ZM12.995 11C12.443 11 11.995 11.448 11.995 12C11.995 12.552 12.443 13 12.995 13H13.005C13.557 13 14.005 12.552 14.005 12C14.005 11.448 13.557 11 13.005 11H12.995ZM16.991 11C16.439 11 15.991 11.448 15.991 12C15.991 12.552 16.439 13 16.991 13H17C17.552 13 18 12.552 18 12C18 11.448 17.552 11 17 11H16.991Z" fill="white"/>
              </svg>
            </button>
          </div>

          {/* Appointment Details */}
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Current Appointment Date & Time</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6667 1.33203V3.9987M5.33333 1.33203V3.9987M2 6.66537H14M8.66667 2.66536H7.33333C4.81917 2.66536 3.5621 2.66536 2.78105 3.44641C2 4.22746 2 5.48454 2 7.9987V9.33203C2 11.8462 2 13.1033 2.78105 13.8843C3.5621 14.6654 4.81917 14.6654 7.33333 14.6654H8.66667C11.1808 14.6654 12.4379 14.6654 13.2189 13.8843C14 13.1033 14 11.8462 14 9.33203V7.9987C14 5.48454 14 4.22746 13.2189 3.44641C12.4379 2.66536 11.1808 2.66536 8.66667 2.66536Z" stroke="#3D3D3D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 {appointment.date}</span>
              
            </div><span className="text-gray-500 flex items-center gap-2"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.86499 5.73641L2.19157 5.63454C3.39109 2.46855 6.83501 0.665309 10.1927 1.56186C13.769 2.51677 15.8933 6.17275 14.9373 9.7277C13.9815 13.2827 10.3074 15.3904 6.73114 14.4356C4.0758 13.7265 2.22095 11.5284 1.83301 8.9883" stroke="#3D3D3D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.5 5.33203V7.9987L9.83333 9.33203" stroke="#3D3D3D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
 {appointment.time}</span>
            <span className={`${appointment.statusColor} font-medium flex items-center gap-1`}>
              ✓ {appointment.status}
            </span>
          </div>

          {/* New Date Section - Only for first appointment */}
          {appointment.hasNewDate && (
            <>
              <div className="text-center text-sm bg-[#FBF7EB] text-gray-600 mb-2">
                This appointment will not wait in queue
              </div>
              <div className=" text-sm font-medium mb-3">
                New date
              </div>
              <div className="bg-[#EEFEE7] rounded-lg p-3 text-center mb-4">
                <h4 className="font-semibold text-gray-900 mb-1">{appointment.newDate}</h4>
                <p className="text-[#2E8BC9] font-medium">{appointment.newTime}</p>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {appointment.hasReschedule && (
              <button className="flex-1 py-2 px-4 bg-white shadow-md text-[#B42121] rounded-lg text-sm font-medium">
                Reschedule Request
              </button>
            )}
            {appointment.hasRemoveRequest && (
              <button className="flex-1 py-2 px-4 bg-white shadow-md text-[#B42121] rounded-lg text-sm font-medium">
                Remove Request
              </button>
            )}
            {appointment.hasReschedule && (
              <button  onClick={onhandleClick}  className="flex-1 py-2 px-4 bg-[#2E8BC9] text-white rounded-lg text-sm font-medium">
               Switch to this slot
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}