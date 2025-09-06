import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';

// Method 1: Import (make sure the path is correct)
import shop from '../assets/shop.jpg'; // Try .jpg and .JPG extensions



const FollowUs = () => {
  // Debugging - log the image path
  console.log('Image path:', shop); 
  console.log('Alternative path:',);

  return (
    <div className="relative mt-12 w-full h-[500px] bg-red-100"> {/* Temporary red bg to see container */}
      
      {/* OPTION 1: Background image with inline styles */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${shop})`,
          backgroundColor: 'rgba(0,0,0,0.3)', // Fallback color
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* OPTION 2: Regular img element (uncomment to test) */}
      {/* <img 
        src={shop || shopImage} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover"
      /> */}

      {/* Content */}
      <div className="relative bg-[#faf4f4]/40 z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <div className=" p-8 md:p-12 rounded-xl max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-extrabold text-black mb-4">Our Instagram</h2>
          <p className="text-black font-semibold text-2xl mb-8">
         Follow Our Store on Instagram
          </p>
          
          <div className="flex justify-center gap-4">
           <button className='bg-[#faf4f4] p-3 px-10 font-semibold py-3 rounded-full hover:scale-102 transition'>Follow us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;