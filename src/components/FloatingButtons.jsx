import React, { useState, useEffect } from 'react';
import { ChevronUp,  } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const whatsappNumber = "919876543210"; // Replace with your actual WhatsApp number

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    const message = "Hello! I would like to inquire about your services.";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="bg-[#f7710b] cursor-pointer hover:bg-#b85407 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          aria-label="Back to top"
        >
          <ChevronUp size={15} />
        </button>
      )}
      
      {/* WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="bg-green-500  cursor-pointer  hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp  size={15} />
      </button>
    </div>
  );
};

export default FloatingButtons;
