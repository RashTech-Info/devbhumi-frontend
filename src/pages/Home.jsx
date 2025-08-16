// pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Explore from '../components/explore';
import Testimonial from '../components/Testimonial';
import Contact from '../components/Contact';
import Gallery from '../components/Gallery';
import Cta from '../components/Cta';
import { Helmet } from 'react-helmet';

const Home = () => (

  <div>
    <Helmet>
  <title>Home - Dev Bhumi Uttarakhand</title>
  <meta
    name="description"
    content="Welcome to Dev Bhumi Uttarakhand – the land of gods, sacred rivers, ancient temples, and breathtaking Himalayan beauty. Explore the divine culture, spiritual journeys, and natural wonders of this majestic region."
  />
  <meta
    name="keywords"
    content="Dev Bhumi Uttarakhand, Uttarakhand Tourism, Char Dham Yatra, Himalayan Treks, Spiritual India, Kedarnath, Badrinath, Rishikesh, Haridwar, Garhwal, Kumaon, Hill Stations"
  />
  <meta name="author" content="Dev Bhumi Uttarakhand" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Helmet>

    <Hero />
    <Explore />
    <Gallery />
    <Testimonial />
    <Contact />
    <Cta />
  </div>
);

export default Home;
