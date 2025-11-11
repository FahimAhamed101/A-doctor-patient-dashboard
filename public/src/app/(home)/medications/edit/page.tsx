"use client"
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

// Define interfaces for type safety
interface Reminder {
  time: string;
  frequency: string;
}

interface ReminderState extends Reminder {
  enabled: boolean;
}

interface Medication {
  id: number;
  name: string;
  instructions: string;
  reminders: Reminder[];
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

  const deleteReminder = (index: number) => {
    setReminderStates(prev => prev.filter((_, i) => i !== index));
  };

  const addReminderTime = () => {
    const newReminder: ReminderState = {
      time: "12:00 PM",
      frequency: "Repeat Daily",
      enabled: true
    };
    setReminderStates(prev => [...prev, newReminder]);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm  w-full max-w-sm mx-auto">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Medication Name</h3>
        <div className="shadow-md p-3 rounded-md ">
          <p className="text-sm text-gray-900 font-medium">{medicationName}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Dosage Instructions</h3>
        <div className="shadow-md p-3 rounded-md ">
          <p className="text-sm text-gray-700">{instructions}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Reminder Time</h3>
        <div className="space-y-3">
          {reminderStates.map((reminder, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#9CA3AF" strokeWidth="1.5"/>
                  <path d="M12 8V12L14 14" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm text-gray-900 font-medium">{reminder.time}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-600">{reminder.frequency}</span>
                <button
                  onClick={() => toggleReminder(index)}
                  className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                    reminder.enabled ? 'bg-[#2E8BC9]' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                      reminder.enabled ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  ></div>
                </button>
                <button
                  onClick={() => deleteReminder(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addReminderTime}
          className="w-full mt-4 flex items-center justify-center shadow-md space-x-2 py-2 text-[#2E8BC9] hover:bg-blue-50 rounded-lg transition-colors duration-200"
        >
          <Plus size={16} />
          <span className="text-sm font-medium">Add Another Reminder Time</span>
        </button>
      </div>

      <button
        className="w-full bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
      >
        Save Change
      </button>
    </div>
  );
};

const MedicationTracker: React.FC = () => {
  const [medications] = useState<Medication[]>([
    {
      id: 1,
      name: "Ibuprofen 800 mg",
      instructions: "Take one tablet by mouth twice daily as needed for pain",
      reminders: [
        { time: "9:00 AM", frequency: "Repeat Daily" },
        { time: "9:00 PM", frequency: "Repeat Daily" }
      ]
    },
  ]);

  const handleEdit = (medicationId: number) => {
    console.log(`Edit medication with ID: ${medicationId}`);
    // Add edit functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-4 py-6 justify-center">
          {medications.map((medication) => (
            <MedicationCard
              key={medication.id}
              medicationName={medication.name}
              instructions={medication.instructions}
              reminders={medication.reminders}
              onEdit={() => handleEdit(medication.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationTracker;