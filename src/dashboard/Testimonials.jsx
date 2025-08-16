import React, { useState, useEffect } from 'react';
import { Star, Trash2, Filter, Eye, Check, X, Mail, User, AlertCircle, Clock } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const API_BASE = import.meta.env.VITE_API_BASE;

const statusMap = {
  Approved: true,
  Declined: false,
  Pending: null
};

const getStatusLabel = (toggle) => {
  if (toggle === true) return 'Approved';
  if (toggle === false) return 'Declined';
  return 'Pending';
};

const getInitials = (name) => {
  if (!name) return "US";
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/getAllReviews`, { withCredentials: true });
        setTestimonials(res.data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials([]);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const totalTestimonials = testimonials.length;
  const approvedTestimonials = testimonials.filter(t => t.toggle === true).length;
  const declinedTestimonials = testimonials.filter(t => t.toggle === false).length;
  const pendingTestimonials = testimonials.filter(t => t.toggle === null || t.toggle === undefined).length;

  const filteredTestimonials =
    filterStatus === 'All'
      ? testimonials
      : testimonials.filter(t => {
          if (filterStatus === 'Approved') return t.toggle === true;
          if (filterStatus === 'Declined') return t.toggle === false;
          if (filterStatus === 'Pending') return t.toggle === null || t.toggle === undefined;
          return true;
        });

  const handleDeleteClick = (id) => {
    setTestimonialToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    const toastId = toast.loading('Deleting testimonial...');
    try {
      await axios.delete(`${API_BASE}/deleteReview/${testimonialToDelete}`, { withCredentials: true });
      setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialToDelete));
      toast.success('Testimonial deleted successfully', { id: toastId })
    } catch (err) {
      toast.error('Failed to delete review', { id: toastId });
    }
    setShowDeleteModal(false);
    setTestimonialToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTestimonialToDelete(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    const toastId = toast.loading('Updating status...');
    const toggle = statusMap[newStatus];
    try {
      await axios.patch(`${API_BASE}/updateReview/${id}`, { toggle }, { withCredentials: true });
      setTestimonials(testimonials.map(t =>
        t._id === id ? { ...t, toggle } : t
      ));
      toast.success('Status updated successfully', { id: toastId });
      if (selectedTestimonial && selectedTestimonial._id === id) {
        setSelectedTestimonial({ ...selectedTestimonial, toggle });
        
      }
    } catch (err) {
      toast.error('Failed to update status', { id: toastId });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const openDetails = (testimonial) => setSelectedTestimonial(testimonial);
  const closeDetails = () => setSelectedTestimonial(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE}/uploads/${imagePath}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"></h1>
        <p className="text-gray-600">Manage and moderate customer testimonials</p>
      </div> */}
      <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: '8px',
                  padding: '12px 16px',
                  fontSize: '14px',
                },
                success: {
                  style: {
                    background: '#10B981',
                    color: 'white',
                  },
                  iconTheme: {
                    primary: 'white',
                    secondary: '#10B981',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                    color: 'white',
                  },
                  iconTheme: {
                    primary: 'white',
                    secondary: '#EF4444',
                  },
                },
                loading: {
                  style: {
                    background: '#F3F4F6',
                    color: '#4B5563',
                  },
                },
              }}
            />

      {/* Stats Cards - Ordered as: Pending, Approved, Declined, Total */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Pending Card - First */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-gray-100 hover:border-amber-100 transition-colors">
          <div className="p-3 bg-amber-50 rounded-lg mr-4">
            <Clock className="text-amber-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Review</p>
            <p className="text-2xl font-semibold text-gray-800">{pendingTestimonials}</p>
          </div>
        </div>
        
        {/* Approved Card - Second */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-gray-100 hover:border-green-100 transition-colors">
          <div className="p-3 bg-green-50 rounded-lg mr-4">
            <Check className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Approved</p>
            <p className="text-2xl font-semibold text-gray-800">{approvedTestimonials}</p>
          </div>
        </div>
        
        {/* Declined Card - Third */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-gray-100 hover:border-red-100 transition-colors">
          <div className="p-3 bg-red-50 rounded-lg mr-4">
            <AlertCircle className="text-red-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Declined</p>
            <p className="text-2xl font-semibold text-gray-800">{declinedTestimonials}</p>
          </div>
        </div>
        
        {/* Total Card - Fourth */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-gray-100 hover:border-blue-100 transition-colors">
          <div className="p-3 bg-blue-50 rounded-lg mr-4">
            <User className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Reviews</p>
            <p className="text-2xl font-semibold text-gray-800">{totalTestimonials}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
     {/* Filters */}
<div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
  <div className="flex items-center space-x-2">
    <div className="hidden sm:flex space-x-2">
      <button
        onClick={() => setFilterStatus('All')}
        className={`px-3 py-1.5 text-sm cursor-pointer rounded-lg border ${
          filterStatus === 'All'
            ? 'bg-blue-50 border-blue-200 text-blue-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilterStatus('Pending')}
        className={`px-3 py-1.5 text-sm cursor-pointer rounded-lg border ${
          filterStatus === 'Pending'
            ? 'bg-amber-50 border-amber-200  text-amber-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilterStatus('Approved')}
        className={`px-3 py-1.5 text-sm cursor-pointer rounded-lg border ${
          filterStatus === 'Approved'
            ? 'bg-green-50 border-green-200 text-green-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        Approved
      </button>
      <button
        onClick={() => setFilterStatus('Declined')}
        className={`px-3 py-1.5 text-sm cursor-pointer rounded-lg border ${
          filterStatus === 'Declined'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}
      >
        Declined
      </button>
    </div>
    
    {/* Mobile dropdown */}
    <div className="relative sm:hidden">
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="appearance-none px-3 py-1.5 pr-8 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Declined">Declined</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
</div>
      {/* Rest of your component remains the same */}
      {/* Testimonials Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        </div>
      ) : filteredTestimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {testimonial.avatar ? (
                        <img
                          src={getImageUrl(testimonial.avatar)}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-medium ${
                          testimonial.avatar ? 'hidden' : ''
                        }`}
                      >
                        {getInitials(testimonial.name)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Mail size={12} className="mr-1" /> {testimonial.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ">
                    <button
                      onClick={() => openDetails(testimonial)}
                      className="text-gray-400 cursor-pointer hover:text-blue-500 p-1 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(testimonial._id)}
                      className="text-gray-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    {renderStars(testimonial.rating)}
                    <span className="ml-2 text-sm text-gray-600">{testimonial.rating}.0</span>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-3">{testimonial.description}</p>
                </div>

                {testimonial.Images && testimonial.Images.length > 0 && (
                  <div className="mb-4">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                      {testimonial.Images.slice(0, 3).map((img, index) => (
                        <img
                          key={index}
                          src={getImageUrl(img)}
                          alt={`Review ${index + 1}`}
                          className="h-16 w-16 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src = "/default-image.png";
                          }}
                        />
                      ))}
                      {testimonial.Images.length > 3 && (
                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500">
                          +{testimonial.Images.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    {testimonial.createdAt
                      ? new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })
                      : ''}
                  </div>
                  <select
                    value={getStatusLabel(testimonial.toggle)}
                    onChange={(e) => handleStatusChange(testimonial._id, e.target.value)}
                    className={`text-xs px-3 py-1 rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      testimonial.toggle === true
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : testimonial.toggle === false
                        ? 'bg-red-50 text-red-700 border border-red-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <div className="max-w-md mx-auto">
            <Filter size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No reviews found</h3>
            <p className="text-gray-500">
              {filterStatus === 'All' 
                ? "There are no reviews yet." 
                : `No ${filterStatus.toLowerCase()} reviews found.`}
            </p>
          </div>
        </div>
      )}

      {/* Review Details Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-5">
              <h3 className="text-xl font-semibold text-gray-900">Review Details</h3>
              <button 
                onClick={closeDetails} 
                className="text-gray-400 cursor-pointer hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-5">
              <div className="flex items-start space-x-4">
                <div className="relative">
                  {selectedTestimonial.avatar ? (
                    <img
                      src={getImageUrl(selectedTestimonial.avatar)}
                      alt={selectedTestimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center bg-blue-500 text-white font-medium text-xl ${
                      selectedTestimonial.avatar ? 'hidden' : ''
                    }`}
                  >
                    {getInitials(selectedTestimonial.name)}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">{selectedTestimonial.name}</h4>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Mail size={14} className="mr-2" /> {selectedTestimonial.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                {renderStars(selectedTestimonial.rating)}
                <span className="ml-2 text-gray-700">{selectedTestimonial.rating}.0</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Review</h4>
                <p className="text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">
                  {selectedTestimonial.description}
                </p>
              </div>
              
              {selectedTestimonial.Images && selectedTestimonial.Images.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Images ({selectedTestimonial.Images.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedTestimonial.Images.map((img, index) => (
                      <img
                        key={index}
                        src={getImageUrl(img)}
                        alt={`Review ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "/default-image.png";
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                  <p className="text-gray-700">
                    {selectedTestimonial.createdAt
                      ? new Date(selectedTestimonial.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : ''}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <select
                    value={getStatusLabel(selectedTestimonial.toggle)}
                    onChange={async (e) => {
                      await handleStatusChange(selectedTestimonial._id, e.target.value);
                      setSelectedTestimonial({
                        ...selectedTestimonial,
                        toggle: statusMap[e.target.value]
                      });
                    }}
                    className={`px-3 py-2 text-sm rounded cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      selectedTestimonial.toggle === true
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : selectedTestimonial.toggle === false
                        ? 'bg-red-50 text-red-700 border border-red-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-5 border-t border-gray-200">
              <button
                onClick={closeDetails}
                className="px-5 py-2 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 p-5">
              <h3 className="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
              <button 
                onClick={cancelDelete} 
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this testimonial? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;