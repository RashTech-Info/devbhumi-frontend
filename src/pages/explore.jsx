import React, { useState, useEffect } from 'react';
import { Mountain, Star } from 'lucide-react';
import exploretop from "../images/exploretop.png";
import { Helmet } from 'react-helmet';
import Yamunotri from "../images/explore/Yamunotri.png";
import Gangotri from "../images/explore/Gangotri.png";
import Kedarnath from "../images/explore/Kedarnath.png";
import Badrinath from "../images/explore/Badrinath.png";
import Nainitalimg from "../images/explore/Nainital.png";
import Kausaniimg from "../images/explore/Kausani.png";
import jimcorbettimg from "../images/explore/Jim Corbett.png";
import Binsarimg from "../images/explore/Binsar.png";
import CharDhamimg from "../images/explore/Char Dham.png";
import Munsiyariimg from "../images/explore/Munsiyari.png";
import KainchiDhamimg from "../images/explore/Kainchi Dham.png";
import bhimtalimg from "../images/explore/Bhimtal.png";
import valleyimg from "../images/explore/Valley of Flowers.png";
import auliimg from "../images/explore/Auli.png";
import Rishikeshimg from "../images/explore/Rishikesh.png";
import Mussoorieimg from "../images/explore/Munsiyari.png";
import haridwarimg from "../images/explore/Haridwar.png";
import dehradunimg from "../images/explore/Dehradun.png";
import almoraimg from "../images/explore/Almora.png";
import ranikhetimg from "../images/explore/Ranikhet.png";
import pithoragarhimg from "../images/explore/Pithoragarh.png";
import choptaimg from "../images/explore/Chopta.png";



const MountainExpedition = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const applyFilter = (filter) => {
    setActiveFilter(filter);
    // Scroll to the relevant section
    if (filter === 'chardham') {
      document.getElementById('chardham-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (filter === 'kumaon') {
      document.getElementById('kumaon-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (filter === 'garhwal') {
      document.getElementById('garhwal-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (filter === 'top') {
      document.getElementById('top-destinations-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const regions = [
    {
      id: 'kumaon',
      name: "Kumaon Region",
      description: "The Kumaon region of Uttarakhand is known for its picturesque hill stations, serene lakes, and breathtaking views of the Himalayas. Explore the cultural richness and natural beauty of this enchanting region.",
      destinations: [
        {
          id: 1,
          name: "Nainital",
          description: "Nestled around the serene Naini Lake, Nainital is a picturesque hill station known for its colonial charm and misty landscapes.",
          image: Nainitalimg,
          highlights: ["Naini Lake Boating", "Snow View Point", "Mall Road Shopping"]
        },
        {
          id: 2,
          name: "Kausani",
          description: "Famed for its 300 km-wide panoramic Himalayan views, Kausani offers tranquility and stunning sunrises over snow-capped peaks.",
          image: Kausaniimg,
          highlights: ["Anasakti Ashram", "Tea Estate Walks", "Rudradhari Falls"]
        },
        {
          id: 3,
          name: "Jim Corbett",
          description: "Home to India's majestic Bengal Tigers, Jim Corbett National Park is a wildlife lover's paradise with dense forests and thrilling safaris.",
          image: jimcorbettimg,
          highlights: ["Jeep Safari", "Garjiya Devi Temple", "Corbett Museum"]
        },
        {
          id: 4,
          name: "Binsar",
          description: "A hidden gem in the Kumaon hills, Binsar offers a serene escape with rich biodiversity and awe-inspiring Himalayan vistas.",
          image: Binsarimg,
          highlights: ["Binsar Wildlife Sanctuary", "Zero Point View", "Bineshwar Temple"]
        }
      ]
    },
    {
      id: 'garhwal',
      name: "Garhwal Region",
      description: "The Garhwal region is the spiritual heart of Uttarakhand, home to the sacred Char Dham and numerous other pilgrimage sites. Experience the divine energy and stunning landscapes of this Himalayan region.",
      destinations: [
        {
          id: 5,
          name: "Char Dham",
          description: "The sacred pilgrimage circuit of Yamunotri, Gangotri, Kedarnath, and Badrinath.",
          image: CharDhamimg,
          highlights: ["Yamunotri", "Gangotri", "Kedarnath", "Badrinath"]
        },
        {
          id: 6,
          name: "Munsiyari",
          description: "The 'Little Kashmir' known for its panoramic views of the Panchachuli peaks.",
          image: Munsiyariimg,
          highlights: ["Panchachuli Peaks", "Birthi Falls", "Thamri Kund"]
        },
        {
          id: 7,
          name: "Kainchi Dham",
          description: "Sacred ashram made famous by Neem Karoli Baba and visited by Steve Jobs.",
          image:  KainchiDhamimg,
          highlights: ["Neem Karoli Baba Ashram", "Hanuman Temple", "Spiritual Retreat"]
        },
        {
          id: 8,
          name: "Bhimtal",
          description: "Serene lake town with an island aquarium and peaceful surroundings.",
          image: bhimtalimg,
          highlights: ["Bhimtal Lake", "Aquarium Island", "Butterfly Museum"]
        }
      ]
    }
  ];

  const charDhamItineraries = [
    {
      id: 1,
      title: "Yamunotri – Origin of the Yamuna",
      image: Yamunotri,
      description: "Located in the Garhwal Himalayas, Yamunotri is the source of the Yamuna River and the first stop of the Char Dham Yatra. It is surrounded by snow-capped peaks and thermal springs.",
      highlights: ["Divine Shrine", "Surya Kund", "Janki Chatti"]
    },
    {
      id: 2,
      title: "Gangotri – Birthplace of the Ganga",
      image: Gangotri,
      description: "Gangotri marks the origin of the holy River Ganga. Nestled amidst rugged terrains, pine forests, and towering peaks, the temple here is a divine destination for thousands of pilgrims.",
      highlights: ["Gangotri Temple", "Bhagirathi River", "Submerged Shivling"]
    },
    {
      id: 3,
      title: "Kedarnath – Abode of Lord Shiva",
      image: Kedarnath,
      description: "Kedarnath is one of the 12 Jyotirlingas and lies against the backdrop of the majestic Kedarnath range. A trek to this revered site offers spiritual awakening and stunning vistas.",
      highlights: ["Kedarnath Temple", "Gandhi Sarovar", "Vasuki Tal"]
    },
    {
      id: 4,
      title: "Badrinath – Shrine of Lord Vishnu",
      image: Badrinath,
      description: "Situated between Nar and Narayan peaks, Badrinath is the final destination of the Char Dham Yatra and home to the sacred Badrinarayan Temple dedicated to Lord Vishnu.",
      highlights: ["Badrinath Temple", "Tapt Kund", "Mana Village"]
    }
  ];

  const topDestinations = [
    {
      id: 1,
      name: "Valley of Flowers",
      description: "A UNESCO World Heritage Site known for its endemic alpine flowers and stunning natural beauty. The valley comes alive with vibrant colors during monsoon season.",
      image: valleyimg,
      highlights: ["Alpine Meadows", "Rare Flowers", "Himalayan Views", "UNESCO Site"]
    },
    {
      id: 2,
      name: "Auli",
      description: "Popular skiing destination with panoramic views of Nanda Devi and other Himalayan peaks. Offers cable car rides with breathtaking vistas.",
      image: auliimg,
      highlights: ["Skiing", "Cable Car Ride", "Nanda Devi Views", "Winter Sports"]
    },
    {
      id: 3,
      name: "Rishikesh",
      description: "World capital of yoga and gateway to the Garhwal Himalayas with spiritual and adventure activities. Famous for its Ganga Aarti and river rafting.",
      image: Rishikeshimg,
      highlights: ["Yoga", "River Rafting", "Laxman Jhula", "Ganga Aarti"]
    },
    {
      id: 4,
      name: "Mussoorie",
      description: "Queen of Hills offering colonial charm and spectacular Himalayan views. Known for its mall road and waterfalls.",
      image: Mussoorieimg,
      highlights: ["Camel's Back Road", "Kempty Falls", "Mall Road", "Landour"]
    },
    {
      id: 5,
      name: "Haridwar",
      description: "Sacred city where the Ganges enters the plains, known for its ghats and evening Ganga Aarti. Gateway to Char Dham pilgrimage.",
      image: haridwarimg,
      highlights: ["Har Ki Pauri", "Ganga Aarti", "Temples", "Pilgrimage"]
    },
    {
      id: 6,
      name: "Dehradun",
      description: "Capital city of Uttarakhand with a pleasant climate and gateway to Mussoorie and Himalayan treks. Home to prestigious institutions.",
      image: dehradunimg,
      highlights: ["Robber's Cave", "Sahastradhara", "Forest Research Institute", "Tapkeshwar Temple"]
    },
    {
      id: 7,
      name: "Almora",
      description: "Cultural heart of Kumaon with panoramic Himalayan views, known for its handicrafts and temples. Offers a peaceful retreat.",
      image: almoraimg,
      highlights: ["Bright End Corner", "Kasar Devi", "Nanda Devi Temple", "Handicrafts"]
    },
    {
      id: 8,
      name: "Ranikhet",
      description: "Quaint hill station with pine forests and orchards, home to a famous golf course and army cantonment.",
      image: ranikhetimg,
      highlights: ["Golf Course", "Chaubatia Gardens", "Majhkhali", "Himalayan Views"]
    },
    {
      id: 9,
      name: "Pithoragarh",
      description: "Known as 'Little Kashmir' for its scenic beauty, gateway to the Kailash Mansarovar pilgrimage route.",
      image: pithoragarhimg,
      highlights: ["Soar Valley", "Pithoragarh Fort", "Chandak Hill", "Panchchuli Peaks"]
    },
    {
      id: 10,
      name: "Chopta",
      description: "Mini Switzerland of India, base camp for Tungnath and Chandrashila treks with stunning meadows.",
      image: choptaimg,
      highlights: ["Tungnath Temple", "Chandrashila Peak", "Meadows", "Bird Watching"]
    }
  ];

  return (
    <div className="font-sans bg-white text-stone-800 antialiased">
      <Helmet>
        <title>Explore - Dev Bhumi Uttarakhand</title>
        <meta name="description" content="Explore the divine trails, sacred rivers, hidden villages, and majestic Himalayan landscapes of Dev Bhumi Uttarakhand. Begin your journey through spirituality, nature, and timeless culture." />
      </Helmet>

      {/* Hero Section */}
      <section
  className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[790px] -mt-18 flex flex-col justify-center items-center p-4 md:p-8 text-center relative overflow-hidden"
  style={{
    backgroundImage: `url(${exploretop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlays */}
  <div className="absolute inset-0 bg-black/30 z-10"></div>
  <div className="absolute bottom-0 w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[300px] z-20 bg-gradient-to-b from-transparent to-white"></div>

  {/* Text Content */}
  <div className="max-w-4xl mx-auto relative z-30 text-white px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-bold mb-2 -mt-16 md:-mt-24">
      Explore
    </h1>
    <p className="text-3xl sm:text-5xl lg:text-[110px] font-bold font-montserrat">
      Dev Bhumi
    </p>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 md:mt-6 font-semibold leading-relaxed">
      Embark on a journey through Uttarakhand's sacred mountains, hidden villages, and ancient pilgrimage paths.
    </p>
  </div>
</section>


      {/* Filter Section */}
      <div className=" top-0 z-30 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => applyFilter('all')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeFilter === 'all' ? 'bg-[#f7710b] text-white' : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'}`}>
              Show All
            </button>
            <button onClick={() => applyFilter('chardham')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeFilter === 'chardham' ? 'bg-[#f7710b] text-white' : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'}`}>
              Char Dham
            </button>
            <button onClick={() => applyFilter('kumaon')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeFilter === 'kumaon' ? 'bg-[#f7710b] text-white' : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'}`}>
              Kumaon Region
            </button>
            <button onClick={() => applyFilter('garhwal')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeFilter === 'garhwal' ? 'bg-[#f7710b] text-white' : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'}`}>
              Garhwal Region
            </button>
            <button onClick={() => applyFilter('top')} className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeFilter === 'top' ? 'bg-[#f7710b] text-white' : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-50'}`}>
              Top Destinations
            </button>
          </div>
        </div>
      </div>

      {/* Char Dham Section */}
      {(activeFilter === 'all' || activeFilter === 'chardham') && (
        <section id="chardham-section" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-px bg-[#f7710b]"></div>
                <span className="text-[#f7710b] font-medium tracking-wider uppercase text-sm">Spiritual Expeditions</span>
                <div className="w-8 h-px bg-[#f7710b]"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Char Dham Yatra</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Embark on the sacred pilgrimage to the four holy shrines of Uttarakhand – Yamunotri, Gangotri, Kedarnath, and Badrinath – a journey of devotion, peace, and breathtaking Himalayan beauty.
              </p>
            </div>

            <div className="space-y-20">
              {charDhamItineraries.map((trek, index) => (
                <div key={trek.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className="w-full md:w-1/2 relative group">
                    <div className="relative h-96 overflow-hidden rounded-xl">
                      <img src={trek.image} alt={trek.title} className="w-full h-full  transition-transform duration-700 group-hover:scale-100" />
                      <div className="absolute  flex items-end p-6">
                        <h3 className="text-xl font-bold text-white">{trek.title}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{trek.title}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">{trek.description}</p>
                    <ul className="space-y-2 mb-6">
                      {trek.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-4 w-4 text-amber-500 mr-2 mt-1" />
                          <span className="text-sm text-stone-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    {/* <button className="bg-[#f7710b] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e5670a] transition-colors duration-200">
                      Explore More
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Kumaon Region Section */}
      {(activeFilter === 'all' || activeFilter === 'kumaon') && (
        <section id="kumaon-section" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-px bg-[#f7710b]"></div>
                <span className="text-[#f7710b] font-medium tracking-wider uppercase text-sm">Cultural Exploration</span>
                <div className="w-8 h-px bg-[#f7710b]"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Kumaon Region</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                The Kumaon region of Uttarakhand is known for its picturesque hill stations, serene lakes, and breathtaking views of the Himalayas. Explore the cultural richness and natural beauty of this enchanting region.
              </p>
            </div>

            <div className="space-y-20">
              {regions.find(r => r.id === 'kumaon')?.destinations.map((destination, index) => (
                <div key={destination.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className="w-full md:w-1/2 relative group">
                    <div className="relative h-96 overflow-hidden">
                      <img src={destination.image} alt={destination.name} className="w-full h-full  transition-transform duration-700 group-hover:scale-100" />
                      <div className="absolute  flex items-end p-6">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{destination.name}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">{destination.description}</p>
                    <ul className="space-y-2 mb-6">
                      {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-4 w-4 text-amber-500 mr-2 mt-1" />
                          <span className="text-sm text-stone-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    {/* <button className="bg-[#f7710b] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e5670a] transition-colors duration-200">
                      Explore More
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Garhwal Region Section */}
      {(activeFilter === 'all' || activeFilter === 'garhwal') && (
        <section id="garhwal-section" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-px bg-[#f7710b]"></div>
                <span className="text-[#f7710b] font-medium tracking-wider uppercase text-sm">Spiritual Journeys</span>
                <div className="w-8 h-px bg-[#f7710b]"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Garhwal Region</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                The Garhwal region is the spiritual heart of Uttarakhand, home to the sacred Char Dham and numerous other pilgrimage sites. Experience the divine energy and stunning landscapes of this Himalayan region.
              </p>
            </div>

            <div className="space-y-20">
              {regions.find(r => r.id === 'garhwal')?.destinations.map((destination, index) => (
                <div key={destination.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className="w-full md:w-1/2 relative group">
                    <div className="relative h-96 overflow-hidden">
                      <img src={destination.image} alt={destination.name} className="w-full h-full  transition-transform duration-700 group-hover:scale-100" />
                      <div className="absolute flex items-end p-6">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{destination.name}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">{destination.description}</p>
                    <ul className="space-y-2 mb-6">
                      {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-4 w-4 text-amber-500 mr-2 mt-1" />
                          <span className="text-sm text-stone-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    {/* <button className="bg-[#f7710b] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e5670a] transition-colors duration-200">
                      Explore More
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Destinations Section */}
      {(activeFilter === 'all' || activeFilter === 'top') && (
        <section id="top-destinations-section" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-8 h-px bg-[#f7710b]"></div>
                <span className="text-[#f7710b] font-medium tracking-wider uppercase text-sm">Must-Visit Places</span>
                <div className="w-8 h-px bg-[#f7710b]"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Top Destinations in Uttarakhand</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">
                Discover the most stunning mountain escapes in the heart of Uttarakhand – from serene lakes to snow-clad peaks and spiritual centers.
              </p>
            </div>

            <div className="space-y-20">
              {topDestinations.map((destination, index) => (
                <div key={destination.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                  <div className="w-full md:w-1/2 relative group">
                    <div className="relative h-96 overflow-hidden">
                      <img src={destination.image} alt={destination.name} className="w-full h-full transition-transform duration-700 group-hover:scale-100" />
                      <div className="absolute flex items-end p-6">
                        <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">{destination.name}</h3>
                    <p className="text-stone-600 mb-6 leading-relaxed">{destination.description}</p>
                    <ul className="space-y-2 mb-6">
                      {destination.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start">
                          <Star className="h-4 w-4 text-amber-500 mr-2 mt-1" />
                          <span className="text-sm text-stone-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    {/* <button className="bg-[#f7710b] text-white px-6 py-2 rounded-full font-medium hover:bg-[#e5670a] transition-colors duration-200">
                      Explore More
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats and CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-16">
            <div className="p-4">
              <div className="text-3xl font-bold text-[#f7710b] mb-2">150+</div>
              <div className="text-stone-600 text-sm uppercase tracking-wider">Successful Treks</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#f7710b] mb-2">98%</div>
              <div className="text-stone-600 text-sm uppercase tracking-wider">Safety Record</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#f7710b] mb-2">24</div>
              <div className="text-stone-600 text-sm uppercase tracking-wider">Expert Guides</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#f7710b] mb-2">10+</div>
              <div className="text-stone-600 text-sm uppercase tracking-wider">Years Experience</div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready for Your Himalayan Adventure?</h2>
            <p className="text-xl text-stone-700 mb-8 max-w-2xl mx-auto">
              Join our community of explorers and experience Uttarakhand's mountains like never before.
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
        </div>
      </section>
    </div>
  );
};

export default MountainExpedition;