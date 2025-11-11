import Image from "next/image"
import { Calendar, Clock, CheckCircle, MapPin, Download } from "lucide-react"

export default function Component() {
  return (
    <div className="flex justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center space-x-4">
            <Image
              src="/doc.jpg"
              alt="Dr. Moule Marrk"
              width={64}
              height={64}
              className="rounded-full border-2 border-gray-200 w-20 h-20"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Dr. Moule Marrk</h2>
              <p className="text-sm text-gray-500">Cardiology</p>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Sylhet Health Center</span>
              </div>
            </div>
          </div>

          {/* Last Appointment Time */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Last Appointment Time</p>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>May 16, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>10:30 PM</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-600">
                <CheckCircle className="w-4 h-4" />
                <span>Complete</span>
              </div>
            </div>
          </div>

          {/* Reason for Visit */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Reason for Visit</p>
            <p className="text-sm text-gray-600">Need a cleaning</p>
          </div>

          {/* Visit Type */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Visit Type</p>
            <p className="text-sm text-gray-600">New Patient Visit</p>
          </div>

          {/* Insurance */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Insurance</p>
            <p className="text-sm text-gray-600">Blusky</p>
          </div>

          {/* Vital Signs */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">Vital Signs</h3>
            <p className="text-sm text-gray-600">Blood Pressure : 130/85 mmHg</p>
            <p className="text-sm text-gray-600">Heart Rate : 88 bpm</p>
            <p className="text-sm text-gray-600">Temperature : 100.20F</p>
          </div>

          {/* SOAP Notes */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-900">SOAP Notes</h3>

            {/* Subjective */}
            <div className="rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Subjective</p>
              <p className="shadow-md rounded-md p-2">
                Patient presents for routine annual physical examination. Reports feeling well overall with no acute
                complaints. Denies chest pain, shortness of breath, or palpitations.
              </p>
            </div>

            {/* Objective */}
            <div className=" rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Objective</p>
              <p className="shadow-md rounded-md p-2">
                Vital signs stable. BP 120/80, HR 72, Temp 98.6°F. Physical examination unremarkable. Heart regular rate
                and rhythm, lungs clear bilaterally.
              </p>
            </div>

            {/* Assessment */}
            <div className=" rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Assessment</p>
              <p className="shadow-md rounded-md p-2">Healthy adult male for routine preventive care visit.</p>
            </div>

            {/* Plan */}
            <div className=" rounded-md p-3 text-sm text-gray-700">
              <p className="font-semibold mb-1">Plan</p>
              <p className="shadow-md rounded-md p-2">
                Continue current lifestyle habits. Return in 1 year for annual physical. Labs ordered for screening.
              </p>
            </div>
          </div>

          {/* Download Report */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">Download Report</h3>
            <button className=" flex justify-center items-center py-2 px-4 text-blue-600 border border-blue-600 bg-transparent rounded-md hover:bg-blue-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>

          {/* Upcoming */}
          <div className="text-sm text-gray-600">
            Upcoming - <span className="text-blue-600">In 7 days</span>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="p-6 pt-0">
          <button className="w-full py-2 px-4 bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white font-medium rounded-md transition-colors">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  )
}