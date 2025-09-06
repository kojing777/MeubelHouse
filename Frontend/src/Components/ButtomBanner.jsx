import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div>
      <div className="text-center mb-6 animate-slide-up">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-slide-down">
          Our <span className="text-primary">Features</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
          Groceries Straight to Your Door
        </p>
      </div>
      
      <div className="relative mt-8">
        <img
          src={assets.bottom_banner_image}
          alt="banner"
          className="w-full hidden md:block"
        />
        <img
          src={assets.bottom_banner_image_sm}
          alt="banner"
          className="w-full md:hidden"
        />

        <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24 px-4">
          <div className="max-w-md w-full animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-6 animate-slide-up">
              Why We Are The Best
            </h1>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-[1.02] group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-2 bg-white/20 rounded-full group-hover:rotate-3 transition-transform duration-500">
                    <img 
                      src={feature.icon} 
                      alt={feature.title} 
                      className="md:w-9 w-7" 
                    />
                  </div>
                  
                  <div className="group-hover:translate-x-1 transition-transform duration-200">
                    <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500/70 text-xs md:text-sm group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;