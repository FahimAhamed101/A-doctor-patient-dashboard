"use client"

import { AppointmentDetails } from "./AppointmentDetails";

interface Appointment {
  id: number;
  time: string;
  doctor: string;
  status: string;
  isHighlighted: boolean;
}

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
}

interface SoapNotes {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export default function Page() {
  const appointments: Appointment[] = [
    { id: 1, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Complete", isHighlighted: true },
    { id: 2, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Next Follow Up In 7 Days", isHighlighted: false },
    { id: 3, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Complete", isHighlighted: false },
    { id: 4, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Complete", isHighlighted: false },
    { id: 5, time: "16 May, 2025 || 10:30 PM", doctor: "Dr. Moule Markk", status: "Canceled", isHighlighted: false },
  ];

  // Find the highlighted appointment
  const appointment = appointments.find(app => app.isHighlighted) || appointments[0];

  // Handle saving vital signs
  const handleSaveVitalSigns = (vitalSigns: VitalSigns) => {
    console.log("Saving vital signs:", vitalSigns);
    // Here you would typically make an API call to save the data
  };

  return (
    <div>
      <AppointmentDetails
        doctorName={appointment.doctor}
        specialty="Cardiology"
        location="Sylhet Health Center"
        appointmentDate={appointment.time.split(" || ")[0]}
        appointmentTime={appointment.time.split(" || ")[1]}
        status={appointment.status}
        reasonForVisit="Need a cleaning"
        visitType="New Patient Visit"
        insurance="Blusky"
        initialVitalSigns={{
          bloodPressure: "",
          heartRate: "",
          temperature: ""
        }}
        soapNotes={{
          subjective: "Patient presents for routine annual physical examination...",
          objective: "Vital signs stable. BP 120/80, HR 72, Temp 98.6°F...",
          assessment: "Healthy adult male for routine preventive care visit.",
          plan: "Continue current lifestyle habits..."
        }}
        onSaveChanges={handleSaveVitalSigns}
      />
    </div>
  );
}