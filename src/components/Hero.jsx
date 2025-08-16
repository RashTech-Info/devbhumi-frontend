import React, { useEffect } from 'react';
import side from '../images/1side.png';
import sideimg from '../images/2side.png';
import shiv from '../images/shiva.webp';
// import self from '../images/bgtwo.png';
import mainImage from '../images/exploreback.png'
import { MapPin, Mountain, Camera } from 'lucide-react';

export default function ParallaxSection() {
  useEffect(() => {
    const layer1 = document.getElementById('layer1');
    const layer2 = document.getElementById('layer2');
    const text = document.getElementById('text');

    const handleScroll = () => {
      const scroll = window.pageYOffset;

      if (layer1) layer1.style.width = `${100 + scroll / 5}%`;

      if (layer2) {
        layer2.style.width = `${100 + scroll / 5}%`;
        layer2.style.left = `${scroll / 50}%`;
      }

      if (text) {
        text.style.transform = `translate(-50%, calc(-50% - ${scroll * 0.3}px))`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="m-0 p-0 overflow-hidden -mt-18">
      
      {/* Parallax Background Section */}
      <section
  className="relative w-full h-[1000px]  bg-cover bg-center overflow-hidden z-10"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')",
  }}
>
  {/* Gradient overlay at bottom */}
  <div className="absolute bottom-0 w-full h-[300px] z-20 bg-gradient-to-b from-transparent to-white"></div>

  {/* Parallax Layers - hide only on mobile */}
  <img
    id="layer1"
    src={side}
    className="hidden md:block absolute left-1/2 -top-10 transform -translate-x-1/2 w-full max-w-none z-90"
    alt="Mountain 1"
  />
  <img
    id="layer2"
    src={sideimg}
    className="hidden md:block absolute right-0 -top-10 w-full max-w-none z-90"
    alt="Mountain 2"
  />

  {/* ✅ Text & Shiv Image - visible on all devices */}
  <div
    className="absolute -mt-10 top-1/2 left-1/2 z-30 text-white text-center items-center drop-shadow-lg
      transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 will-change-transform"
  >
    <h1 className="text-4xl md:text-8xl font-extrabold tracking-wide">
      <span className="text-[30px] md:text-[50px] block mt-24 mb-2">Welcome To</span>

      <img src={shiv} className="h-[190px] md:h-[250px] mx-auto mb-8" alt="shiv" />

      <span className="text-[50px] md:text-[100px] block leading-tight mb-4">DEV BHUMI</span>

      {/* 👇 Tour and Travel just below DEV BHUMI */}
      <p className="text-lg md:text-2xl font-medium italic text-white mb-1">
        Tour n Travel
      </p>

      {/* 👇 Subtitle below */}
      <p className="text-base md:text-xl font-medium italic text-white">
        A Divine Journey Begins Here
      </p>
    </h1>
  </div>
</section>





 <section className="relative min-h-screen py-16 flex items-center">
  <div className="container mx-auto px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side - Text */}
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-emerald-600">
            <Mountain className="w-6 h-6" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              Discover Uttrakhand
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Explore the</span>
            <br />
            <span className="text-[#276749]">
              <span className="text-[#f7710b]">DEV</span> BHUMI
            </span>
            <br />
            <span className="text-gray-900">of India</span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
            Experience the mystical mountains, sacred temples, and pristine valleys of
            Uttrakhand. From the holy Ganges in Haridwar to the peaks of Nanda Devi.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => (window.location.href = "/about")}
            className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 flex items-center justify-center space-x-3 shadow-lg cursor-pointer"
          >
            <Camera className="w-5 h-5" />
            <span>About more</span>
          </button>
          <button
            onClick={() => (window.location.href = "/explore")}
            className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-900 hover:text-white flex items-center justify-center space-x-3 cursor-pointer"
          >
            <MapPin className="w-5 h-5" />
            <span>Explore</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-8 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-sm text-gray-600">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">100K+</div>
            <div className="text-sm text-gray-600">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">4.9</div>
            <div className="text-sm text-gray-600">Rating</div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex justify-center items-center h-full">
        <img
          src={mainImage}
          alt="Uttarakhand"
          className=" w-full h-full "
        />
      </div>
    </div>
  </div>
</section>

  













    </div>
  );
}
