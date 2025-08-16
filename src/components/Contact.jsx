import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE;

const faqs = [
  { question: "What is Dev Bhumi?", answer: "Dev Bhumi is a travel and cultural platform dedicated to exploring Uttarakhand’s spiritual sites, local traditions, and natural beauty." },
  { question: "Which destinations are covered?", answer: "We highlight key places like Kedarnath, Badrinath, Rishikesh, Haridwar, Nainital, Valley of Flowers, Chopta, and many hidden gems." },
  { question: "Is Dev Bhumi free to use?", answer: "Yes, Dev Bhumi is free for all users. Premium features like guided trips or exclusive local stays may have additional charges." },
  { question: "Can I book stays or treks through Dev Bhumi?", answer: "Yes, we are collaborating with local providers to offer homestays, treks, and pilgrimage packages directly through the platform." },
  { question: "How do I contact the Dev Bhumi team?", answer: "You can reach us through the contact form provided on this page. We’re here to help with travel queries or partnerships." },
  { question: "Is it available as a mobile app?", answer: "Yes, Dev Bhumi is available as a mobile app for Android and iOS, helping you explore Uttarakhand anytime, anywhere." },
];

export default function FaqContactPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE}/addContactUs`, {
        name: formData.name,
        number: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });
      setSubmitSuccess(true);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitError(err?.response?.data?.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-20 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* FAQ Section */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Frequently <span className='text-[#f7710b]'> Asked Questions</span>
          </h2>
          <p className="text-gray-600 mb-8">Clear your doubts about Dev Bhumi and how it helps you travel Uttarakhand better.</p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl shadow-sm">
                <button
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-green-800 hover:bg-green-50 transition"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openIndex === index ? (
                    <ChevronUp className="text-[#f7710b] w-5 h-5" />
                  ) : (
                    <ChevronDown className="text-[#f7710b] w-5 h-5" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 text-gray-700 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-green-50 p-10 rounded-2xl shadow-md border border-green-100 max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            Contact <span className="text-[#f7710b]">Us</span>
          </h2>
          <p className="text-gray-600 mb-6">
            We’d love to hear from you. Whether it's a question, suggestion, or just a hello!
          </p>

          {submitSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              ✅ Message sent successfully!
            </div>
          )}
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
              ❌ {submitError}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f7710b] focus:border-[#f7710b] transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f7710b] focus:border-[#f7710b] transition"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f7710b] focus:border-[#f7710b] transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f7710b] focus:border-[#f7710b] transition"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#f7710b] focus:border-[#f7710b] transition"
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f7710b] text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
