import React, { useState, useRef, useEffect } from 'react';
import { Menu, User, LogOut, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

const AdminNavbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutPopup, setLogoutPopup] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [user, setUser] = useState({
    name: 'Admin',
    image: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE}/adminProfile`, {
          headers: {
            Authorization: `Bearer ${cookie.get('devjwt')}`
          },
          withCredentials: true
        });

        if (response.data && response.data.data) {
          setUser({
            name: response.data.data.name || 'Admin',
            image: response.data.data.admin_image || null
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/admin/logout`, {}, {
        headers: {
          Authorization: `Bearer ${cookie.get('devjwt')}`
        },
        withCredentials: true
      });

      cookie.remove('devjwt');
      localStorage.removeItem('adminAuth');
      navigate('/admin/login');
    } catch (error) {
      console.error('Error during logout:', error);
      cookie.remove('devjwt');
      localStorage.removeItem('adminAuth');
      navigate('/admin/login');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="animate-pulse h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="User menu"
              aria-expanded={dropdownOpen}
            >
              {user.image ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE}/uploads/${user.image}`}
                  crossOrigin="anonymous"
                  alt={user.image || "Profile"}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '';
                    e.target.className = 'w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center';
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
              )}
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {user.name}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/admin/profile');
                  }}
                  className="flex items-center px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Eye size={16} className="mr-2 text-gray-500" />
                  View Profile
                </button>

                <button
                  onClick={() => setLogoutPopup(true)}
                  className="flex items-center px-4 py-2 cursor-pointer text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <LogOut size={16} className="mr-2 text-red-500" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Popup */}
      {logoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setLogoutPopup(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;
