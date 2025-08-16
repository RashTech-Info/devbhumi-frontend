import React  from 'react';
import { ChevronLeft, ChevronRight, X,ChevronDown, MapPin, Heart, Download } from 'lucide-react';
import gallerytop from "../images/gallerytop.png";
import axios from 'axios';
import { Helmet } from 'react-helmet';
const UttarakhandGallery = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [currentRegion, setCurrentRegion] = React.useState('all');

  const [galleryImages, setGalleryImages] = React.useState([]);

 React.useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE}/getGallery`);
      console.log(response.data);
      setGalleryImages(response.data);
    }
    fetch()
  },[])
  const filteredImages = currentRegion === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.region === currentRegion);

  const openImage = (img) => {
    setSelectedImage(img);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <Helmet>
  <title>Gallery - Dev Bhumi Uttarakhand</title>
  <meta
    name="description"
    content="Browse breathtaking visuals of Uttarakhand’s sacred shrines, snow-capped peaks, cultural festivals, and untouched nature. Discover the divine beauty of Dev Bhumi through our curated photo gallery."
  />
  <meta
    name="keywords"
    content="Uttarakhand Gallery, Dev Bhumi Photos, Himalayas, Kedarnath Images, Badrinath Temple, Uttarakhand Nature Photography, Garhwal Culture, Kumaon Landscapes"
  />
  <meta name="author" content="Dev Bhumi Uttarakhand" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Helmet>

      {/* Hero Section */}
<section
  className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[790px] -mt-18 flex flex-col justify-center items-center p-4 md:p-8 text-center relative overflow-hidden"
  style={{
    backgroundImage: `url(${gallerytop})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-10"></div>

  {/* Bottom Gradient */}
  <div className="absolute bottom-0 w-full h-[100px] sm:h-[150px] md:h-[200px] lg:h-[300px] z-20 bg-gradient-to-b from-transparent to-white"></div>

  {/* Text Content */}
  <div className="max-w-4xl mx-auto relative z-30 text-white px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-montserrat font-bold mb-2 -mt-16 md:-mt-24 animate-fade-in-up">
      Gallery
    </h1>
    <p className="text-3xl sm:text-5xl lg:text-[110px] font-bold font-montserrat animate-fade-in-up delay-100">
       Moments
    </p>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-4 md:mt-6 font-semibold leading-relaxed animate-fade-in-up delay-200">
      Explore Uttarakhand through powerful visuals — where ancient rituals, snowy peaks,
      forest trails, and sacred rivers paint a timeless story of nature and faith.
    </p>
  </div>
</section>





      {/* Gallery Controls */}
      <div className="bg-white py-6 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto"> */}
          <p className='font-semibold  text-[#f7710b] ml-3'>Top pictures :-</p>
           
            </div>
       
          </div>
        </div>
      {/* </div> */}

      {/* Gallery Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id} 
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-zoom-in"
              onClick={() => openImage(image)}
            >
              
              <img
                      src={`${import.meta.env.VITE_API_BASE}/gallery/${image.image[0]}`}
                      alt={image.title}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-medium">{image.title}</h3>
                  {/* <div className="flex items-center text-white/80 text-sm mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {image.location}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative max-w-6xl w-full">
            <button 
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-amber-600 transition z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-3/4">
                <img 
                  src={`${import.meta.env.VITE_API_BASE}/gallery/${selectedImage.image[0]}`} 
                  alt={selectedImage.title} 
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
              
              <div className="lg:w-1/4 text-white">
                <h2 className="text-2xl font-serif font-bold mb-2">{selectedImage.title}</h2>
                {/* <div className="flex items-center text-amber-400 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {selectedImage.location}
                </div>
                <p className="text-white/80 mb-6">
                  {selectedImage.region === 'kumaon' ? 'Kumaon Region' : 'Garhwal Region'} - Uttarakhand
                </p>
                
                <div className="flex space-x-4">
                  <button className="flex items-center text-white hover:text-amber-400 transition">
                    <Heart className="h-5 w-5 mr-1" />
                    Save
                  </button> */}
                  {/* <button className="flex items-center text-white hover:text-amber-400 transition">
                    <Download className="h-5 w-5 mr-1" />
                    Download
                  </button> */}
                {/* </div> */}
              </div>
            </div>
            
            <button 
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-amber-600 transition z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default UttarakhandGallery;