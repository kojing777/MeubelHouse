import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCart from "../Components/ProductCart";
import { Link } from "react-router-dom";
import logo from "../assets/MeubelLogo.png";
import shop from "../assets/shop.JPG";
import { MdArrowForwardIos } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { BsFilterSquare } from "react-icons/bs";





const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let currentProducts = [...products];

    if (searchQuery.length > 0) {
      currentProducts = currentProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        currentProducts.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "price-desc":
        currentProducts.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case "name-asc":
        currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        currentProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (e.g., by ID or original order if no other criteria)
        break;
    }

    setFilteredProducts(currentProducts);
    setCurrentPage(1); // Reset to first page when search query or sorting changes
  }, [searchQuery, products, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 6;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if at the start
      if (currentPage <= 3) {
        end = 4;
      }
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <>
      <div
        className="w-full mt-10 h-[400px] flex items-center justify-center relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${shop})`,
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="relative z-10 text-white text-center">
          <img src={logo} alt="Logo" className="mx-auto mb-4 w-40 h-23 mt-12" />
          <h1 className="text-5xl font-bold mb-2">Shop</h1>
          <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
            <Link to="/" className="hover:text-black font-bold transition">
              Home
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" />
</span>
            <span className="text-white hover:text-black">Shop</span>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF3E3] py-6 px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto md:pl-20 gap-2 sm:gap-4 justify-center md:justify-start">
          <div className="flex items-center gap-2 text-gray-700">
            <IoFilterSharp className="font-bold text-gray-700" />
            Filter
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 8H8V4H4V8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 8H20V4H16V8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 20H8V16H4V20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 20H20V16H16V20Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <BsFilterSquare />
          </div>
          <div className="border-l border-purple-300 h-6 mx-2 hidden sm:block"></div>
          <p className="text-gray-600 text-center sm:text-left">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} results
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto md:pr-20 gap-2 sm:gap-4 justify-center md:justify-end mt-2 md:mt-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-700">Show</span>
            <select
              className="px-4 py-2 border border-purple-300 rounded-lg w-full sm:w-auto"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="20">20</option>
            </select>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-gray-700">Sort by</span>
            <select
              className="px-4 py-2 border border-purple-300 rounded-lg w-full sm:w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col mb-20 px-4 sm:px-6 lg:px-8">
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-xl text-gray-600 font-medium">
              No products found matching your search
            </p>
            <button
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              onClick={() => setFilteredProducts(products)}
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 sm:px-4">
              {currentProducts.map((product) => (
                <ProductCart
                  key={product._id}
                  product={product}
                  showPrice={true}
                  className="transform hover:scale-105 transition duration-300"
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-12">
                <button
                  type="button"
                  aria-label="Previous"
                  className="mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === 1}
                >
                  <svg
                    width="9"
                    height="16"
                    viewBox="0 0 12 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1L2 9.24242L11 17"
                      stroke="#111820"
                      strokeOpacity="0.7"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div className="flex gap-2 text-gray-500 text-sm md:text-base">
                  {getPageNumbers().map((pageNum, index) =>
                    pageNum === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="flex items-center justify-center w-9 md:w-12 h-9 md:h-12"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`flex items-center justify-center w-9 md:w-12 h-9 md:h-12 aspect-square rounded-md transition-all ${
                          currentPage === pageNum
                            ? "bg-indigo-500 text-white"
                            : "bg-white border border-gray-300/60 hover:bg-gray-300/10"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  type="button"
                  aria-label="Next"
                  className="ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={currentPage === totalPages}
                >
                  <svg
                    width="9"
                    height="16"
                    viewBox="0 0 12 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L10 9.24242L1 17"
                      stroke="#111820"
                      strokeOpacity="0.7"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

    {/* Enhanced Features/Guarantees Section */}
<div className="bg-[#faf4f4] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">Free Delivery</h3>
            <p className="text-gray-600 text-xl">For all orders over $50, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">90 Days Return</h3>
            <p className="text-gray-600 text-xl">If goods have problems, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-800">Secure Payment</h3>
            <p className="text-gray-600 text-xl">100% secure payment, consectetur adipim scing elit.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
