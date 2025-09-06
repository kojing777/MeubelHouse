import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import ProductCart from "../Components/ProductCart";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaHeart,
  FaRegHeart,
  FaShare,
} from "react-icons/fa";
import { TbShoppingCart } from "react-icons/tb";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const {
    products,
    navigate,
    addToCart,
    removeFromCart,
    cartItems = {}, // Default to empty object if undefined
    toggleWishlist,
    wishlist = [], // Default to empty array if undefined
  } = useAppContext();

  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [quantity, setQuantity] = useState(0); // Initialize to 0
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safely find product with null check
  const product = products?.find((item) => item._id === id) || null;

  // Initialize wishlist status
  useEffect(() => {
    if (product?._id) {
      setIsWishlisted(wishlist.includes(product._id));
    }
  }, [product, wishlist]);

  // Initialize quantity from cart
  useEffect(() => {
    if (product?._id && cartItems) {
      setQuantity(cartItems[product._id] || 0);
    }
  }, [product, cartItems]);

  const handleAddToCart = () => {
    if (!product?._id) return;
    addToCart(product._id);
    // No need for toast here as addToCart in AppContext already shows one
  };

  const handleIncrement = () => {
    if (!product?._id) return;
    addToCart(product._id);
    // No need for toast here as addToCart in AppContext already shows one
  };

  const handleDecrement = () => {
    if (!product?._id) return;
    removeFromCart(product._id);
    // No need for toast here as removeFromCart in AppContext already shows one
  };

  const handleWishlistToggle = () => {
    if (!product?._id) return;
    toggleWishlist(product._id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.name || "Product",
          text: `Check out this amazing product: ${product?.name || ""}`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareModal(false);
    // Add toast notification here if needed
  };

  const nextImage = () => {
    if (!product?.image?.length) return;
    setCurrentImageIndex((prev) =>
      prev === product.image.length - 1 ? 0 : prev + 1
    );
    setThumbnail(product.image[currentImageIndex]);
  };

  const prevImage = () => {
    if (!product?.image?.length) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.image.length - 1 : prev - 1
    );
    setThumbnail(product.image[currentImageIndex]);
  };

  // Initialize related products
  useEffect(() => {
    if (products?.length > 0 && product) {
      const productsCopy = [...products].filter(
        (item) => product.category === item.category
      );

      const currentProductFirst = [
        product,
        ...productsCopy.filter((item) => item._id !== product._id),
      ];

      const uniqueProducts = currentProductFirst.filter(
        (item, index, self) =>
          index === self.findIndex((t) => t._id === item._id)
      );

      const inStockProducts = uniqueProducts.filter((p) => p.inStock);
      const outOfStockProducts = uniqueProducts.filter((p) => !p.inStock);

      const combined = [...inStockProducts, ...outOfStockProducts].slice(0, 5);
      setRelatedProducts(combined);
    }
  }, [products, product]);

  // Initialize thumbnail
  useEffect(() => {
    if (product?.image?.[0]) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product not found
          </h2>
          <Link
            to="/products"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // Helper to safely check if product is in cart
  const isInCart =
    Object.keys(cartItems).includes(product._id);
  const cartQuantity = isInCart
    ? cartItems[product._id]
    : quantity;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 mt-20 max-w-7xl">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-bold text-lg mb-10">
        <Link to="/" className="text-gray-700 hover:text-purple-600 transition">
          Home
        </Link>
        <span className="mx-2 text-gray-700">
          <IoIosArrowForward />
        </span>
        <Link
          to="/products"
          className="text-gray-600 hover:text-purple-600 transition"
        >
          Shop
        </Link>
        <span className="mx-2 text-gray-700">
          <IoIosArrowForward />
        </span>  
        <span className="text-black font-medium">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-5 xl:gap-12">
        {/* Thumbnail Images */}
        {product.image?.length > 0 && (
          <div className="order-2n  lg:order-1 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  setThumbnail(image);
                  setCurrentImageIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 md:w-25  bg-[#FFF9E5] md:h-25 rounded-md overflow-hidden cursor-pointer transition-all duration-200 ${
                  thumbnail === image
                    ? "ring-2 ring-purple-600 shadow-md"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* Main Product Image */}
        {product.image?.[0] && (
          <div className="order-1 lg:order-2 w-full h-140 lg:w-1/2 bg-[#FFF9E5] rounded-xl p-4 md:p-8 flex justify-center items-center shadow-sm relative group">
            <div className="aspect-square w-full h-full max-h-[400px] flex justify-center items-center relative">
              <img
                src={thumbnail || product.image[0]}
                alt={product.name}
                className="object-contain w-full h-full max-h-[400px] transition-opacity duration-300"
                loading="eager"
              />
              {product.image.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <IoIosArrowRoundForward className="w-6 h-6 rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <IoIosArrowRoundForward className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            {product.image.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{product.image.length}
              </div>
            )}
          </div>
        )}

        {/* Product Info */}
        <div className="order-3 lg:order-3 w-full lg:w-2/5">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleWishlistToggle}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500 w-5 h-5" />
                ) : (
                  <FaRegHeart className="text-gray-700 w-5 h-5" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Share product"
              >
                <RiShareForwardLine className="text-gray-700 w-5 h-5" />
              </button>
            </div>
          </div>
 
                {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                Rs. {product.offerPrice?.toLocaleString("en-IN") || "0"}.00
              </p>
              {product.price && product.price !== product.offerPrice && (
                <>
                  <p className="text-lg text-gray-500 line-through">
                    Rs. {product.price.toLocaleString("en-IN")}.00
                  </p>
                  <span className="bg-green-100 text-green-800 text-xs md:text-sm font-medium px-2 py-0.5 rounded">
                    {Math.round((1 - product.offerPrice / product.price) * 100)}
                    % OFF
                  </span>
                </>
              )}
            </div>
          </div>
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 md:w-5 md:h-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
            </div>
            <span className="text-sm md:text-base text-gray-600">
             |  5 Customer Reviews
            </span>
          </div>

          

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {product.description?.join(" ") || "No description available"}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-gray-500 font-medium mb-2">Size</h3>
            <div className="flex space-x-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`w-10 h-10 flex items-center justify-center border rounded-md transition-colors ${
                    size === "M"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-300 text-gray-800 hover:border-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-gray-500 font-medium mb-2">Color</h3>
            <div className="flex space-x-2">
              {[
                { color: "#8A56E2", name: "Purple" },
                { color: "#000000", name: "Black" },
                { color: "#B88E2F", name: "Gold" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
                    style={{ backgroundColor: item.color }}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      index === 0
                        ? "border-primary scale-110"
                        : "border-gray-300 hover:scale-110"
                    }`}
                    aria-label={`Select ${item.name} color`}
                  ></button>
                  <span className="text-xs mt-1 text-gray-500">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                className="w-10 h-10 flex items-center justify-center text-xl text-gray-800 hover:bg-gray-100 rounded-l-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDecrement}
                disabled={quantity <= 0}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-medium">
                {quantity}
              </span>
              <button
                className="w-10 h-10 flex items-center justify-center text-xl text-gray-800 hover:bg-gray-100 rounded-r-md transition-colors"
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product?._id}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TbShoppingCart className="w-5 h-5" />
              {quantity > 0 ? "Update Cart" : "Add to Cart"}
            </button>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="mb-2">
                <h4 className="font-medium  text-gray-800">Fast Delivery</h4>
                <p className="text-sm text-gray-600">
                  Get your product delivered within 2-3 business days
                </p>
              </div>
            </div>
          </div>

          {/* Product Metadata */}
          <div className="border-t border-gray-200 pt-6 mt-6 space-y-3 text-gray-600 text-sm">
            <p>
              <span className="font-medium text-gray-800">SKU</span>:{" "}
              {product.sku || "SS001"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Category</span>:{" "}
              {product.category || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Tags</span>:{" "}
              {product.tags?.join(", ") || "Sofa, Chair, Home, Shop"}
            </p>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800">Share</span>:
              <button
                onClick={handleShare}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary transition"
              >
                <FaFacebookF />
              </button>
              <button
                onClick={handleShare}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary transition"
              >
                <FaLinkedinIn />
              </button>
              <button
                onClick={handleShare}
                className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary transition"
              >
                <FaTwitter />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16 md:mt-20">
        <div className="flex justify-center space-x-4 md:space-x-8 mb-8 overflow-x-auto py-2 scrollbar-hide">
          <button
            className={`text-lg md:text-xl font-medium pb-2 px-2 whitespace-nowrap transition-colors ${
              activeTab === "description"
                ? "text-black border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`text-lg md:text-xl font-medium pb-2 px-2 whitespace-nowrap transition-colors ${
              activeTab === "additional"
                ? "text-black border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            className={`text-lg md:text-xl font-medium pb-2 px-2 whitespace-nowrap transition-colors ${
              activeTab === "reviews"
                ? "text-black border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews [5]
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="text-center text-gray-700 max-w-4xl mx-auto leading-relaxed space-y-4 px-4">
            <p className="text-sm md:text-base">
              {product.description?.join(" ") || "No description available"}
            </p>
            <p className="text-sm md:text-base">
              Weighing in under 7 pounds, the Kilburn is a lightweight piece of
              vintage styled engineering. Setting the bar as one of the loudest
              speakers in its class, the Kilburn is a compact, stout-hearted
              hero with a well-balanced audio which boasts a clear midrange and
              extended highs for a sound that is both articulate and pronounced.
            </p>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="max-w-4xl mx-auto px-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-800">Weight</td>
                  <td className="py-3 text-gray-600">2.5 kg</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-800">Dimensions</td>
                  <td className="py-3 text-gray-600">30 × 20 × 15 cm</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 font-medium text-gray-800">Materials</td>
                  <td className="py-3 text-gray-600">Wood, Metal, Fabric</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-gray-800">Other Info</td>
                  <td className="py-3 text-gray-600">Handmade product</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((review) => (
                <div key={review} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <img
                            key={i}
                            src={
                              i < 4 ? assets.star_icon : assets.star_dull_icon
                            }
                            alt=""
                            className="w-4 h-4"
                          />
                        ))}
                    </div>
                    <span className="text-sm font-medium">
                      John D. - {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    This product exceeded my expectations. The quality is
                    outstanding and it looks even better in person than in the
                    photos.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Images */}
        {product.image?.length > 1 && (
          <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-10 px-4">
            {product.image[1] && (
              <div className=" p-6 bg-[#FFF9E5] rounded-xl flex items-center justify-center h-64 md:h-80">
                <img
                  src={product.image[1]}
                  alt="Product detail 1"
                  className="max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
            {product.image[2] && (
              <div className="bg-[#FFF9E5] p-6 rounded-xl flex items-center justify-center h-64 md:h-80">
                <img
                  src={product.image[2]}
                  alt="Product detail 2"
                  className="max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-20">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-[slideUp_0.8s] tracking-tight">
              You May Also <span className="text-purple-600 relative">
                Like
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></span>
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Discover more products that complement your style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {relatedProducts
              .filter((relatedProduct) => relatedProduct._id !== product._id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct._id} className="transform transition-all duration-300 hover:-translate-y-2">
                  <ProductCart
                    product={relatedProduct}
                  />
                </div>
              ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => {
                navigate("/products");
                window.scrollTo(0, 0);
              }}
              className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-6 py-3 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-lg font-semibold shadow-sm hover:shadow-md"
            >
              View More Products
              <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Share this product</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close share modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex justify-center gap-6 mb-6">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                aria-label="Share on Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 rounded-full text-blue-400 hover:bg-blue-200 transition-colors"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-100 rounded-full text-blue-700 hover:bg-blue-200 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
            <div className="flex">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
                aria-label="Product URL"
              />
              <button
                onClick={copyToClipboard}
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark transition-colors"
                aria-label="Copy to clipboard"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
