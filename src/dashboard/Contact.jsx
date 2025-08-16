import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Trash2, Eye, User, Check, X, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE;

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Get admin JWT token from cookies
  const adjwt = Cookies.get('devjwt');

  // Fetch contacts from backend
  const fetchContacts = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const res = await axios.get(`${API_BASE}/getContectUs`, {
        headers: { Authorization: `Bearer ${adjwt}` },
        withCredentials: true,
      });
      setContacts(res.data);
    } catch (err) {
      setFetchError(
        err?.response?.data?.message ||
        'Failed to fetch contacts. Please try again.'
      );
      setContacts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, []);

  // Calculate statistics
  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'New').length,
    contacted: contacts.filter(c => c.status === 'Contacted').length,
    declined: contacts.filter(c => c.status === 'Declined').length,
  };

  // Filter contacts based on status
  const filteredContacts =
    filterStatus === 'All'
      ? contacts
      : contacts.filter(contact => contact.status === filterStatus);

  // Handle delete click - show confirmation modal
  const handleDeleteClick = (id) => {
    setContactToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    const toastId = toast.loading('Deleting contact...');
    if (!contactToDelete) return;
    setDeleting(true);
    try {
      await axios.delete(`${API_BASE}/deleteContectUs/${contactToDelete}`, {
        headers: { Authorization: `Bearer ${adjwt}` },
        withCredentials: true,
      });
      setContacts(contacts.filter(contact => contact._id !== contactToDelete));
      setShowDeleteModal(false);
      setContactToDelete(null);
      toast.success('Contact deleted successfully', { id: toastId });
    } catch (err) {
     toast.error('Failed to delete contact', { id: toastId });
    }
    setDeleting(false);
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  // Update contact status
  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdating(true);
    try {
      const res = await axios.patch(
        `${API_BASE}/contectUs/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${adjwt}` },
          withCredentials: true,
        }
      );
      setContacts(contacts.map(contact =>
        contact._id === id ? { ...contact, status: newStatus } : contact
      ));
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        'Failed to update status. Please try again.'
      );
    }
    setStatusUpdating(false);
  };

  // Open contact details modal
  const openDetails = (contact) => {
    setSelectedContact(contact);
  };

  // Close contact details modal
  const closeDetails = () => {
    setSelectedContact(null);
  };

  // Get status color class
  const getStatusColor = (status) => {
    const colors = {
      'New': 'bg-blue-100 text-blue-800',
      'Contacted': 'bg-green-100 text-green-800',
      'Declined': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get icon color for stats
  const getIconColor = (color) => {
    switch (color) {
      case 'blue': return 'text-blue-600';
      case 'yellow': return 'text-yellow-500';
      case 'green': return 'text-green-600';
      case 'red': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

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
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Total Contacts', value: stats.total, icon: User, color: 'blue' },
          { title: 'New', value: stats.new, icon: Clock, color: 'yellow' },
          { title: 'Contacted', value: stats.contacted, icon: Check, color: 'green' },
          { title: 'Declined', value: stats.declined, icon: X, color: 'red' },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow flex items-center p-5 space-x-4 hover:shadow-lg transition"
          >
            <div className={`p-3 rounded-full bg-${stat.color}-100`}>
              <stat.icon className={getIconColor(stat.color)} size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Contact Management</h1>
          <button
            onClick={fetchContacts}
            className="ml-2 p-2 rounded-full cursor-pointer bg-gray-100 hover:bg-blue-100 transition"
            title="Refresh"
          >
            <RefreshCw size={18} className="text-blue-600" />
          </button>
        </div>
        <div className="w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {fetchError && (
        <div className="flex items-center bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-6">
          <AlertCircle className="mr-2" size={20} />
          <span>{fetchError}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-8 w-8 text-blue-600 mr-2" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="text-blue-600 font-semibold">Loading contacts...</span>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="mr-1" size={14} /> {contact.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="mr-1" size={14} /> {contact.number}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{contact.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString()
                            : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openDetails(contact)}
                            className="text-blue-600 cursor-pointer hover:text-blue-900 p-1"
                            aria-label="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(contact._id)}
                            className="text-red-600 cursor-pointer hover:text-red-900 p-1"
                            aria-label="Delete contact"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No contacts found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
              <button
                onClick={closeDetails}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.number}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.subject}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedContact.createdAt
                      ? new Date(selectedContact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                      : ''}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">
                  {selectedContact.message}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <select
                  value={selectedContact.status}
                  onChange={async (e) => {
                    await handleStatusChange(selectedContact._id, e.target.value);
                    setSelectedContact({
                      ...selectedContact,
                      status: e.target.value,
                    });
                  }}
                  className={`px-3 py-2 text-sm rounded-md ${getStatusColor(selectedContact.status)} ${statusUpdating ? 'opacity-60' : ''}`}
                  disabled={statusUpdating}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Declined">Declined</option>
                </select>
                {statusUpdating && (
                  <span className="ml-2 text-xs text-blue-500">Updating...</span>
                )}
              </div>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={closeDetails}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <button onClick={cancelDelete} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this contact? This action cannot be undone.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;