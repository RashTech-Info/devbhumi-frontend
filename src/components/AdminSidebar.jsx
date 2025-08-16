import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Image, 
  MessageSquare, 
  Settings, 
  LogOut,
  X
} from 'lucide-react';
import Cookies from "js-cookie";
import logo from '../images/main-logo.webp';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/gallery', icon: Image, label: 'Gallery' },
    { path: '/admin/inquiry', icon: MessageSquare, label: 'Inquiries' },
    { path: '/admin/testimonials', icon: Users, label: 'Testimonials' },
    { path: '/admin/contact', icon: Users, label: 'Contacts' },
    { path: '/admin/profile', icon: Settings, label: 'Profile' },
  ];

  const handleConfirmLogout = () => {
    Cookies.remove("devjwt");
    setShowLogoutPopup(false);
    navigate("/admin/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden cursor-pointer"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
        md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header with centered logo */}
        <div className="p-4 border-b border-gray-300 flex justify-center items-center relative">
        <Link to="/admin/dashboard">
  <img
    src={logo}
    alt="Admin Panel"
    className="h-10 w-auto object-contain cursor-pointer"
  />
</Link>
          {/* Close button for mobile */}
          <button 
            onClick={toggleSidebar}
            className="absolute right-4 md:hidden p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      isActive 
                        ? 'bg-[#f7710b] text-white' 
                        : 'text-gray-700 hover:bg-green-900 hover:text-white'
                    }`}
                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Logout button */}
          <div className="pt-1 mt-[130px] border-t">
            <button 
              onClick={() => setShowLogoutPopup(true)}
              className="flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 w-full cursor-pointer"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          {/* Background overlay */}
          <div 
            className="absolute inset-0 bg-black/50 cursor-pointer"
            onClick={() => setShowLogoutPopup(false)}
          />
          {/* Popup box */}
          <div className="bg-white rounded-lg shadow-lg p-6 z-50 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
