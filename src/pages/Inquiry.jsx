import React, { useState, useEffect } from 'react';
import { Send, User, Mail, Phone, MapPin, MessageSquare, Users, X } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;


const Inquiryform = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    packs: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setIsSuccess(false);

    // Prepare data for backend
    const payload = {
      name: formData.name,
      email: formData.email,
      number: formData.phone,
      city: formData.city,
      state: formData.state,
      numOfPerson: formData.packs,
      description: formData.message
    };

    try {
      await axios.post(`${API_BASE}/submitInquiry`, payload);
      setSubmitMessage('Thank you for your inquiry! We will get back to you soon.');
      setIsSuccess(true);

      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        state: '',
        packs: '',
        message: ''
      });
    } catch {
      setSubmitMessage('Something went wrong. Please try again.');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose]);

  return (
    <div className="rounded-xl shadow-lg overflow-hidden relative bg-transparent">
      <div className="md:flex">
        {/* Left Contact Info Section */}
        <div className="md:w-1/3 bg-[#f7710b] p-6 text-white">
          <h2 className="text-xl font-bold mb-3">Get in Touch</h2>
          <p className="text-orange-100 text-sm mb-6">
            We're here to help. Let us know your questions about our stays, bookings, or packages.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-start">
              <Phone className="w-5 h-5 mt-1 mr-3" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-orange-100">+91 9876543210</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-5 h-5 mt-1 mr-3" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-orange-100">info@devbhumihills.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mt-1 mr-3" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-orange-100">Devbhumi Hills Resort, Uttarakhand</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-2/3 p-6 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="City"
                  className="px-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  placeholder="State"
                  className="px-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent"
                />
              </div>
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="packs"
                value={formData.packs}
                onChange={handleChange}
                required
                placeholder="No. of Guests"
                min="1"
                className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Your Message"
                className="w-full pl-10 pr-3 py-2.5 border rounded-lg bg-white border-gray-300 focus:ring-2 focus:border-transparent resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#f7710b] hover:bg-[#df6508] disabled:bg-orange-400 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Inquiry
                  </>
                )}
              </button>
            </div>

            {submitMessage && (
              <div className={`mt-4 p-3 rounded-md text-sm text-center font-medium transition-all ${
                submitMessage.includes('Thank you')
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {submitMessage}
                {isSuccess && onClose && (
                  <p className="text-xs mt-1 text-green-600">Form will close automatically...</p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inquiryform;