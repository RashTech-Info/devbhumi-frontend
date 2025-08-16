import React from 'react';
import { X } from 'lucide-react';
import InquiryForm from '../pages/Inquiry';

const InquiryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 z-20 bg-white rounded-full p-2 shadow-md"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        {/* Inquiry Form */}
        <div className="p-0">
          <InquiryForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;
