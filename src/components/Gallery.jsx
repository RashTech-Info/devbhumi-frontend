import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Replace with your actual API base URL
// const API_BASE = "http://localhost:8000";
const API_BASE = import.meta.env.VITE_API_BASE; 

export default function Gallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_BASE}/getGallery`);
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        setGalleries(res.data.slice(0, 8));
      } catch (err) {
        setError("Failed to load gallery.");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <section className="py-12 bg-white min-h-[60vh]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-montserrat font-bold mb-4 text-gray-900">
            Our <span className="text-[#f7710b]">Gallery</span>
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
            Explore a curated collection of our favorite moments and creative highlights.
          </p>
        </div>

        {/* Loading / Error */}
        {loading && <div className="text-center text-gray-500 py-10">Loading...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}

        {/* Gallery Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleries.length === 0 && (
                <div className="col-span-full text-center text-gray-400">
                  No gallery items found.
                </div>
              )}
              {galleries.map((item, idx) => (
                <div
                  key={`${item._id}-${idx}`}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
                >
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={`${API_BASE}/gallery/${item.image[0]}`}
                      alt={item.title || `Gallery ${idx + 1}`}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <p className="text-gray-700 font-medium text-center">
                      {item.title || `Memory ${idx + 1}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* View Gallery Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/gallery")}
                className="px-6 py-3 bg-[#f7710b] text-white font-semibold rounded-lg hover:bg-[#e6600a] transition"
              >
                View Gallery
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
