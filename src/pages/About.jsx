import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, Mountain, TreePine, Waves, Sun } from 'lucide-react';
import bgpic from '../images/bgpic.png';
import { Helmet } from 'react-helmet';
import hikingImg from '../images/gallery/pexels-3.jpg'; // Ensure you have this image in your project
import firstpic from '../images/gallery/pexels-5.jpg'; // Ensure you have this image in your project

const DevBhumiPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Mountain,
      title: "Char Dham Yatra",
    description: "Visit the sacred shrines of Badrinath, Kedarnath, Gangotri, and Yamunotri."
    },
    {
      icon: TreePine,
      title: "Spiritual Retreats",
    description: "Explore yoga, meditation, and peace in Rishikesh and Haridwar."
    },
    {
      icon: Waves,
       title: "Mystic Valleys",
    description: "Trek through Valley of Flowers, Har Ki Dun, and more hidden gems."
    },
    {
      icon: Sun,
     title: "Legends & Lore",
    description: "Uncover stories of gods, sages, and ancient Himalayan civilizations."
    }
  ];

  return (
    <div className="bg-white">
      <Helmet>
  <title>About - Dev Bhumi Uttarakhand</title>
  <meta
    name="description"
    content="Learn about Dev Bhumi Uttarakhand – a sacred land nestled in the Himalayas. Discover its ancient traditions, spiritual destinations, and the deep cultural roots that define this divine region of India."
  />
  <meta
    name="keywords"
    content="About Uttarakhand, Dev Bhumi, Spiritual India, Himalayan Culture, Uttarakhand History, Temples in Uttarakhand, Char Dham, Garhwal, Kumaon"
  />
  <meta name="author" content="Dev Bhumi Uttarakhand" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Helmet>

      {/* Hero Section */}
 <section
  className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[790px] -mt-18 flex flex-col justify-center items-center p-4 md:p-8 text-center relative overflow-hidden"
  style={{
    backgroundImage: `url(${bgpic})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-10"></div>
  <div className="absolute bottom-0 w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[300px] z-20 bg-gradient-to-b from-transparent to-white"></div>

  {/* Text Content */}
  <div className="max-w-4xl mx-auto relative z-30 text-white px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 -mt-16 md:-mt-24 animate-fade-in-up font-montserrat tracking-wider">
      About
    </h1>
    <p className="text-3xl sm:text-5xl lg:text-[110px] font-bold font-montserrat animate-fade-in-up delay-100">
      Dev Bhumi
    </p>

    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 md:mt-6 font-semibold leading-relaxed animate-fade-in-up delay-200">
      Uttarakhand, known as the Land of the Gods, is a spiritual and natural sanctuary
      nestled in the heart of the Himalayas. Discover its sacred rivers, ancient temples,
      and breathtaking trails.
    </p>
  </div>
</section>


      {/* Content Section */}
     <section className="min-h-screen bg-white relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-0 left-0 w-full h-full" />
  </div>

  <div className="container mx-auto px-6 py-20">
    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
      
      {/* Left Content */}
      <div className="space-y-8">
        {/* Section Number */}
        <div className="flex items-center space-x-4">
          <span className="text-8xl font-bold text-gray-800">01</span>
          <div className="w-16 h-px bg-gray-900" />
          <span className="text-gray-900 font-medium tracking-wider uppercase text-sm">
            About
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">
          Welcome to
          <br />
          Dev Bhumi Uttarakhand
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-900 leading-relaxed max-w-lg">
          Nestled in the lap of the Himalayas, Uttarakhand – also known as Dev Bhumi (Land of the Gods) –
          is a paradise for nature lovers, spiritual seekers, and adventure enthusiasts. Home to ancient temples,
          sacred rivers, and snow-capped peaks, this state embodies a perfect blend of spirituality and scenic beauty.
          Whether you're on a pilgrimage to Kedarnath, a trek to Valley of Flowers, or exploring the forests of Jim Corbett,
          Uttarakhand has something to inspire every soul.
        </p>
      </div>

      {/* Right Image */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={firstpic}
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Floating Card */}
        {/* <div className="absolute -bottom-8 -left-8 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-xs">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-3 h-3 bg-gray-900 rounded-full" />
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Spiritual Significance</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Land of Gods</h3>
          <p className="text-sm text-gray-600">Char Dham, sacred rivers & timeless legends</p>
        </div> */}
      </div>
    </div>

    {/* Bottom Section */}
    <div className="grid lg:grid-cols-2 gap-16 items-center mt-32">
      
      {/* Left Image */}
      <div className="relative order-2 lg:order-1">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={hikingImg}
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Floating Stats */}
        {/* <div className="absolute -top-8 -right-8 bg-[#f7710b] rounded-xl p-6 shadow-xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">13,000+ ft</div>
            <div className="text-gray-800 text-sm">Trekking Elevation</div>
          </div>
        </div> */}
      </div>

      {/* Right Content */}
      <div className="space-y-8 order-1 lg:order-2">
        {/* Section Number */}
        <div className="flex items-center space-x-4">
          <span className="text-8xl font-bold text-gray-800">02</span>
          <div className="w-16 h-px bg-gray-800" />
          <span className="text-gray-800 font-medium tracking-wider uppercase text-sm">
            Explore Nature
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-6xl font-serif text-gray-700 leading-tight">
          Trekking the Trails
          <br />
          of Uttarakhand
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-800 leading-relaxed max-w-lg">
          From lush meadows to glacial valleys, Uttarakhand offers some of the most spectacular and diverse trekking
          routes in India. Embark on scenic hikes to Har Ki Dun, Kedarkantha, or the Roopkund Lake and experience
          the untouched beauty of the Himalayas, rich biodiversity, and local culture.
        </p>

        {/* Feature List */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <span className="text-gray-800">Valley of Flowers</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <span className="text-gray-800">Kedarkantha Trek</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
            <span className="text-gray-800">Har Ki Dun Valley</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* About Content Section */}
     <section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center space-x-2 mb-4">
          <div className="w-8 h-px bg-gray-800" />
          <span className="text-gray-800 font-medium tracking-wider uppercase text-sm">
            Dev Bhumi Uttarakhand
          </span>
          <div className="w-8 h-px bg-gray-800" />
        </div>
        <h2 className="text-5xl font-serif text-gray-800 mb-6">
          Where the Divine Dwells
        </h2>
        <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          In the heart of the Himalayas lies Uttarakhand – a sacred land where gods walked,
          rivers were born, and legends continue to live. From the Char Dham Yatra to hidden
          spiritual retreats, it’s a journey of devotion, discovery, and divine grace.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {features.map((feature, index) => (
          <div key={index} className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-[#f7710b] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-800 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
     
    </div>
  </div>
</section>

    </div>
  );
};

export default DevBhumiPage;