import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import footerBg from '../images/footerbg.png';
import logo from '../images/main-logo.webp';
import devLogo from '../images/rash-tech-logo.png'; // Your rashtechinfo logo image

export default function Footer() {
  return (
    <footer
      className="text-white  pt-36 pb-3 px-6 md:px-20 relative z-10"
      style={{
        backgroundImage: `url(${footerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // backgroundColor: '#ffff'
      }}
    >
       <div className="absolute inset-0 bg-black/30 z-0"></div>
      {/* <div className="absolute inset-0 z-0"></div> */}

    <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
  {/* Left: Logo Circle + Description */}
  <div className="flex flex-col items-start md:items-start gap-4 w-full md:w-1/3">
    <div className="w-32 h-32 rounded-full overflow-hidden">
      <img
        src={logo}
        alt="Suno Logo"
        className="w-full h-full object-contain"
      />
    </div>
   <p className="font-bold text-sm text-left md:text-left">
  Experience the divine charm of <br />
  the Himalayas with <strong>Dev Bhumi</strong> — <br />
  where culture meets serenity.
</p>

  </div>

  {/* Center: Quick Links */}
  <div className="text-left md:text-left w-full md:w-1/3">
    <h3 className="font-bold mb-3 text-lg">Quick Links</h3>
    <ul className="space-y-2 text-sm">
      <li><a href="/" className="hover:text-[#f7710b]">Home</a></li>
      <li><a href="/about" className="hover:text-[#f7710b]">About</a></li>
      <li><a href="/explore" className="hover:text-[#f7710b]">Explore</a></li>
      <li><a href="/gallery" className="hover:text-[#f7710b]">Gallery</a></li>
      <li><a href="/testimonial" className="hover:text-[#f7710b]">Testimonial</a></li>
      <li><a href="/contact" className="hover:text-[#f7710b]">Contact Us</a></li>
    </ul>
  </div>

  {/* Right: Info + Socials */}
  <div className="text-left md:text-left w-full md:w-1/3">
    <p className="text-sm mb-4">
      Discover the essence of <br />
      spirituality and culture with <br />
      <strong> Dev Bhumi.</strong>
    </p>
    <ul className="text-sm space-y-2">
      <li className="flex items-center gap-2 justify-start md:justify-start">
        <FaMapMarkerAlt /> 123 Dev Bhumi Street, Uttarakhand
      </li>
      <li className="flex items-center gap-2 justify-start md:justify-start">
        <FaPhoneAlt /> +91 9876543210
      </li>
      <li className="flex items-center gap-2 justify-start md:justify-start">
        <FaEnvelope /> info@example.com
      </li>
      <li className="flex items-center gap-4 justify-start md:justify-start mt-2">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="hover:text-pink-600 cursor-pointer" />
        </a>
      </li>
    </ul>
  </div>
</div>

{/* Bottom Text */}
<div className="relative z-10 text-center text-sm font-montserrat mt-10 border-t border-white pt-4 flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-2">
  <span>© {new Date().getFullYear()} DEV BHUMI . All Rights Reserved.</span>
  <span className="text-white text-sm">Design & Developed by</span>
  <a href="https://rashtechinfo.com" target="_blank" rel="noopener noreferrer">
    <img src={devLogo} alt="Rashtechinfo Logo" className="inline-block h-6 ml-2" />
  </a>
</div>



    </footer>
  );
}

