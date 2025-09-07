import  { useEffect, useRef, useState } from "react";
import hero1 from "../assets/Hero1.png";
import hero2 from "../assets/Hero2.png"; 
import hero3 from "../assets/Hero3.png";
import hero4 from "../assets/Hero4.png";
import hero6 from "../assets/hero6.png";
import hero7 from "../assets/hero7.png";
import hero8 from "../assets/hero8.png";
import { BsMoonStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
    const furnitureImages = [
        
        hero1,
        hero2,
        hero3,
        hero4,
        hero6,
        hero7,
        hero8
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);

    // Function to go to a specific slide
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Function for auto sliding with sequential interval
    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % furnitureImages.length);
        }, 3000); // Change slide every 3 seconds
    };

    useEffect(() => {
        startAutoSlide();
        return () => clearInterval(intervalRef.current);
    }, []);

    // Update slider position when currentSlide changes
    useEffect(() => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.clientWidth / furnitureImages.length;
            sliderRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    }, [currentSlide]);

    return (
        <div className="bg-[#fbebb5] mt-14 mx-auto px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col-reverse md:flex-row items-center md:justify-between gap-12 pb-16 min-h-[600px]">
            {/* Text Content */}
            <div className="w-full md:w-1/2 max-md:mb-8 mt-12 md:mt-12 sm:mt-0 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-gray-700 text-lg font-medium px-5 py-1 rounded-full border border-[#fbebb5]  animate-bounce-slow mb-0">
                    <BsMoonStars className="h-8 w-6 text-purple-500" />
                    <span className="text-gray-800 font-semibold">PREMIUM FURNITURE COLLECTION</span>
                </div>
                <h1 className="font-extrabold text-5xl md:text-7xl lg:text-7xl text-gray-900  leading-tight">
                    Elevate Your
                    <br /> Living Space
                    <span className="inline-block bg-purple-600 text-white font-extrabold px-3 -mb-1 border-b-2 border-purple-800">
                        Beautifully
                    </span>
                </h1>
                <p className="text-gray-600 text-lg mt-2 mb-6">
                    Discover handcrafted furniture that combines comfort, style, and quality.
                    <br />
                    Transform your home with pieces designed to last a lifetime.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 w-full">
  <Link
    className="group inline-flex items-center justify-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-6 sm:px-8 md:px-10 py-3 sm:py-4 border-2 border-purple-600 rounded-lg sm:rounded-xl hover:bg-purple-300 text-sm sm:text-base md:text-lg font-semibold shadow-sm hover:shadow-xl transform hover:-translate-y-1 w-auto min-w-[160px]"
    to='/products'
  >
    <span className="flex items-center gap-2">
      Shop Now
      <FiArrowRight className="transition-transform font-bold duration-200 group-hover:translate-x-1" />
    </span>
  </Link>
  <Link
    className="text-base sm:text-lg md:text-xl font-normal flex items-center justify-center gap-2 hover:underline text-purple-700 transition-all duration-300 hover:text-purple-900 w-full sm:w-auto"
    to='/products'
  >
    <span>Explore Showroom</span>
    <FiArrowRight className="transition-transform font-bold duration-200 group-hover:translate-x-1" />
  </Link>
</div>
            </div>

            {/* Image Carousel without dots */}
            <div className="w-full md:w-1/2 flex justify-center pt-16">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl xl:max-w-xl overflow-hidden relative">
                    <div 
                        ref={sliderRef}
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ width: `${furnitureImages.length * 100}%` }}
                    >
                        {furnitureImages.map((img, index) => (
                            <img 
                                key={index}
                                src={img}
                                className="w-full flex-shrink-0 object-contain"
                                style={{ width: `${100 / furnitureImages.length}%` }}
                                alt={`Furniture ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;