import React, { useState, useEffect } from "react";
import ProductCart from "./ProductCart";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";

const BestSeller = () => {
  const { products, isLoading } = useAppContext();
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();

  // Function to shuffle array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    if (products.length > 0) {
      // Filter products that are in stock and have an offer price
      const saleProducts = products.filter(product => 
        product.inStock && product.offerPrice && product.offerPrice < product.price
      );

      // If we have enough sale products, use them
      if (saleProducts.length >= 4) {
        setRandomProducts(shuffleArray([...saleProducts]).slice(0, 4));
      } else {
        // If not enough sale products, mix with other in-stock products
        const otherProducts = products.filter(product => 
          product.inStock && (!product.offerPrice || product.offerPrice >= product.price)
        );
        const mixedProducts = [...saleProducts, ...otherProducts];
        setRandomProducts(shuffleArray([...mixedProducts]).slice(0, 4));
      }
    }
  }, [products]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 mx-auto bg-gradient-to-b from-[#f6eeee] to-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-[slideUp_0.8s] tracking-tight">
          Top <span className="text-purple-600 relative">
            Picks
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></span>
          </span> For You
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
          Discover our most popular and trending furniture pieces, carefully selected for your home
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-[450px] animate-pulse shadow-lg"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {randomProducts.map((product) => (
              <div key={product._id} className="transform transition-all duration-300 ">
                <ProductCart 
                  product={product} 
                  isBestSeller={true}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => {
                navigate('/products');
                window.scrollTo(0, 0);
              }}
              className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-10 py-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-lg font-semibold shadow-sm hover:shadow-xl transform hover:-translate-y-1"
            >
              View More 
              <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default BestSeller;