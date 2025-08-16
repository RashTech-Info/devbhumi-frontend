"use client";
import React, { useState, useEffect } from "react";
import { Star, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
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
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial, onImageClick }) => {
  const getImageUrl = (img) => {
    if (!img) return null;
    return img.startsWith("http") ? img : `${API_BASE}/uploads/${img}`;
  };

  const name = testimonial.name;
  const initials = `${name?.charAt(0) || "U"}${name?.charAt(name?.lastIndexOf(" ") + 1) || ""}`;

  return (
    <div className="bg-white p-4  rounded-xl mb-5 shadow-lg border border-gray-100 flex flex-col min-w-[250px] max-w-[250px] flex-shrink-0">
      <div className="flex items-center mb-2">
        {testimonial.photo ? (
          <img
            src={getImageUrl(testimonial.photo)}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover border mr-3"
            onError={(e) => {
              e.target.src = "/default-image.png";
            }}
          />
        ) : (
          <div className="bg-[#f7710b] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {initials}
          </div>
        )}
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{testimonial.name}</h3>
          <p className="text-gray-500 text-xs">{testimonial.title}</p>
        </div>
      </div>
      <div className="mb-2">
        <StarRating rating={testimonial.rating} />
      </div>
      <div className="mb-2 flex-grow">
        <p className="text-gray-700 text-sm">
          "{testimonial.quote || testimonial.description}"
        </p>
      </div>
      {testimonial.Images?.length > 0 && (
        <div className="flex gap-1 flex-wrap">
          {testimonial.Images.slice(0, 3).map((image, index) => (
            <div
              key={index}
              className="relative w-14 h-14 rounded-md overflow-hidden cursor-pointer"
              onClick={() =>
                onImageClick(
                  testimonial.Images.map((img) => getImageUrl(img)),
                  index
                )
              }
            >
              <img
                src={getImageUrl(image)}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 flex items-center justify-center">
                <ZoomIn className="text-white w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function TestimonialPage() {
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
      } catch {
        setTestimonials([]);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const handleImageClick = (images, index) => {
    setImagePopup({ isOpen: true, images, currentIndex: index });
  };

  return (
    <div className="bg-gray-100 py-20 px-4 max-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 text-center">
          What <span className="text-[#f7710b]">Our Users</span> Say
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Hear from the people who matter most – our amazing users!
        </p>

        {loading ? (
          <div className="text-center py-5">Loading testimonials...</div>
        ) : testimonials.length > 0 ? (
          <div className="overflow-hidden relative">
            <div className="flex gap-4 animate-scroll">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  onImageClick={handleImageClick}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">No reviews found.</div>
        )}
      </div>

      <ImagePopup
        images={imagePopup.images}
        isOpen={imagePopup.isOpen}
        onClose={() =>
          setImagePopup({ isOpen: false, images: [], currentIndex: 0 })
        }
        currentIndex={imagePopup.currentIndex}
        setCurrentIndex={(index) =>
          setImagePopup((prev) => ({ ...prev, currentIndex: index }))
        }
      />

      <style jsx>{`
        .animate-scroll {
          display: flex;
          gap: 16px;
          animation: scroll-left 20s linear infinite;
        }
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
