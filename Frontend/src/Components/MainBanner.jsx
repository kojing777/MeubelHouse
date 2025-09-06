import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative overflow-hidden h-[380px] md:h-[500px] w-full mx-auto rounded-xl shadow-2xl animate-[fadeIn_1s]">
      {/* Background Images with rounded corners and overlay */}
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="hidden md:block w-full h-full object-cover rounded-xl animate-[zoomIn_8s_linear_infinite]"
        />
        <img
          src={assets.main_banner_bg_sm}
          alt="banner"
          className="md:hidden w-full h-full object-cover rounded-xl animate-[zoomIn_8s_linear_infinite]"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 to-transparent rounded-xl"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-12 md:pb-0 px-4 md:pl-16 lg:pl-24 animate-[slideUp_0.8s]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-xs md:max-w-md lg:max-w-2xl leading-tight text-white drop-shadow-lg">
          Freshness You Can Trust, <span className="text-primary">Savings</span> You Will Love!
        </h1>
      
        {/* Buttons with same size and enhanced effects */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 font-medium">
          <Link 
            to={"products"} 
            className="relative overflow-hidden flex items-center justify-center gap-2 w-40 h-12 bg-primary hover:bg-primary-dull text-black rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(74,222,128,0.3)] hover:-translate-y-1"
          >
            <span className="relative z-10">Shop Now</span>
            <img
              className="w-5 transition-transform duration-300 group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
            <span className="absolute inset-0 bg-primary/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
          </Link>
          
          <Link 
            to={"products"} 
            className="relative overflow-hidden flex items-center justify-center gap-2 w-40 h-12 border-2 border-white text-white hover:text-primary hover:bg-white rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)] hover:-translate-y-1"
          >
            <span>Explore More</span>
            <img
              className="w-5 transition-transform duration-300 group-hover:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
          </Link>
        </div>
      </div>


      {/* Add these styles to your main CSS file */}
      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default MainBanner;