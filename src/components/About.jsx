import React from "react";
// import explore from "./explorer";

const explore = [
  {
    title: "This Miami Beach",
    location: "South Beach",
    image:
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&q=80",
  },
  {
    title: "Eden Villas",
    location: "Perched on Caldera",
    image:
      "https://images.unsplash.com/photo-1614624532983-4f98c3810db2?auto=format&q=80",
    tall: true,
  },
  {
    title: "Apartments Opens",
    location: "Venice, Italy",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&q=80",
  },
  {
    title: "Locanda Vivaldi",
    location: "Venice, Italy",
    image:
      "https://images.unsplash.com/photo-1602080858173-fc2a7d5f4ec9?auto=format&q=80",
  },
  {
    title: "Homes Aqua",
    location: "Aegean Sea",
    image:
      "https://images.unsplash.com/photo-1582478590788-c1d646e84df9?auto=format&q=80",
  },
  {
    title: "Alba Cave Villa",
    location: "Featuring a seasonal outdoor",
    image:
      "https://images.unsplash.com/photo-1530133532239-14b0f4e3f8d7?auto=format&q=80",
  },
];

const DestinationGrid = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          CITY NOT TO BE MISSED
        </h2>
        <p className="text-gray-500 mt-2">
          Discover incredible accommodation options in the heart of the city
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {destinations.map((place, index) => (
          <div
            key={index}
            className={`relative rounded-xl overflow-hidden group ${
              place.tall ? "md:row-span-2 md:h-[500px]" : "h-[250px]"
            }`}
          >
            <img
              src={place.image}
              alt={place.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-lg font-semibold">{place.title}</h3>
              <p className="text-sm">{place.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default explore;
