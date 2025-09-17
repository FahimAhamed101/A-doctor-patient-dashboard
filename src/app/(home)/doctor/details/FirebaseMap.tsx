"use client"

import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

// Brazil coordinates (center of the country)
const BRAZIL_DEFAULT_POSITION = { lat: -14.2350, lng: -51.9253 };

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.5rem",
};

interface Position {
  lat: number;
  lng: number;
}

interface FirebaseMapProps {
  doctorId: string;
  initialPosition?: Position;
}

export default function FirebaseMap({ doctorId, initialPosition }: FirebaseMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [position, setPosition] = useState<Position>(initialPosition || BRAZIL_DEFAULT_POSITION);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const docRef = doc(db, "doctors", doctorId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().location) {
          const { lat, lng } = docSnap.data().location;
          // Only update if valid coordinates exist in Firebase
          if (typeof lat === 'number' && typeof lng === 'number') {
            setPosition({ lat, lng });
          }
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
  }, [doctorId]);

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const newPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    
    setPosition(newPosition);
    
    try {
      // Save to Firebase
      await setDoc(
        doc(db, "doctors", doctorId), 
        { location: newPosition },
        { merge: true }
      );
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
        Loading map...
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={5}  // Zoom level that shows most of Brazil
        onClick={handleMapClick}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
}