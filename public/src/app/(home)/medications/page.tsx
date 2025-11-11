"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMedicationsQuery } from '@/redux/features/medications/medicationsApi';

// Define interfaces for type safety
interface Reminder {
  time: string;
  frequency: string;
}

interface ReminderState extends Reminder {
  enabled: boolean;
}

interface MedicationCardProps {
  medicationName: string;
  dosage?: string;
  instructions: string;
  reminders: Reminder[];
  onEdit: () => void;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ 
  medicationName, 
  dosage, 
  instructions, 
  reminders, 
  onEdit 
}) => {
  const [reminderStates, setReminderStates] = useState<ReminderState[]>(
    reminders.map(reminder => ({ ...reminder, enabled: true }))
  );

  const toggleReminder = (index: number) => {
    setReminderStates(prev => 
      prev.map((reminder, i) => 
        i === index ? { ...reminder, enabled: !reminder.enabled } : reminder
      )
    );
  };

  return (
    <div className=" rounded-lg p-4 shadow-md w-full  max-w-sm">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-1">Medication Name</h3>
        <h3 className="text-sm  p-2 text-gray-900 shadow-md rounded-md">{medicationName}</h3>
      </div>

      {dosage && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Dosage</h3>
          <p className="text-sm text-gray-800">{dosage}</p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600 mb-1">Dosage Instructions</h3>
        <p className="text-sm text-gray-800 shadow-md  p-2 rounded-md">{instructions}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">Reminder Time</h3>
        <div className="space-y-2">
          {reminderStates.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7C7C7C" stroke-width="1.5"/>
<path d="M12 8V12L14 14" stroke="#7C7C7C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                <span className="text-sm text-gray-800">{reminder.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-600">{reminder.frequency}</span>
                <button
                  onClick={() => toggleReminder(index)}
                  className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    reminder.enabled ? 'bg-[#2E8BC9]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      reminder.enabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onEdit}
        className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-[#2E8BC9] text-[#2E8BC9] rounded-lg hover:bg-blue-50 transition-colors duration-200"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z" stroke="#2E8BC9" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M13 4L20 11" stroke="#2E8BC9" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M14 22H22" stroke="#2E8BC9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        <span className="text-sm font-medium">Edit Details</span>
      </button>
    </div>
  );
};

const MedicationTracker: React.FC = () => {
  const { data: medicationsResponse, isLoading, error } = useGetMedicationsQuery();
  const router = useRouter();

  // Transform API data to match the component structure
  const transformMedications = () => {
    if (!medicationsResponse?.medications) return [];

    return medicationsResponse.medications.map((medication) => ({
      id: medication._id,
      name: medication.name,
      dosage: medication.dosage,
      instructions: medication.instructions || `Take ${medication.dosage} as prescribed`,
      reminders: [
        { 
          time: medication.reminderTime, 
          frequency: "Repeat Daily" 
        }
      ]
    }));
  };

  const handleEdit = (medicationId: string) => {
    console.log(`Edit medication with ID: ${medicationId}`);
    router.push(`/medications/edit?id=${medicationId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 py-6 justify-center bg-white">
            <div className="rounded-lg p-4 shadow-md w-full max-w-sm">
              <div className="text-center">Loading medications...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 py-6 justify-center bg-white">
            <div className="rounded-lg p-4 shadow-md w-full max-w-sm">
              <div className="text-center text-red-600">Error loading medications</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const medications = transformMedications();

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
       
        <div className="flex flex-wrap gap-4 py-6 justify-center  bg-white">
          {medications.length > 0 ? (
            medications.map((medication) => (
              <MedicationCard
                key={medication.id}
                medicationName={medication.name}
                dosage={medication.dosage}
                instructions={medication.instructions}
                reminders={medication.reminders}
                onEdit={() => handleEdit(medication.id)}
              />
            ))
          ) : (
            <div className="rounded-lg p-4 shadow-md w-full max-w-sm">
              <div className="text-center text-gray-500">No medications found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicationTracker;