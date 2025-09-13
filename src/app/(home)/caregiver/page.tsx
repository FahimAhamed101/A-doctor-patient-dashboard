"use client"

import { useState } from "react";
import { Eye } from "lucide-react"
import ConfirmationPopup from "./components/ConfirmationPopup"
import { useRouter } from "next/navigation";

interface Caregiver {
  name: string;
  relation?: string;
}

interface PopupConfig {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmColor: string;
}

export default function CaregiverManagement() {
  const yourCaregivers: Caregiver[] = [{ name: "Jamal" }, { name: "Jony" }];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const router = useRouter();
  const [popupConfig, setPopupConfig] = useState<PopupConfig>({
    title: "",
    description: "",
    onConfirm: () => {},
    confirmColor: "#B42121"
  });

  const handleLeaveYes = (personName: string) => {
    console.log(`User confirmed leaving as caregiver for ${personName}`);
    // Add your leave logic here
    setShowPopup(false);
  };

  const handleDeleteYes = (personName: string) => {
    console.log(`User confirmed deleting caregiver ${personName}`);
    // Add your delete logic here
    setShowPopup(false);
  };

  const handleNo = () => {
    console.log('User cancelled the action');
    setShowPopup(false);
  };

  // Function to show the leave confirmation popup
  const showLeaveConfirmation = (personName: string) => {
    setSelectedPerson(personName);
    setPopupConfig({
      title: "Leave As Caregiver",
      description: `Are you sure you want to remove yourself as a caregiver of ${personName}?`,
      onConfirm: () => handleLeaveYes(personName),
      confirmColor: "#B42121"
    });
    setShowPopup(true);
  };

  // Function to show the delete confirmation popup
  const showDeleteConfirmation = (personName: string) => {
    setSelectedPerson(personName);
    setPopupConfig({
      title: "Remove Caregiver",
      description: `Are you sure you want to remove ${personName} as your caregiver?`,
      onConfirm: () => handleDeleteYes(personName),
      confirmColor: "#B42121"
    });
    setShowPopup(true);
  };

  const onhandleClick = () => {
    router.push("/caregiver/add");
  };

  const asCaregiver: Caregiver[] = [
    { name: "Sakib", relation: "Brother" },
    { name: "Kamal", relation: "Uncle" },
  ];

  return (
    <div className="max-w-4xl rounded-lg bg-white mx-auto p-6 space-y-6">
      {/* Your caregiver section */}
      <div className="bg-white rounded-lg ">
        <div className="">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Your caregiver</h2>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EDF4FA]">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yourCaregivers.map((caregiver, index) => (
                 <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#EDF4FA]'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">{caregiver.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right ">
                      <div className="flex items-center justify-end gap-3 ">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => showDeleteConfirmation(caregiver.name)} 
                          className="text-gray-400 hover:text-gray-600"
                        >
                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 3.66797L12.5869 10.3514C12.4813 12.0589 12.4285 12.9127 12.0005 13.5266C11.7889 13.83 11.5165 14.0862 11.2005 14.2786C10.5614 14.668 9.706 14.668 7.99513 14.668C6.28208 14.668 5.42553 14.668 4.78603 14.2779C4.46987 14.0851 4.19733 13.8285 3.98579 13.5245C3.55792 12.9097 3.5063 12.0547 3.40307 10.3448L3 3.66797" stroke="#3D3D3D" strokeLinecap="round"/>
                            <path d="M2 3.66536H14M10.7038 3.66536L10.2487 2.72652C9.9464 2.10287 9.7952 1.79104 9.53447 1.59657C9.47667 1.55343 9.4154 1.51506 9.35133 1.48183C9.0626 1.33203 8.71607 1.33203 8.023 1.33203C7.31253 1.33203 6.95733 1.33203 6.66379 1.48811C6.59873 1.5227 6.53665 1.56263 6.47819 1.60748C6.21443 1.80983 6.06709 2.13306 5.77241 2.77954L5.36861 3.66536" stroke="#3D3D3D" strokeLinecap="round"/>
                            <path d="M6.33301 11V7" stroke="#3D3D3D" strokeLinecap="round"/>
                            <path d="M9.66699 11V7" stroke="#3D3D3D" strokeLinecap="round"/>
                         </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* As a caregiver section */}
      <div className="bg-white rounded-lg ">
        <div className="">
          <h2 className="text-lg font-medium text-gray-900 mb-6">As a caregiver</h2>
          
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EDF4FA]">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Relation</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {asCaregiver.map((person, index) => (
                    <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#EDF4FA]'}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{person.relation}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => showLeaveConfirmation(person.name)} 
                        className="text-sm text-[#2E8BC9] underline hover:text-blue-800 hover:underline"
                      >
                        Leave as caregiver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 pt-6 flex items-center justify-center">
            
            <button onClick={onhandleClick} className="w-full flex gap-2 justify-center py-2 shadow-md items-center text-[#2E8BC9] hover:text-blue-800 hover:bg-blue-50 px-2 rounded">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20" stroke="#2E8BC9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12H20" stroke="#2E8BC9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Add Caregiver
            </button>
          </div>
        </div>
      </div>
      
      {/* Reusable Confirmation Popup */}
      <ConfirmationPopup
        isOpen={showPopup}
        onClose={handleNo}
        onConfirm={popupConfig.onConfirm}
        title={popupConfig.title}
        description={popupConfig.description}
        confirmText="Yes"
        cancelText="No"
        confirmColor={popupConfig.confirmColor}
        cancelColor="#2E8BC9"
      />
    </div>
  );
}