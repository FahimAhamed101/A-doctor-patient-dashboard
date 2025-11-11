import Image from "next/image";
import Link from "next/link";

export default function AppointmentSummary() {
  return (
    <div className="max-w-2/4 mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white shadow-none border-0">
        <div className="p-4 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center gap-3">
          
              <Image
                            src="/maleDoctor.png"
                            alt="Dr. Moule Marrk"
                            width={100}
                            height={100}
                            className="rounded-full border-2 border-gray-200 w-20 h-20"
                          />
          
            <div>
              <h2 className="font-semibold text-gray-900">Dr. Moule Marrix</h2>
              <p className="text-sm text-gray-600">Cardiology</p>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="mr-1"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.33268 1.33398C5.20307 1.33398 2.66602 3.74587 2.66602 6.72112C2.66602 8.42232 3.37435 9.74512 4.79102 10.9267C5.78956 11.7595 6.99928 13.1427 7.72555 14.2641C8.07388 14.8017 8.56648 14.8017 8.93982 14.2641C9.70288 13.1651 10.8758 11.7595 11.8743 10.9267C13.291 9.74512 13.9993 8.42232 13.9993 6.72112C13.9993 3.74587 11.4623 1.33398 8.33268 1.33398Z" stroke="#3D75E6" stroke-linejoin="round"/>
<path d="M7 4.66602V6.66602M7 6.66602V8.66602M7 6.66602H9.66667M9.66667 4.66602V6.66602M9.66667 6.66602V8.66602" stroke="#3D75E6" stroke-linecap="round"/>
</svg>
</span>
                Sylhet Health Center
              </p>
            </div>
          </div>

          {/* Appointment Date & Time */}
          <div >
            <h3 className="text-sm font-medium text-gray-700 mb-2">Appointment Date & Time</h3>
            <div className="flex items-center justify-between h-10 border-b-2 border-[#DCDCDC]">
            
              <div className="flex items-center gap-2 text-sm text-gray-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                May 16, 2025
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                10:30 PM
              </div>
            </div>
          </div>

          {/* Visit Reason */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Visit Reason</h3>
            <p className="text-sm text-gray-600 shadow-md p-2 rounded-md">I need a cleaning</p>
          </div>

          {/* Select Insurance */}
          <div>
            <h3 className="text-sm font-medium text-gray-700  mb-2">Select Insurance</h3>
            <p className="text-sm text-gray-600 shadow-md p-2 rounded-md">Blusky</p>
          </div>

          {/* Visit Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Visit Type</h3>
            <p className="text-sm text-gray-600 shadow-md p-2 rounded-md">New Patient Visit</p>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Documentation</h3>
            <div className="flex items-center gap-2 shadow-md p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-500">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span className="text-sm text-gray-600">doc 1.pdf</span>
              <span className="text-xs text-gray-400">20.5kb</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Summary</h3>
            <div className="text-sm text-gray-600 shadow-md p-2 rounded-md">
              <span className="font-medium">Problem</span>
              <br />• head
            </div>
          </div>

          {/* Current Medications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Current Medications</h3>
            <div className="space-y-2 shadow-md p-2 rounded-md">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 text-xs text-gray-500 font-medium">
                <span>Name</span>
                <span>Dosage</span>
                <span>Action</span>
              </div>

              {/* Medication 1 */}
              <div className="grid grid-cols-3 gap-4 items-center py-2 ">
                <span className="text-sm text-gray-700">Lisinopril</span>
                <span className="text-sm text-gray-600">Once daily</span>
                <button className="w-8 h-8 p-0 text-gray-400 hover:text-red-500 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>

              {/* Medication 2 */}
              <div className="grid grid-cols-3 gap-4 items-center py-2 ">
                <span className="text-sm text-gray-700">Metformin</span>
                <span className="text-sm text-gray-600">Twice daily</span>
                <button className="w-8 h-8 p-0 text-gray-400 hover:text-red-500 rounded-md flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Prior Diagnoses */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Prior Diagnoses <span className="text-gray-400 font-normal">(Optional)</span>
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed shadow-md p-2 rounded-md">
              Patient's medical history includes previous surgeries, allergies to penicillin, and a family history of
              diabetes. Current concerns involve persistent headaches and occasional dizziness.
            </p>
          </div>

          {/* Confirm Button */}
          <Link href="/doctor/book-confirm">
            <button className="w-full bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white py-3 rounded-lg font-medium text-sm">
            Confirm
          </button>
          </Link>
        
        </div>
      </div>
    </div>
  );
}