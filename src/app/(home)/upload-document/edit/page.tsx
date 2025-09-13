"use client"
import React, { useState } from 'react';

export default function DocumentManager() {
  const [documentName, setDocumentName] = useState('X-Raj');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('mm/dd/yyyy');

  const handleSaveChanges = () => {
    console.log('Saving changes...', { documentName, category, date });
  };

  const handleDownload = () => {
    console.log('Downloading document...');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      console.log('Deleting document...');
    }
  };

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 w-1/3">
        {/* Document Preview */}
        <div className="p-6 pb-4 w-80 items-center mx-auto">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 h-72">
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

        {/* Action Links */}
        <div className="px-6 pb-5 flex justify-between items-center">
          <button 
            onClick={handleDownload}
            className="text-blue-400 hover:text-blue-500 text-sm font-normal flex items-center gap-1"
          >
         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00065 14.6654C11.6825 14.6654 14.6673 11.6806 14.6673 7.9987C14.6673 4.3168 11.6825 1.33203 8.00065 1.33203C4.31875 1.33203 1.33398 4.3168 1.33398 7.9987C1.33398 11.6806 4.31875 14.6654 8.00065 14.6654Z" stroke="#2E8BC9" stroke-width="1.5"/>
<path d="M8.00065 10.6654V5.33203M8.00065 10.6654C7.53385 10.6654 6.66167 9.33583 6.33398 8.9987M8.00065 10.6654C8.46745 10.6654 9.33965 9.33583 9.66732 8.9987" stroke="#2E8BC9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            Download
          </button>
          
          <button 
            onClick={handleDelete}
            className="text-[#B42121] hover:text-red-600 text-sm font-normal"
          >
            Delete Document
          </button>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-6 space-y-5">
          {/* Document Name */}
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Document Name
            </label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white appearance-none cursor-pointer text-gray-600"
              >
                <option value="" className="text-gray-500">Select</option>
                <option value="contracts">Contracts</option>
                <option value="invoices">Invoices</option>
                <option value="reports">Reports</option>
                <option value="presentations">Presentations</option>
                <option value="other">Other</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date of Document */}
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Date of Document
            </label>
            <div className="relative">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="mm/dd/yyyy"
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white pr-10 text-gray-600"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7598 3.56063C16.2904 3.54085 15.791 3.52752 15.2598 3.51854V2C15.2598 1.72386 15.5956 1.5 16.0098 1.5C16.424 1.5 16.7598 1.72386 16.7598 2V3.56063Z" fill="#2E8BC9"/>
<path d="M20.5 12V14C20.5 15.8996 20.4993 17.2741 20.3584 18.3223C20.2368 19.2269 20.0174 19.8314 19.6445 20.2881L19.4746 20.4746C18.9973 20.952 18.3561 21.2194 17.3223 21.3584C16.2741 21.4993 14.8996 21.5 13 21.5H11C9.10042 21.5 7.72591 21.4993 6.67775 21.3584C5.77315 21.2368 5.16862 21.0173 4.71193 20.6445L4.52541 20.4746C4.04802 19.9973 3.78061 19.3561 3.64162 18.3223C3.50072 17.2741 3.50002 15.8996 3.50002 14V12C3.50002 11.4589 3.49961 10.9605 3.50295 10.5H20.4971C20.5004 10.9605 20.5 11.4589 20.5 12ZM8.0088 17.333C7.64062 17.333 7.33302 17.6318 7.33302 18C7.33302 18.3682 7.64062 18.667 8.0088 18.667L8.14357 18.6533C8.44727 18.5911 8.6758 18.3221 8.6758 18C8.6758 17.6779 8.44727 17.4089 8.14357 17.3467L8.0088 17.333ZM12.0049 17.333C11.6369 17.3332 11.3291 17.6319 11.3291 18C11.3291 18.3681 11.6369 18.6668 12.0049 18.667L12.1387 18.6533C12.4426 18.5912 12.6709 18.3222 12.6709 18C12.6709 17.6778 12.4426 17.4088 12.1387 17.3467L12.0049 17.333ZM8.0088 13.333C7.64062 13.333 7.33302 13.6318 7.33302 14C7.33302 14.3682 7.64062 14.667 8.0088 14.667L8.14357 14.6533C8.44727 14.5911 8.6758 14.3221 8.6758 14C8.6758 13.6779 8.44727 13.4089 8.14357 13.3467L8.0088 13.333ZM12.0049 13.333C11.6369 13.3332 11.3291 13.6319 11.3291 14C11.3291 14.3681 11.6369 14.6668 12.0049 14.667L12.1387 14.6533C12.4426 14.5912 12.6709 14.3222 12.6709 14C12.6709 13.6778 12.4426 13.4088 12.1387 13.3467L12.0049 13.333ZM16 13.333C15.6318 13.333 15.3242 13.6318 15.3242 14C15.3242 14.3682 15.6318 14.667 16 14.667L16.1348 14.6533C16.4384 14.591 16.667 14.322 16.667 14C16.667 13.678 16.4384 13.409 16.1348 13.3467L16 13.333ZM13 4.5C13.9585 4.5 14.7834 4.50027 15.5 4.51855C15.8595 4.52772 16.1918 4.54099 16.5 4.56152C16.7951 4.58119 17.0683 4.60746 17.3223 4.6416C18.3561 4.78059 18.9973 5.04801 19.4746 5.52539L19.6445 5.71191C20.0174 6.16861 20.2368 6.77313 20.3584 7.67773C20.4282 8.19701 20.4635 8.79637 20.4815 9.5H3.51857C3.53652 8.79637 3.57182 8.19701 3.64162 7.67773C3.78061 6.64393 4.04801 6.0028 4.52541 5.52539L4.71193 5.35547C5.16862 4.98267 5.77314 4.76322 6.67775 4.6416C6.93174 4.60746 7.20488 4.58119 7.50002 4.56152C7.80828 4.54099 8.14055 4.52772 8.50002 4.51855C9.21667 4.50027 10.0415 4.5 11 4.5H13Z" fill="#2E8BC9"/>
<path d="M7.30078 3.56063V2C7.30078 1.72386 7.63657 1.5 8.05078 1.5C8.465 1.5 8.80078 1.72386 8.80078 2V3.51854C8.26952 3.52752 7.77016 3.54085 7.30078 3.56063Z" fill="#2E8BC9"/>
</svg>

              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="pt-1">
            <button
              onClick={handleSaveChanges}
              className="w-full bg-[#2E8BC9] hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}