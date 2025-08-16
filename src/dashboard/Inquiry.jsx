import React, { useState, useEffect } from 'react';
import { Eye, Trash2, Filter, Mail, User, Search, Calendar, Phone, MapPin, ChevronDown, X } from 'lucide-react';
import axios from 'axios';
import cookie from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE;

const Inquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const adjwt = cookie.get('devjwt');

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/getInquiry`, {
          headers: { Authorization: `Bearer ${adjwt}` },
          withCredentials: true
        });
        setInquiries(res.data);
        // toast.success('Inquiries loaded successfully');
      } catch (err) {
        setInquiries([]);
        toast.error('Failed to fetch inquiries');
      }
      setLoading(false);
    };
    fetchInquiries();
  }, [adjwt]);

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'New').length;
  const contactedInquiries = inquiries.filter(i => i.status === 'Contacted').length;
  const declinedInquiries = inquiries.filter(i => i.status === 'Declined').length;

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    const toastId = toast.loading('Deleting inquiry...');
    try {
      await axios.delete(`${API_BASE}/deleteInquiry/${id}`, {
        headers: { Authorization: `Bearer ${adjwt}` },
        withCredentials: true
      });
      setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
      toast.success('Inquiry deleted successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to delete inquiry', { id: toastId });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const toastId = toast.loading('Updating status...');
    try {
      await axios.patch(`${API_BASE}/updateInquiryStatus/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${adjwt}` },
        withCredentials: true
      });
      setInquiries(inquiries.map(inquiry =>
        inquiry._id === id ? { ...inquiry, status: newStatus } : inquiry
      ));
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
      toast.success('Status updated successfully', { id: toastId });
    } catch (err) {
      toast.error('Failed to update status', { id: toastId });
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = filterStatus === 'All' || inquiry.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
      (inquiry.name && inquiry.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inquiry.email && inquiry.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inquiry.description && inquiry.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inquiry.city && inquiry.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inquiry.state && inquiry.state.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-green-100 text-green-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openDetailsModal = (inquiry) => setSelectedInquiry(inquiry);
  const closeDetailsModal = () => setSelectedInquiry(null);

  return (
    <div className=" bg-gray-50 min-h-screen">
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
              <p className="text-2xl font-bold">{totalInquiries}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New</p>
              <p className="text-2xl font-bold">{newInquiries}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contacted</p>
              <p className="text-2xl font-bold">{contactedInquiries}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Declined</p>
              <p className="text-2xl font-bold">{declinedInquiries}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Mail className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Inquiry Management</h2>
        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown size={18} className="ml-2" />
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                </tr>
              ) : filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-400" />
                            <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                          </div>
                          <div className="flex items-center mt-1">
                            <Mail size={14} className="mr-2 text-gray-400" />
                            <div className="text-sm text-gray-500">{inquiry.email}</div>
                          </div>
                          <div className="flex items-center mt-1">
                            <Phone size={14} className="mr-2 text-gray-400" />
                            <div className="text-sm text-gray-500">{inquiry.number}</div>
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin size={14} className="mr-2 text-gray-400" />
                            <div className="text-sm text-gray-500">{inquiry.city}, {inquiry.state}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{inquiry.description}</div>
                        <div className="text-xs text-gray-500 mt-1">Persons: {inquiry.numOfPerson || '-'}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                        className={`px-3 py-1 text-xs rounded-lg ${getStatusColor(inquiry.status)} cursor-pointer`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openDetailsModal(inquiry)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50 cursor-pointer"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No inquiries found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900">Inquiry Details</h3>
              <button 
                onClick={closeDetailsModal} 
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Name</h4>
                  <p className="text-base text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                  <p className="text-base text-gray-900">{selectedInquiry.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                  <p className="text-base text-gray-900">{selectedInquiry.number}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                  <p className="text-base text-gray-900">
                    {selectedInquiry.city}, {selectedInquiry.state}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Persons</h4>
                  <p className="text-base text-gray-900">{selectedInquiry.numOfPerson || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Date</h4>
                  <p className="text-base text-gray-900">
                    {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleDateString() : ''}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-base text-gray-900 whitespace-pre-line">{selectedInquiry.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <select
                  value={selectedInquiry.status}
                  onChange={async (e) => {
                    await handleStatusChange(selectedInquiry._id, e.target.value);
                  }}
                  className={`px-3 py-2 text-sm rounded-lg ${getStatusColor(selectedInquiry.status)} cursor-pointer`}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiry;