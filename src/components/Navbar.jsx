"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../images/main-logo.webp";
import InquiryModal from "./InquiryModal";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };


  const linkClasses = (to) => `relative px-3 py-1 font-medium text-sm sm:text-base
    ${scrolled ? "text-black" : "text-white"}
    ${isActive(to) ? "bg-[#f7710b] text-white rounded-lg hover:text-white" : ""}
    hover:text-[#f7710b] transition-colors`;

  const openInquiryModal = () => {
    setInquiryModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 mx-2 mt-2 shadow-gray-700 rounded-xl backdrop-blur- transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Devbhumi Logo"
              className="h-20 w-20 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/explore", label: "Explore" },
              { to: "/gallery", label: "Gallery" },
              { to: "/testimonials", label: "Testimonials" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <a key={item.to} href={item.to} className={linkClasses(item.to)}>
                {item.label}
              </a>
            ))}

            <button
              onClick={openInquiryModal}
              className="ml-2 px-4 py-2 font-medium rounded-full bg-[#f7710b] text-white hover:bg-[#f7710bf7] transition-all text-sm sm:text-base cursor-pointer"
            >
              Inquiry
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X
                className={`h-5 w-5 sm:h-6 sm:w-6 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`h-5 w-5 sm:h-6 sm:w-6 ${
                  scrolled ? "text-black" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white text-black shadow-lg border-t border-gray-700 px-2 py-3 space-y-1">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/explore", label: "Explore" },
            { to: "/gallery", label: "Gallery" },
            { to: "/testimonials", label: "Testimonials" },
            { to: "/contact", label: "Contact Us" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-3 py-2 font-medium rounded-lg transition-all ${
                isActive(item.to)
                  ? "bg-green-400 text-black"
                  : "hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={openInquiryModal}
            className="block w-full text-left px-3 py-2 font-medium rounded-lg bg-[#f7710b] text-white hover:bg-[#f7710bf7]"
          >
            Inquiry
          </button>
        </div>
      )}

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
