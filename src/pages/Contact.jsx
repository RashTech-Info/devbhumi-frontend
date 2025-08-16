import React, { useState } from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import exploretop from '../images/contacttop.png';
import contactpic from '../images/contactimg.png';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE}/addContactUs`, {
        name: formData.name,
        email: formData.email,
        number: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError(error?.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
       <Helmet>
        <title>Contact - Dev Bhumi Uttarakhand</title>
        <meta
          name="description"
          content="Get in touch with Dev Bhumi Uttarakhand. Reach out for inquiries, travel guidance, pilgrimage support, or cultural collaborations across the sacred land of Uttarakhand."
        />
        <meta
          name="keywords"
          content="Contact Dev Bhumi Uttarakhand, Uttarakhand Tourism Help, Spiritual Travel Support, Pilgrimage Queries, Cultural Tours Uttarakhand"
        />
        <meta name="author" content="Dev Bhumi Uttarakhand" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[790px] -mt-18 flex flex-col justify-center items-center p-4 md:p-8 text-center relative overflow-hidden text-white"
        style={{
          backgroundImage: `url(${exploretop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="absolute bottom-0 w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[300px] z-20 bg-gradient-to-b from-transparent to-white"></div>

        {/* Text Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-bold mb-2 -mt-16 md:-mt-24 tracking-wider">
            Contact Us
          </h1>
          <p className="text-3xl sm:text-5xl lg:text-[110px] font-bold animate-fade-in-up delay-100">
            Get in Touch
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 md:mt-6 font-semibold leading-relaxed">
            Reach out to us for guidance, bookings, or inquiries about your journey through Dev Bhumi Uttarakhand. 
            Whether it's spiritual exploration, mountain adventure, or cultural immersion — we're here to assist you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="flex  flex-col px-10 py-15 md:px-8 lg:px-15 lg:flex-row bg-white" id="contact-form">
        <div className="hidden lg:block lg:w-1/2  bg-center bg-no-repeat" style={{ backgroundImage: `url(${contactpic})` }} />

        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>

          {submitSuccess && (
            <div className="p-4 mb-4 bg-green-100 text-green-800 rounded-lg">
              ✅ Your message has been sent successfully!
              <button onClick={() => setSubmitSuccess(false)} className="ml-4 text-green-700 underline">Send another</button>
            </div>
          )}

          {submitError && (
            <div className="p-4 mb-4 bg-red-100 text-red-800 rounded-lg">{submitError}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input id="name" placeholder='Enter your full name' value={formData.name} onChange={handleChange} className="w-full border rounded-lg p-2" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
             <div>
  <label className="block text-sm font-medium">Mobile Number</label>
  <input
    id="phone"
    placeholder="Enter your mobile number"
    value={formData.phone}
    onChange={(e) => {
      // Allow only digits
      const onlyNumbers = e.target.value.replace(/\D/g, "");
      handleChange({ target: { id: "phone", value: onlyNumbers } });
    }}
    maxLength={10} // optional: restrict to 10 digits
    className="w-full border rounded-lg p-2"
  />
  {errors.phone && (
    <p className="text-red-500 text-sm">{errors.phone}</p>
  )}
</div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input id="email" type="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} className="w-full border rounded-lg p-2" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
             <div>
  <label className="block text-sm font-medium">Subject</label>
  <input
    id="subject"
    placeholder="Enter the subject"
    value={formData.subject}
    onChange={(e) => {
      // Remove numbers from input
      const onlyText = e.target.value.replace(/[0-9]/g, "");
      handleChange({ target: { id: "subject", value: onlyText } });
    }}
    className="w-full border rounded-lg p-2"
  />
</div>

            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea id="message" placeholder='Enter your message' rows="4" value={formData.message} onChange={handleChange} className="w-full border rounded-lg p-2" />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#f7710b] text-white py-2 rounded-lg font-semibold">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
        <section className="bg-white py-8 sm:py-10 md:py-12 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          {/* Single Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
              Connect With Us
            </h2>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-green-500 text-white py-2 sm:py-3 px-4 sm:px-5 rounded-lg hover:bg-green-600 transition mb-4 sm:mb-6"
            >
              <FaWhatsapp className="mr-2 text-xl sm:text-2xl" />
              <span>Chat on WhatsApp</span>
            </a>

            {/* Social Icons */}
            <p className="text-gray-600 mb-3 sm:mb-4">Follow us on</p>
            <div className="flex justify-center space-x-3 sm:space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                aria-label="Facebook"
              >
                <FaFacebook className="text-lg sm:text-xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-lg sm:text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-3 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg sm:text-xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
