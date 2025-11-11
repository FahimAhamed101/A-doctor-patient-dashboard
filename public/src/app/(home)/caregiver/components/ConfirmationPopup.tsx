import { ReactNode } from 'react';

interface ConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
}

const ConfirmationPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Yes", 
  cancelText = "No",
  confirmColor = "#B42121",
  cancelColor = "#2E8BC9"
}: ConfirmationPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-xs shadow-xl">
        {/* Header with warning icon */}
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0003 29.3346C23.3641 29.3346 29.3337 23.3651 29.3337 16.0013C29.3337 8.63751 23.3641 2.66797 16.0003 2.66797C8.63653 2.66797 2.66699 8.63751 2.66699 16.0013C2.66699 23.3651 8.63653 29.3346 16.0003 29.3346Z" stroke={confirmColor} strokeWidth="2"/>
              <path d="M15.9893 20H16.0013" stroke={confirmColor} strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 16.0013V10.668" stroke={confirmColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col">
          <button
            onClick={onConfirm}
            className="w-full text-[#B42121] border-t border-[#DCDCDC] font-semibold py-3 px-6 transition-colors duration-200"
            style={{ color: confirmColor }}
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="w-full text-[#2E8BC9] border-t border-[#DCDCDC] font-semibold py-3 px-6 transition-colors duration-200"
            style={{ color: cancelColor }}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;