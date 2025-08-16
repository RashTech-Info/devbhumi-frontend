"use client";
import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, X, Upload, MessageSquare, Phone, ZoomIn } from "lucide-react";
import { Helmet } from "react-helmet";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const StarRating = ({ rating, onRatingChange = null, interactive = false }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 ${
          star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-300" : ""}`}
        onClick={() => interactive && onRatingChange && onRatingChange(star)}
      />
    ))}
  </div>
);

const ImagePopup = ({ images, isOpen, onClose, currentIndex, setCurrentIndex }) => {
  if (!isOpen) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all z-10"
        >
          <X className="w-6 h-6 text-black" />
        </button>
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        <div className="bg-white rounded-lg max-h-[80vh] overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Testimonial image ${currentIndex + 1}`}
            className="w-full h-auto max-h-[60vh] object-contain mx-auto"
          />
          {images.length > 1 && (
            <div className="p-4 flex gap-2 justify-center">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial, onImageClick }) => {
  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('http')) return img;
    return `${API_BASE}/uploads/${img}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 group">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-md">
          {testimonial.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
          <p className="text-gray-500 text-sm">{new Date(testimonial.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}</p>
          <p className="text-gray-500 text-xs mt-2 hidden sm:block truncate">{testimonial.email}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>
      <div className="mb-4 flex-grow">
        <p className="text-gray-700 relative pl-4">
          <span className="absolute left-0 top-0 text-2xl text-gray-300 leading-none">"</span>
          {testimonial.description}
        </p>
      </div>
      {testimonial.Images && testimonial.Images.length > 0 && (
        <div className="mt-auto">
          <div className="flex gap-2 flex-wrap">
            {testimonial.Images.slice(0, 5).map((image, index) => {
              const imageUrl = getImageUrl(image);
              return (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-md overflow-hidden cursor-pointer group-hover:shadow-md transition-shadow"
                  onClick={() => onImageClick(testimonial.Images.map(img => getImageUrl(img)), index)}
                >
                  {imageUrl ? (
                    <>
                      <img
                        src={imageUrl}
                        alt={`${testimonial.name}'s experience`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/default-image.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="text-white w-5 h-5" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Image</span>
                    </div>
                  )}
                  {index === 4 && testimonial.Images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        +{testimonial.Images.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
        <button 
          className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1 transition-colors"
          onClick={() => onImageClick(testimonial.Images.map(img => getImageUrl(img)), 0)}
        >
          <MessageSquare className="w-4 h-4" />
          View Experience
        </button>
      </div> */}
    </div>
  );
};

