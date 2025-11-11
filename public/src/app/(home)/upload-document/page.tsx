"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Upload, ChevronRight, X, Plus, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Document {
  type: string;
  date: string;
}

interface UploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (documentName: string, date: string, file: File | null) => void;
}

export default function MedicalDocumentsInterface() {
  const [activeTab, setActiveTab] = useState<string>('X-Ray');
  const [uploadedFile, setUploadedFile] = useState<string | null>('X-Ray.pdf');
  const [progress, setProgress] = useState<number>(15);
  const [autoProgress, setAutoProgress] = useState<boolean>(true);
  const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
 const [showUploadPopuplist, setShowUploadPopuplist] = useState<boolean>(false);
  const tabs: string[] = ['X-Ray', 'Lab Result', 'Test Reports'];

  const documents: Document[] = [
    {
      type: 'MRI Result',
      date: '6 June 2025'
    },
    {
      type: 'MRI Result', 
      date: '8 June 2025'
    }
  ];

  useEffect(() => {
    if (!autoProgress) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [autoProgress]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const removeUploadedFile = (): void => {
    setUploadedFile(null);
  };

  const handleSaveDocument = (documentName: string, date: string, file: File | null): void => {
    // Here you would typically save the document to your backend
    console.log('Saving document:', { documentName, date, file });
    setShowUploadPopup(false);
  };

  // Upload Popup Component
  const UploadPopup: React.FC<UploadPopupProps> = ({ isOpen, onClose, onSave }) => {
    const [documentName, setDocumentName] = useState<string>('');
    const [documentDate, setDocumentDate] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        if (!documentName) {
          setDocumentName(file.name.split('.')[0]);
        }
      }
    };

    const handleSave = (): void => {
      if (documentName && documentDate) {
        onSave(documentName, documentDate, selectedFile);
        // Reset form
        setDocumentName('');
        setDocumentDate('');
        setSelectedFile(null);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-80 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upload document</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          {/* File Upload Area */}
          <div className="mb-4">
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="popup-file-upload"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
         
              <div className="flex flex-col items-center justify-center pt-2 pb-2">
          
          <div className=" w-40 h-full border-2 border-gray-300 rounded-lg p-4 ">
            {/* Top header lines */}
            <div className="mb-2">
              <div className="h-2.5 bg-gray-300 rounded-sm w-24 mb-1"></div>
              <div className="h-2.5 bg-gray-300 rounded-sm w-16"></div>
            </div>

            {/* Spacing */}
            <div className="mb-3"></div>

            {/* Content lines */}
            <div className="space-y-1 mb-4">
              <div className="h-1.5 bg-gray-200 rounded-sm w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-5/6"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-4/5"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-3/4"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-full"></div>
            </div>

            {/* Image and text section */}
            <div className="flex gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-400 rounded-sm flex-shrink-0"></div>
              <div className="flex-1 space-y-1 pt-0.5">
                <div className="h-1.5 bg-gray-200 rounded-sm w-full"></div>
                <div className="h-1.5 bg-gray-200 rounded-sm w-4/5"></div>
                <div className="h-1.5 bg-gray-200 rounded-sm w-3/5"></div>
                <div className="h-1.5 bg-gray-200 rounded-sm w-5/6"></div>
                <div className="h-1.5 bg-gray-200 rounded-sm w-3/4"></div>
              </div>
            </div>

            {/* Bottom content lines */}
            <div className="space-y-1">
              <div className="h-1.5 bg-gray-200 rounded-sm w-full"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-5/6"></div>
              <div className="h-1.5 bg-gray-200 rounded-sm w-2/3"></div>
            </div>
          </div>
       
               
              </div>
           
          </div>

          {/* Document Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="X-Ray"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Of Document
            </label>
            <div className="relative">
              <input
                type="date"
                value={documentDate}
                onChange={(e) => setDocumentDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <Calendar size={16} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!documentName || !documentDate}
            className="w-full  text-[#2E8BC9] py-2 px-4 rounded-md    transition-colors"
          >
            Save Document
          </button>
        </div>
      </div>
    );
  };
  const UploadPopuplist: React.FC<UploadPopupProps> = ({ isOpen, onClose, onSave }) => {
    const [documentName, setDocumentName] = useState<string>('');
    const [documentDate, setDocumentDate] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        if (!documentName) {
          setDocumentName(file.name.split('.')[0]);
        }
      }
    };

    const handleSave = (): void => {
      if (documentName && documentDate) {
        onSave(documentName, documentDate, selectedFile);
        // Reset form
        setDocumentName('');
        setDocumentDate('');
        setSelectedFile(null);
      }
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-80 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Add List</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

      

          {/* Document Name */}
          <div className="mb-4">
       
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="X-Ray"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

        

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!documentName || !documentDate}
            className="w-full  text-[#2E8BC9] py-2 px-4 rounded-md    transition-colors"
          >
            Save List
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-2/4 mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center  px-2 p-6 border-gray-200">
  <div className="flex items-center">
    {tabs.map((tab) => (
      <div key={tab} className='px-2 border-b-1 border-gray-200 relative'>
        <button
          onClick={() => setActiveTab(tab)}
          className={`flex px-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === tab
              ? 'text-[#2E8BC9] border-[#2E8BC9]'
              : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab}
        </button>
      </div>
    ))}
  </div>
  
  <button 
    className="px-3 py-3 text-gray-400 hover:text-gray-600"
    onClick={() => setShowUploadPopuplist(true)}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0.222656C24.7138 0.222656 31.7773 7.28617 31.7773 16C31.7773 24.7138 24.7138 31.7773 16 31.7773C7.28617 31.7773 0.222656 24.7138 0.222656 16C0.222656 7.28617 7.28617 0.222656 16 0.222656Z" fill="#F3F3F3"/>
      <path d="M16 0.222656C24.7138 0.222656 31.7773 7.28617 31.7773 16C31.7773 24.7138 24.7138 31.7773 16 31.7773C7.28617 31.7773 0.222656 24.7138 0.222656 16C0.222656 7.28617 7.28617 0.222656 16 0.222656Z" stroke="#DCDCDC" strokeWidth="0.444444"/>
      <path d="M16 8V24" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 16H24" stroke="#2E8BC9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
</div>

      {/* Content */}
      <div className="p-4">
        {/* Document Header */}
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document</h3>

        {/* Document List */}
        <div className="space-y-2 mb-6 ">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md shadow-md cursor-pointer group">
              
             
              
             <div>
 <Link href="/upload-document/edit">
                <div className="text-sm font-medium text-gray-900">{doc.type}</div>
                <div className="text-xs text-gray-500">{doc.date}</div>
              </Link> </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
            </div>
          ))}
        </div>

        {/* Upload Area */}
        <div 
          className="border-1 border-dashed border-[#2E8BC9] rounded-lg p-8 text-center bg-blue-50/30 cursor-pointer hover:bg-blue-50/50 transition-colors"
          onClick={() => setShowUploadPopup(true)}
        >
          <div className="mb-3 ">
            <div className='mx-auto justify-center text-center flex'>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33398 16.0013V19.3936C5.33398 23.7202 5.33398 25.8836 6.51541 27.3489C6.75409 27.6449 7.02373 27.9145 7.31976 28.1532C8.78506 29.3346 10.9484 29.3346 15.2751 29.3346C16.2159 29.3346 16.6861 29.3346 17.1169 29.1826C17.2065 29.151 17.2943 29.1146 17.38 29.0737C17.7921 28.8765 18.1247 28.544 18.7899 27.8788L25.1052 21.5634C25.876 20.7926 26.2613 20.4073 26.4644 19.9172C26.6673 19.4272 26.6673 18.8821 26.6673 17.7921V13.3346C26.6673 8.30632 26.6673 5.79217 25.1052 4.23006C23.5432 2.66797 21.0289 2.66797 16.0007 2.66797M17.334 28.668V28.0013C17.334 24.2301 17.334 22.3445 18.5056 21.1729C19.6772 20.0013 21.5628 20.0013 25.334 20.0013H26.0007" stroke="#2E8BC9" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.334 6.66797C12.5475 5.85885 10.4543 2.66797 9.33398 2.66797C8.21362 2.66797 6.12044 5.85885 5.33398 6.66797M9.33398 4.0013V13.3346" stroke="#2E8BC9" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </div>
        

          </div>
          <p className="text-sm text-gray-600 mb-4">Upload document</p>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
          
        </div>

        {/* Uploaded File */}
        {uploadedFile && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
               
                <span className="text-sm font-medium text-gray-900">{uploadedFile}</span>
              </div>
              <button
                onClick={removeUploadedFile}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={16} />
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 70)}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Upload Popup */}
      <UploadPopup
        isOpen={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onSave={handleSaveDocument}
      />
       {/* Upload Popup */}
      <UploadPopuplist
        isOpen={showUploadPopuplist}
        onClose={() => setShowUploadPopuplist(false)}
        onSave={handleSaveDocument}
      />
    </div>
  );
}