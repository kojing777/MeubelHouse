import React from "react";
import { Link } from 'react-router-dom';
import DiningTable from "../assets/DiningTable.png";
import BedsMattresses from "../assets/BedsMattress.png";
import SofasCouches from "../assets/sofaCouches.png";
import cabinet from "../assets/cabinets.png";
import OfficeFurniture from "../assets/OfficeFurnitures.png";
import { useAppContext } from "../Context/AppContext";

export const categories = [
  {
    text: "Sofas & Couches",
    path: "sofas-couches",
    image: SofasCouches,
    bgColor: "#FEF6DA",
  },
  {
    text: "Dining Tables",
    path: "dining-furniture",
    image: DiningTable,
    bgColor: "#FEE0E0",
  },
  {
    text: "Beds & Mattresses",
    path: "beds-mattresses",
    image: BedsMattresses,
    bgColor: "#F0F5DE",
  },
  {
    text: "Storage & Cabinets",
    path: "storage-cabinets",
    image: cabinet,
    bgColor: "#E1F5EC",
  },
  {
    text: "Office Furniture",
    path: "office-furniture",
    image: OfficeFurniture,
    bgColor: "#FEE6CD",
  },
];

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 mx-auto bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-12 animate-fadeIn">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Shop by <span className="text-purple-600 relative">
            Category
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></span>
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Discover our curated furniture collections for your dream home
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 max-w-[1920px] mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-xl bg-white"
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            {/* Image Container with Aspect Ratio */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-white">
              {/* Main Image */}
              <img
                src={category.image}
                alt={category.text}
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-200/60 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-all duration-500"></div>

              {/* Category Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-2 transform transition-transform duration-500 group-hover:translate-y-0 tracking-wide">
                  {category.text}
                </h3>
                <div className="flex items-center gap-2 text-black/90 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-sm md:text-base font-medium">Explore Collection</span>
                  <span className="inline-block transform group-hover:translate-x-2 transition-transform duration-300 text-purple-200">
                    →
                  </span>
                </div>
              </div>

              {/* Enhanced Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
              
              {/* Category Background Color Overlay */}
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: category.bgColor }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;