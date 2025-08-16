import React from 'react';

export default function CTA() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
            <span className='text-[#f7710b]'>DEV</span> BHUMI</h1>

          {/* Main text */}
          <p className="text-2xl md:text-3xl text-gray-800 mb-2">
            Discover the Spiritual Heart of India
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Explore the divine beauty, culture, and heritage of Uttarakhand with our all-in-one travel guide.
          </p>

          {/* Divider */}
          <div className="border-t border-gray-300 w-24 mx-auto my-8"></div>

          {/* Download button */}
          <div className="mt-8">
            <button
  onClick={() => (window.location.href = "/contact")}
  className="bg-[#f7710b] text-white  hover:bg-gray-700 px-6 sm:px-8 py-3 rounded-l-full sm:rounded-l-full rounded-r-full sm:rounded-r-none font-medium transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
>
  Contact Us
</button>

            <a href="tel:+919848362750">
  <button className="border-white bg-[#f7710b] text-white hover:bg-gray-700 px-8 ml-2 py-3 rounded-r-full font-medium transition-all duration-300 transform hover:scale-105">
    +91-9848362750
  </button>
</a>

          </div>
        </div>
      </div>
    </section>
  );
}
