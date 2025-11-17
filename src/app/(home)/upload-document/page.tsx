"use client"
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Upload, ChevronRight, X, Plus, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useGetDocumentCategoriesQuery, useCreateDocumentCategoryMutation, useCreateDocumentMutation, useGetDocumentsQuery, useDeleteDocumentMutation } from '@/redux/features/document/documentApi';

interface Document {
  _id: string;
  name: string;
  date: string;
  categoryId: string;
  documentUrl?: string;
}

interface DocumentCategory {
  _id: string;
  name: string;
}

interface UploadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (documentName: string, date: string, file: File | null, categoryId: string) => void;
  categories: DocumentCategory[];
}

interface UploadPopuplistProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
}

export default function MedicalDocumentsInterface() {
  const [activeTab, setActiveTab] = useState<string>('X-Ray');
  const [showUploadPopup, setShowUploadPopup] = useState<boolean>(false);
  const [showUploadPopuplist, setShowUploadPopuplist] = useState<boolean>(false);
  
  // RTK Query hooks
  const { data: categoriesData, isLoading: categoriesLoading } = useGetDocumentCategoriesQuery();
  const { data: documentsData, isLoading: documentsLoading, refetch: refetchDocuments } = useGetDocumentsQuery();
  const [createDocument, { isLoading: isCreatingDocument }] = useCreateDocumentMutation();
  const [createDocumentCategory, { isLoading: isCreatingCategory }] = useCreateDocumentCategoryMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  const categories: DocumentCategory[] = categoriesData?.data || [];
  const documents: Document[] = documentsData?.data || [];

  // Filter documents by active tab category
  const filteredDocuments = documents.filter(doc => {
    const category = categories.find(cat => cat._id === doc.categoryId);
    return category?.name === activeTab;
  });

  const tabs: string[] = categories.length > 0 ? categories.map(cat => cat.name) : ['X-Ray', 'Lab Result', 'Test Reports'];

  const handleSaveDocument = async (documentName: string, date: string, file: File | null, categoryId: string): Promise<void> => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('name', documentName);
      formData.append('categoryId', categoryId);
      formData.append('document', file);
      formData.append('date', date);

      await createDocument(formData).unwrap();
      setShowUploadPopup(false);
      refetchDocuments();
    } catch (error) {
      console.error('Failed to upload document:', error);
    }
  };

  const handleSaveCategory = async (categoryName: string): Promise<void> => {
    try {
      await createDocumentCategory({ name: categoryName }).unwrap();
      setShowUploadPopuplist(false);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleDeleteDocument = async (documentId: string): Promise<void> => {
    try {
      await deleteDocument(documentId).unwrap();
      refetchDocuments();
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  // Upload Popup Component
  const UploadPopup: React.FC<UploadPopupProps> = ({ isOpen, onClose, onSave, categories }) => {
    const [documentName, setDocumentName] = useState<string>('');
    const [documentDate, setDocumentDate] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [filePreview, setFilePreview] = useState<string>('');

    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        if (!documentName) {
          // Set document name from file name without extension
          const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
          setDocumentName(fileNameWithoutExt);
        }
        
        // Create preview for images
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setFilePreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setFilePreview('');
        }
      }
    };

    const handleSave = (): void => {
      if (documentName && documentDate && selectedFile && selectedCategoryId) {
        onSave(documentName, documentDate, selectedFile, selectedCategoryId);
        // Reset form
        setDocumentName('');
        setDocumentDate('');
        setSelectedFile(null);
        setSelectedCategoryId('');
        setFilePreview('');
      }
    };

    const handleClose = (): void => {
      setDocumentName('');
      setDocumentDate('');
      setSelectedFile(null);
      setSelectedCategoryId('');
      setFilePreview('');
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-80 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upload document</h2>
            <button
              onClick={handleClose}
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
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <label htmlFor="popup-file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center pt-2 pb-2">
                {filePreview ? (
                  <div className="w-40 h-40 border-2 border-gray-300 rounded-lg p-2 flex items-center justify-center">
                    <img 
                      src={filePreview} 
                      alt="File preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : selectedFile ? (
                  <div className="w-40 h-40 border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center truncate w-full">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-gray-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center">
                      Click to select file
                    </p>
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      PDF, DOC, JPG, PNG
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              placeholder="Enter document name"
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
            disabled={!documentName || !documentDate || !selectedFile || !selectedCategoryId || isCreatingDocument}
            className="w-full bg-[#2E8BC9] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isCreatingDocument ? 'Uploading...' : 'Save Document'}
          </button>
        </div>
      </div>
    );
  };

  const UploadPopuplist: React.FC<UploadPopuplistProps> = ({ isOpen, onClose, onSave }) => {
    const [categoryName, setCategoryName] = useState<string>('');

    const handleSave = (): void => {
      if (categoryName) {
        onSave(categoryName);
        setCategoryName('');
      }
    };

    const handleClose = (): void => {
      setCategoryName('');
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-80 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Add Category</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!categoryName || isCreatingCategory}
            className="w-full bg-[#2E8BC9] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isCreatingCategory ? 'Creating...' : 'Save Category'}
          </button>
        </div>
      </div>
    );
  };

  // FileText icon component for non-image files
  const FileText = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  return (
    <div className="max-w-2/4 mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center px-2 p-6 border-gray-200">
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
        <div className="space-y-2 mb-6">
          {documentsLoading ? (
            <div className="text-center py-4">Loading documents...</div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No documents found in {activeTab} category</div>
          ) : (
            filteredDocuments.map((doc) => (
              <div key={doc._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md shadow-md cursor-pointer group">
                <Link href={`/upload-document/edit/${doc._id}`} className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()}</div>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDeleteDocument(doc._id);
                    }}
                    className="text-red-400 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Upload Area - Now only opens the popup */}
        <div 
          className="border-1 border-dashed border-[#2E8BC9] rounded-lg p-8 text-center bg-blue-50/30 cursor-pointer hover:bg-blue-50/50 transition-colors"
          onClick={() => setShowUploadPopup(true)}
        >
          <div className="mb-3">
            <div className='mx-auto justify-center text-center flex'>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33398 16.0013V19.3936C5.33398 23.7202 5.33398 25.8836 6.51541 27.3489C6.75409 27.6449 7.02373 27.9145 7.31976 28.1532C8.78506 29.3346 10.9484 29.3346 15.2751 29.3346C16.2159 29.3346 16.6861 29.3346 17.1169 29.1826C17.2065 29.151 17.2943 29.1146 17.38 29.0737C17.7921 28.8765 18.1247 28.544 18.7899 27.8788L25.1052 21.5634C25.876 20.7926 26.2613 20.4073 26.4644 19.9172C26.6673 19.4272 26.6673 18.8821 26.6673 17.7921V13.3346C26.6673 8.30632 26.6673 5.79217 25.1052 4.23006C23.5432 2.66797 21.0289 2.66797 16.0007 2.66797M17.334 28.668V28.0013C17.334 24.2301 17.334 22.3445 18.5056 21.1729C19.6772 20.0013 21.5628 20.0013 25.334 20.0013H26.0007" stroke="#2E8BC9" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.334 6.66797C12.5475 5.85885 10.4543 2.66797 9.33398 2.66797C8.21362 2.66797 6.12044 5.85885 5.33398 6.66797M9.33398 4.0013V13.3346" stroke="#2E8BC9" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Upload document</p>
        </div>
      </div>
      
      {/* Upload Popup */}
      <UploadPopup
        isOpen={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onSave={handleSaveDocument}
        categories={categories}
      />
      
      {/* Category Popup */}
      <UploadPopuplist
        isOpen={showUploadPopuplist}
        onClose={() => setShowUploadPopuplist(false)}
        onSave={handleSaveCategory}
      />
    </div>
  );
}