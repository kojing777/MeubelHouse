import newArriver from "../assets/new1.png";
import { useNavigate } from "react-router-dom";

const NewArrivels = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fff9e5] overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 py-12 min-h-[600px]">
        {/* Image Section - Animated and enhanced */}
        <div className="w-full lg:w-[60%] flex justify-center items-center relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-12 scale-125"></div>
          <img
            className="w-full max-w-2xl lg:max-w-2xl xl:max-w-3xl object-contain transform transition-all duration-500"
            src={newArriver}
            alt="Premium Asgaard Sofa"
            loading="lazy"
          />
          {/* Decorative elements */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-yellow-200/30 blur-xl"></div>
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-orange-200/20 blur-xl"></div>
        </div>

        {/* Text Content Section - Enhanced typography and spacing */}
        <div className="w-full lg:w-[40%] text-start space-y-6 lg:pl-8 xl:pl-12 relative z-10">
          {/* Badge with animation */}
          <div className="inline-flex items-center gap-2 text-gray-700 text-sm font-medium px-3 py-1 bg-white/80 rounded-full border border-gray-200 shadow-sm animate-bounce-slow">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              className="text-yellow-500"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 0a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H4v1a1 1 0 0 1-2 0V4H1a1 1 0 0 1 0-2h1V1a1 1 0 0 1 1-1m0 10a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H4v1a1 1 0 1 1-2 0v-1H1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 1-1m7-10a1 1 0 0 1 .967.744L12.146 5.2 15.5 7.134a1 1 0 0 1 0 1.732l-3.354 1.935-1.18 4.455a1 1 0 0 1-1.933 0L7.854 10.8 4.5 8.866a1 1 0 0 1 0-1.732l3.354-1.935L9.034.744A1 1 0 0 1 10 0"
                fill="currentColor"
              />
            </svg>
            <span className="text-gray-800">NEW ARRIVALS</span>
          </div>
          
          {/* Headline with creative styling */}
          <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight tracking-tight">
            <span className="relative inline-block">
              ASGAARD
              <span className="absolute -bottom-2 left-0 w-full h-1  rounded-full"></span>
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold px-4 py-1 rounded-md shadow-lg transform transition-all hover:scale-105 hover:rotate-1">
              SOFA
            </span>
          </h1>
          
          {/* Description with improved readability */}
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-lg">
            Handcrafted Scandinavian sofa with premium aniline leather. 
            Features ergonomic design with pocket spring cushions for 
            ultimate comfort. Available in 6 exclusive colors.
          </p>
          
          {/* CTA button with hover effects */}
          <div className="pt-4">
            <button 
              onClick={() => {
                navigate('/products?category=living-room');
                window.scrollTo(0, 0);
              }}
              className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg md:text-xl font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <span className="relative z-10">Order Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-white/20 group-hover:animate-shine transition-all duration-500"></span>
            </button>
            
            {/* Additional info */}
            <p className="mt-3 text-sm text-gray-600">
              Free shipping & 30-day return policy
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        .animate-shine {
          animation: shine 1.5s;
        }
      `}</style>
    </div>
  );
};

export default NewArrivels;