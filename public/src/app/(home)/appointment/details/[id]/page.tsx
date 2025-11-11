"use client";

import { useParams, useRouter } from "next/navigation";
import { AppointmentDetails } from "./AppointmentDetails";
import { 
  useGetAppointmentDetailsQuery,
  useCheckInAppointmentMutation 
} from "@/redux/features/appointments/appointmentsApi";

// Define the AppointmentStatus type
type AppointmentStatus = "scheduled" | "completed" | "cancelled" | "no-show" | "booked";

export default function AppointmentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.id as string;

  const { data: appointment, isLoading, error } = useGetAppointmentDetailsQuery(appointmentId);
  const [checkInAppointment] = useCheckInAppointmentMutation();

  const handleCheckIn = async () => {
    try {
      await checkInAppointment(appointmentId).unwrap();
      alert("Check-in successful!");
    } catch (error) {
      console.error("Failed to check in:", error);
      alert("Failed to check in. Please try again.");
    }
  };

  const handleSaveVitalSigns = (vitalSigns: any) => {
    console.log("Saving vital signs:", vitalSigns);
    // TODO: Implement API call to save vital signs
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Failed to load appointment details.</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(appointment.dateTime);
  const formattedDate = date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
  const formattedTime = date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  let displayStatus: string;
  switch (appointment.status) {
    case "completed":
      displayStatus = "Complete";
      break;
    case "cancelled":
      displayStatus = "Canceled";
      break;
    case "booked":
      displayStatus = "Booked";
      break;
    case "scheduled":
      displayStatus = "Scheduled";
      break;
    case "no-show":
      displayStatus = "No Show";
      break;
    default:
      displayStatus = appointment.status;
  }
  return (
    <AppointmentDetails
      appointmentId={appointment._id}
      doctorName={appointment.doctorId.fullName}
      specialty={appointment.doctorId.discipline}
      location={appointment.doctorId.officeLocation?.[0] || "Sylhet Health Center"}
      appointmentDate={formattedDate}
      appointmentTime={formattedTime}
      status={displayStatus}
       appointmentStatus={appointment.status}
      reasonForVisit={appointment.visitReason}
      visitType={appointment.visitType}
      insurance={appointment.insurance}
      checkInTime={appointment.checkInTime}
      documents={appointment.documents}
      currentMedications={appointment.currentMedications}
      priorDiagnoses={appointment.priorDiagnoses}
      initialVitalSigns={{
        bloodPressure: "",
        heartRate: "",
        temperature: ""
      }}
      soapNotes={{
        subjective: "Patient presents for routine visit...",
        objective: "Vital signs stable...",
        assessment: appointment.summary || "Assessment pending",
        plan: "Continue monitoring..."
      }}
      onCheckIn={handleCheckIn}
      onSaveChanges={handleSaveVitalSigns}
    />
  );
}