const TestimonialCarousel = ({ testimonials, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative px-4 sm:px-8">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="w-full flex-shrink-0 px-2">
              <TestimonialCard testimonial={testimonial} onImageClick={onImageClick} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110 z-10"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110 z-10"
        aria-label="Next testimonial"
      >
        <ChevronRight className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-blue-500 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const FeedbackForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
    images: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length <= 5) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("description", formData.message);
      data.append("rating", formData.rating);
      formData.images.forEach((img) => data.append("Images", img));
      await axios.post(`${API_BASE}/addReview`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
        rating: 0,
        images: [],
      });
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 2000);
    } catch (err) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Submit Feedback</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>
        {isSubmitted ? (
          <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Successfully Submitted!</h3>
            <p className="text-gray-600 text-center">Thank you for your feedback. Your review has been submitted successfully.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="pt-1">
                <StarRating
                  rating={formData.rating}
                  onRatingChange={handleRatingChange}
                  interactive={true}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Share your thoughts or feedback..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos (max 5)
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="image-upload"
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 text-gray-600 transition"
                >
                  <Upload className="w-5 h-5 text-orange-500" />
                  Upload Images
                </label>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={typeof image === "string" ? (image.startsWith("http") ? image : URL.createObjectURL(image)) : URL.createObjectURL(image)}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 shadow group-hover:opacity-100 opacity-0 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.message ||
                formData.rating === 0 ||
                submitting
              }
              className="w-full py-3 rounded-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const TestimonialPage = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [imagePopup, setImagePopup] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE}/getActiveReviews`);
        setTestimonials(res.data);
      } catch (err) {
        setTestimonials([]);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const handleImageClick = (images, index) => {
    setImagePopup({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  const closeImagePopup = () => {
    setImagePopup({
      isOpen: false,
      images: [],
      currentIndex: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Testimonials - Dev Bhumi Uttarakhand</title>
        <meta
          name="description"
          content="Read heartfelt testimonials from travelers, pilgrims, and adventurers who experienced the spiritual, cultural, and natural wonders of Dev Bhumi Uttarakhand."
        />
        <meta
          name="keywords"
          content="Dev Bhumi Uttarakhand Reviews, Visitor Testimonials, Travel Experiences, Pilgrim Stories, Spiritual Journeys, Uttarakhand Feedback"
        />
        <meta name="author" content="Dev Bhumi Uttarakhand" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <button
        onClick={() => setIsFeedbackOpen(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2  text-[#f7710b] border-r-2  p-1 rounded-r-md shadow-lg hover:bg-[#f7710b] z-50   hover:text-white  "
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span className="text-sm m-1 sm:text-base font-medium whitespace-nowrap group-hover:animate-pulse">
           Feedback
        </span>
      </button>
      <section
        className="h-[400px] sm:h-[600px] lg:h-[790px] -mt-18 flex flex-col justify-center items-center p-4 sm:p-8 text-center relative overflow-hidden"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute bottom-0 w-full h-[200px] sm:h-[300px] z-20 bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="max-w-4xl mx-auto relative z-30 text-white">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold font-montserrat mb-2 -mt-12 sm:-mt-24 animate-fade-in-up">
            Testimonials
          </h1>
          <p className="text-3xl sm:text-5xl lg:text-[110px] font-bold font-montserrat animate-fade-in-up delay-100">
            DevBhumi Voices
          </p>
          <p className="text-sm sm:text-lg lg:text-2xl mt-4 sm:mt-6 mb-4 sm:mb-6 font-semibold leading-relaxed animate-fade-in-up delay-200 px-4">
            Hear heartfelt stories from pilgrims, adventurers, and seekers whose souls were touched
            by the divine beauty, peace, and magic of Uttarakhand.
          </p>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Client Feedback
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Don't just take our word for it - hear from travelers who've experienced our service firsthand
            </p>
          </div>
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">Loading testimonials...</p>
              </div>
            ) : testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                  onImageClick={handleImageClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No reviews found. Be the first to share your experience!</p>
              </div>
            )}
          </div>
          <div className="sm:hidden">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading testimonials...</p>
              </div>
            ) : testimonials.length > 0 ? (
              <TestimonialCarousel testimonials={testimonials} onImageClick={handleImageClick} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No reviews found. Be the first to share your experience!</p>
              </div>
            )}
          </div>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl text-center hover:bg-gray-100 transition-colors">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600 text-xs sm:text-sm">Satisfaction Rate</p>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl text-center hover:bg-gray-100 transition-colors">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">10K+</p>
              <p className="text-gray-600 text-xs sm:text-sm">Happy Travelers</p>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl text-center hover:bg-gray-100 transition-colors">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">4.9</p>
              <p className="text-gray-600 text-xs sm:text-sm">Average Rating</p>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl text-center hover:bg-gray-100 transition-colors">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">50+</p>
              <p className="text-gray-600 text-xs sm:text-sm">Destinations</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 lg:py-20 bg-white text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready for Your Adventure?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
            Let us craft your perfect travel experience. Share your dream trip with us and we'll make it a reality.
          </p>
            <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-0 w-full sm:w-auto">
  {/* Contact Button */}
  <button
    onClick={() => (window.location.href = "/contact")}
    className="bg-[#f7710b] text-white hover:bg-gray-700 px-6 sm:px-8 py-3 rounded-full sm:rounded-l-full sm:rounded-r-none font-medium transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
  >
    Contact Us
  </button>

  {/* Phone Button */}
  <a href="tel:+919848362750" className="w-full sm:w-auto">
    <button className="bg-[#f7710b] text-white hover:bg-gray-700 px-6 ml-1 sm:px-8 py-3 rounded-full sm:rounded-r-full sm:rounded-l-none font-medium transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto">
      +91-9848362750
    </button>
  </a>
</div>  
        </div>
      </section>
      <ImagePopup
        images={imagePopup.images}
        isOpen={imagePopup.isOpen}
        onClose={closeImagePopup}
        currentIndex={imagePopup.currentIndex}
        setCurrentIndex={(index) => setImagePopup((prev) => ({ ...prev, currentIndex: index }))}
      />
      <FeedbackForm isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
};

export default TestimonialPage;