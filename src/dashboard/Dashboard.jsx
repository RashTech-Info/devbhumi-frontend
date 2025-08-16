import React, { useEffect, useState } from 'react';
import { MessageSquare, ImageIcon, Star, Calendar } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminDashboard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/getInquiry`, { withCredentials: true })
      .then(res => setInquiries(Array.isArray(res.data) ? res.data : []))
      .catch(() => setInquiries([]));

    axios.get(`${API_BASE}/getAllReviews`, { withCredentials: true })
      .then(res => setReviews(Array.isArray(res.data) ? res.data : []))
      .catch(() => setReviews([]));

    axios.get(`${API_BASE}/getGallery`, { withCredentials: true })
      .then(res => setGallery(Array.isArray(res.data) ? res.data : []))
      .catch(() => setGallery([]));

    axios.get(`${API_BASE}/getContectUs`, { withCredentials: true })
      .then(res => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch(() => setEvents([]));
  }, []);

  const stats = [
    { title: 'Total Inquiries', value: inquiries.length, icon: MessageSquare, color: 'bg-blue-500' },
    { title: 'Total Reviews', value: reviews.length, icon: Star, color: 'bg-yellow-500' },
    { title: 'Total Images', value: gallery.length, icon: ImageIcon, color: 'bg-purple-500' },
    { title: 'Total Contact', value: events.length, icon: MessageSquare, color: 'bg-green-500' },
  ];

  const recentInquiries = [...inquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);
  const recentReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-gray-600">Welcome back!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl  shadow-md p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-xl shadow-inner`}>
                  <Icon className="text-white" size={20} />
                </div>
                <div className="ml-4 sm:ml-5">
                  <p className="text-sm sm:text-base font-medium  text-gray-600">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Inquiries</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {recentInquiries.length === 0 ? (
              <div className="text-gray-400 text-center text-sm sm:text-base">No inquiries yet.</div>
            ) : (
              recentInquiries.map((inquiry, index) => (
                <div
                  key={inquiry._id || index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="text-sm sm:text-base">
                    <h3 className="font-medium text-gray-900">{inquiry.name}</h3>
                    <p className="text-xs text-gray-500">{inquiry.description}</p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {inquiry.email} • {inquiry.phone}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {inquiry.eventType || inquiry.event} • {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide self-start sm:self-auto ${
                    inquiry.status === "Confirmed" ? "bg-green-100 text-green-700"
                    : inquiry.status === "Pending" ? "bg-yellow-100 text-yellow-700"
                    : inquiry.status === "In Review" ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700"
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
              ))
            )}

            <button
              onClick={() => navigate("/admin/inquiry")}
              className="w-full mt-4 text-green-800 hover:text-green-900 font-medium text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
            >
              View All Inquiries
            </button>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Reviews</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {recentReviews.length === 0 ? (
              <div className="text-gray-400 text-center text-sm sm:text-base">No reviews yet.</div>
            ) : (
              recentReviews.map((review, index) => (
                <div key={review._id || index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                    <div className="flex items-center gap-[1px]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{review.description}</p>
                  <p className="text-xs text-gray-500">{review.eventTitle}</p>
                </div>
              ))
            )}

            <button
              onClick={() => navigate("/admin/testimonials")}
              className="w-full mt-4 text-green-800 hover:text-green-900 font-medium text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
            >
              View All Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/admin/gallery")}
            className="flex items-center justify-center p-3 sm:p-4 bg-[#f7710b] text-white rounded-lg hover:bg-[#ab4c03] transition-all duration-200 cursor-pointer text-sm sm:text-base"
          >
            <ImageIcon className="mr-2" size={18} />
            Manage Gallery
          </button>
          <button
            onClick={() => navigate("/admin/testimonials")}
            className="flex items-center justify-center p-3 sm:p-4 bg-[#f7710b] text-white rounded-lg hover:bg-[#ab4c03] transition-all duration-200 cursor-pointer text-sm sm:text-base"
          >
            <Star className="mr-2" size={18} />
            Manage Reviews
          </button>
          <button
            onClick={() => navigate("/admin/inquiry")}
            className="flex items-center justify-center p-3 sm:p-4 bg-[#f7710b] text-white rounded-lg hover:bg-[#ab4c03] transition-all duration-200 cursor-pointer text-sm sm:text-base"
          >
            <MessageSquare className="mr-2" size={18} />
            Manage Inquiries
          </button>
          <button
            onClick={() => navigate("/admin/contact")}
            className="flex items-center justify-center p-3 sm:p-4 bg-[#f7710b] text-white rounded-lg hover:bg-[#ab4c03] transition-all duration-200 cursor-pointer text-sm sm:text-base"
          >
            <MessageSquare className="mr-2" size={18} />
            Manage Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
