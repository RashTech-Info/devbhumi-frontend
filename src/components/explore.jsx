import React from 'react';
import { MapPin } from 'lucide-react';

// Local image imports
import kedarnath from '../images/explore/Kedarnath.png';
import badrinath from '../images/explore/Badrinath.png';
import nainital from '../images/explore/Nainital.png';
import mussoorie from '../images/explore/Munsiyari.png';
import valleyOfFlowers from '../images/explore/Valley of Flowers.png';
import haridwar from '../images/explore/Haridwar.png';
import rishikesh from '../images/explore/Rishikesh.png';

function Explore() {
  return (
    <div className="min-h-screen bg-orange-50">
      <section className="py-15 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Top <span className="text-[#f7710b]">Destinations</span> in Uttarakhand
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the sacred temples, serene lakes, and breathtaking landscapes of Devbhoomi Uttarakhand.
              From the Char Dham to the Valley of Flowers, explore the gems of the Himalayas.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Kedarnath */}
            <div className="lg:col-span-2 lg:row-span-2 relative group cursor-pointer">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg">
                <img src={kedarnath} alt="Kedarnath Temple" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Kedarnath Temple</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Rudraprayag, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badrinath */}
            <div className="lg:col-span-2 relative group cursor-pointer">
              <div className="relative h-40 rounded-3xl overflow-hidden shadow-lg">
                <img src={badrinath} alt="Badrinath Temple" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Badrinath Temple</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Chamoli, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nainital */}
            <div className="relative group cursor-pointer">
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                <img src={nainital} alt="Nainital Lake" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Nainital Lake</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">Nainital, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mussoorie */}
            <div className="relative group cursor-pointer">
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                <img src={mussoorie} alt="Mussoorie Hills" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Mussoorie Hills</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">Dehradun, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Valley of Flowers */}
            <div className="lg:col-span-2 relative group cursor-pointer">
              <div className="relative h-60 -mt-11 rounded-3xl overflow-hidden shadow-lg">
                <img src={valleyOfFlowers} alt="Valley of Flowers" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">Valley of Flowers</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Chamoli, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Haridwar */}
            <div className="relative group cursor-pointer">
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                <img src={haridwar} alt="Haridwar Ganga Aarti" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Ganga Aarti</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">Haridwar, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rishikesh */}
            <div className="relative group cursor-pointer">
              <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                <img src={rishikesh} alt="Laxman Jhula" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Laxman Jhula</h3>
                  <div className="flex items-center space-x-2 text-white/90">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">Rishikesh, Uttarakhand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore More Button */}
          <div className="flex justify-center mt-6">
            <a
              href="/explore"
              className="bg-[#f7710b] hover:bg-[#e26208] cursor-pointer text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg inline-block"
            >
              Explore More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Explore;
