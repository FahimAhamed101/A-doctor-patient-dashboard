"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import dynamic from "next/dynamic";

const FirebaseMap = dynamic(() => import("./FirebaseMap"), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

// Define TypeScript interfaces for our data structures
interface Qualification {
  degree: string;
  institution: string;
  year: string;
}

interface DoctorData {
  name?: string;
  disciplines?: string[];
  email?: string;
  mobile?: string;
  clinicName?: string;
  location?: string;
  popularReason?: string;
  qualifications?: Qualification[];
  visitType?: string;
  // Add other fields as needed
}

interface Position {
  lat: number;
  lng: number;
}

export default function DoctorProfile() {
  const [doctorId, setDoctorId] = useState<string>(""); 
  const [doctorData, setDoctorData] = useState<DoctorData>({});
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [visitType, setVisitType] = useState<string>("new-patient");
  const [location, setLocation] = useState<string>("");

  // Function to save data to Firebase
  const saveToFirebase = async (data: Partial<DoctorData>) => {
    if (!doctorId) return;
    
    try {
      const docRef = doc(db, "doctors", doctorId);
      await setDoc(docRef, data, { merge: true });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  useEffect(() => {
    // In a real app, you'd get the doctor ID from your authentication system
    const fetchDoctorData = async () => {
      // Replace with your actual doctor ID retrieval logic
      const id = "doctor-id-here"; // This should come from your auth system
      setDoctorId(id);
      
      const docRef = doc(db, "doctors", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as DoctorData;
        setDoctorData(data);
        setQualifications(data.qualifications || []);
        setVisitType(data.visitType || "new-patient");
        setLocation(data.location || "");
      }
    };

    fetchDoctorData();
  }, []);

  // Get initial position for map - this needs to be properly parsed or formatted
  const getInitialPosition = (): Position => {
    if (typeof doctorData.location === 'string') {
      try {
        // Try to parse if it's a JSON string
        const parsed = JSON.parse(doctorData.location);
        if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
          return parsed;
        }
      } catch (e) {
        // If parsing fails, return default position
        console.warn("Could not parse location data:", e);
      }
    }
    return { lat: 0, lng: 0 };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-teal-500">
            <Image
              src="/maleDoctor.png"
              alt="Dr. Mouie Marik"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Information Grid */}
        <div className="space-y-6">
          {/* Name and Disciplines Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Name</h3>
              <p className="text-gray-900">{doctorData.name || "Dr. Mouie Marik"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Disciplines</h3>
              <p className="text-gray-900">{doctorData.disciplines?.join(", ") || "Cardiology"}</p>
            </div>
          </div>

          {/* Email and Mobile Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Email</h3>
              <p className="text-gray-600">{doctorData.email || "omalhmoudi9@gmail.com"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Mobile</h3>
              <p className="text-gray-600">{doctorData.mobile || "+1 9999999999"}</p>
            </div>
          </div>

          {/* Clinic Name */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Clinic Name</h3>
            <p className="text-gray-900">{doctorData.clinicName || "Sylhet Health Center"}</p>
          </div>

          {/* Office Location */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Office Location</h3>
            <textarea
              id="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                saveToFirebase({ location: e.target.value });
              }}
              className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
              rows={2}
            />
          </div>

          {/* Firebase Map */}
          <div className="space-y-2">
            <FirebaseMap 
              doctorId={doctorId}
              initialPosition={getInitialPosition()}
            />
          </div>

          {/* Popular Reason To Visit */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Reason To Visit</h3>
            <p className="text-gray-600">{doctorData.popularReason || "I need a cleaning"}</p>
          </div>

          {/* Qualification */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Qualification</h3>
            <div className="space-y-2">
              {qualifications.length > 0 ? (
                qualifications.map((qual, index) => (
                  <div key={index}>
                    <p className="text-gray-900 font-medium">{qual.degree}</p>
                    <p className="text-gray-600 text-sm">{qual.institution}</p>
                    <p className="text-gray-600 text-sm">{qual.year}</p>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <p className="text-gray-900 font-medium">Doctor of Medicine (M.D.)</p>
                    <p className="text-gray-600 text-sm">University of California, San Francisco</p>
                    <p className="text-gray-600 text-sm">2008</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-900 font-medium">Bachelor of Science in Biology</p>
                    <p className="text-gray-600 text-sm">University of California, San Francisco</p>
                    <p className="text-gray-600 text-sm">2005</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}