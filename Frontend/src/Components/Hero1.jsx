import table1 from "../assets/hh1.png";
import table2 from "../assets/table1.png";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Hero1 = () => {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);

    if (category) {
      navigate(`/products?category=${category}`);
    } else {
      navigate("/products");
    }
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 bg-[#f6eeee]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 mb-6">
        {/* Category 1 */}
        <div className="overflow-hidden rounded-3xl">
          <div className="relative w-full h-56 sm:h-72 md:h-[400px]  flex items-center justify-center pt-2 pb-4">
            <img
              src={table1}
              alt="Living Room Furniture"
              className="w-full h-full object-contain -mt-4 sm:-mt-8"
            />
          </div>
          <div className="px-3 sm:px-6 md:px-8 -mt-4 sm:-mt-6 pb-6 sm:pb-8 text-start pl-4 sm:pl-10 md:pl-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 bg-white/80 rounded-full border border-gray-200 shadow-sm mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span className="text-gray-800 font-semibold">FEATURED</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
              Living Room{" "}
              <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                Collection
              </span>
            </h3>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed font-medium">
              Transform your living space with our curated collection of modern
              sofas, stylish coffee tables, and elegant loungers.
            </p>

            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-6 sm:px-10 py-3 sm:py-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-base sm:text-lg font-semibold shadow-sm hover:shadow-xl transform hover:-translate-y-1 w-auto"
                onClick={() => handleNavigation("living-room")}
              >
                View More
                <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Category 2 */}
        <div className="overflow-hidden rounded-3xl">
          <div className="relative w-full h-56 sm:h-72 md:h-[400px]  flex items-center justify-center pt-2 pb-4">
            <img
              src={table2}
              alt="Bedroom Furniture"
              className="w-full h-full object-contain -mt-4 sm:-mt-8"
            />
          </div>
          <div className="px-3 sm:px-6 md:px-8 -mt-4 sm:-mt-6 pb-6 sm:pb-8 text-start pl-4 sm:pl-10 md:pl-20">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 bg-white/80 rounded-full border border-gray-200 shadow-sm mb-3 sm:mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-800 font-semibold">PREMIUM</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
              Kitchen{" "}
              <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text ">
                Collection
              </span>
            </h3>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed font-medium">
              Design your dream kitchen with our premium selection of cabinets,
              countertops, and appliances.
            </p>

            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-6 sm:px-10 py-3 sm:py-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-base sm:text-lg font-semibold shadow-sm hover:shadow-xl transform hover:-translate-y-1 w-auto"
                onClick={() => handleNavigation("living-room")}
              >
                View More
                <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-center mt-8">
        <button
          className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-8 py-3.5 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          onClick={() => handleNavigation()}
        >
          Explore Collection
          <FiArroaawRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div> */}
    </div>
  );
};

export default Hero1;
