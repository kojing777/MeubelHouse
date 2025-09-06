import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";

const ProductCart = ({ product, showPrice = true, isBestSeller = false }) => {
  const { addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  if (!product) return null;

  const handleProductClick = () => {
    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.category.toLowerCase()}/${product._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      className="relative border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg group h-full transition-all duration-300"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative w-full h-52 bg-gray-50 overflow-hidden">
        <img
          className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          src={product.image[0]}
          alt={product.name}
          onError={(e) => {
            e.target.src = assets.placeholder_image;
          }}
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-100/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-3">
          <button 
            className="bg-white/90 text-purple-600 px-3 py-1.5 rounded-full font-medium text-sm transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
            onClick={handleQuickViewClick}
          >
            Quick View
          </button>
        </div>

        {/* Sale Tag */}
        {isBestSeller && product.offerPrice && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            SALE
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="text-center">
          <p className="text-gray-500 text-xs uppercase tracking-wide font-medium">{product.category}</p>
          <h3 className="text-gray-800 font-semibold text-2xl mt-1 line-clamp-2 min-h-[3rem]">{product.name}</h3>

          <div className="flex items-center justify-center gap-1 mt-0">
            {[...Array(5)].map((_, i) => (
              i < (product.rating || 4) ? (
                <FaStar key={i} className="w-3 h-3 text-yellow-400" />
              ) : (
                <FaRegStar key={i} className="w-3 h-3 text-yellow-400" />
              )
            ))}
            <span className="text-gray-500 text-xs ml-2">({product.ratingCount || 24})</span>
          </div>
        </div>

        {showPrice && (
          <div className="flex items-center justify-center gap-12 mt-3">
            <div className="text-center">
              <p className="text-base font-bold text-gray-900">
                Rs. {product.offerPrice || product.price}
              </p>
              {product.offerPrice && (
                <p className="text-gray-400 text-xs line-through">
                  Rs. {product.price}
                </p>
              )}
            </div>

            <div 
              className="relative z-10" 
              onClick={(e) => e.stopPropagation()}
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center justify-center gap-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 w-20 h-9 rounded-full text-purple-700 text-sm font-medium transition-all duration-300 hover:shadow-sm"
                  onClick={() => addToCart(product._id)}
                >
                  <TbShoppingCart className="w-4 h-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-between w-20 h-8 bg-purple-50 rounded-full overflow-hidden border border-purple-200">
                  <button
                    className="w-8 h-full flex items-center justify-center hover:bg-purple-100 transition-colors text-purple-700"
                    onClick={() => removeFromCart(product._id)}
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-purple-700">{cartItems[product._id]}</span>
                  <button
                    className="w-8 h-full flex items-center justify-center hover:bg-purple-100 transition-colors text-purple-700"
                    onClick={() => addToCart(product._id)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCart;