import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/MeubelLogo.png";
import shop from "../assets/shop.jpg";
import { FaClock } from "react-icons/fa";
import { FaUser, FaTag } from "react-icons/fa";
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";
import blog3 from "../assets/blog3.jpeg";
import blog4 from "../assets/blog4.jpeg";
import blog5 from "../assets/blog5.jpeg";   
import blog6 from "../assets/blog6.jpeg";
import blog7 from "../assets/blog7.jpeg";
import blog8 from "../assets/blog8.jpeg";
import blog9 from "../assets/blog9.jpeg";
import blog10 from "../assets/blog10.jpeg";
import blog11 from "../assets/blog11.jpeg";
import blog12 from "../assets/blog12.jpeg";
import blog13 from "../assets/blog13.jpeg";


import { FaShareAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { IoIosSearch } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

const AllBlogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    const blogPosts = [
        {
            id: 1,
            image: blog4,
            admin: "Admin",
            date: "14 Jan 2025",
            category: "Wood",
            title: "Going all-in with millennial design",
            description: "Modern design trends emphasize clean lines, multifunctional pieces, and a balance between form and purpose—think modular sofas that adapt to small spaces or sleek, extendable dining tables perfect for entertaining. Material choices play a crucial role, with warm woods like oak and walnut adding organic warmth, while metals and glass introduce a contemporary edge. For those prioritizing sustainability, bamboo, reclaimed wood, and recycled materials offer eco-friendly alternatives without sacrificing style. Ultimately, great furniture design should serve daily needs while sparking joy every time you enter the room."
        },
        {
            id: 2,
            image: blog7,
            admin: "Admin",
            date: "14 Dec 2025",
            category: "Handmade",
            title: "Exploring new ways of decorating",
            description: "Today's trends celebrate versatility, with pieces like convertible coffee tables and storage ottomans offering smart solutions for modern living. The interplay of materials creates visual intrigue – imagine matte black metal frames paired with rich teak wood, or bouclé fabric adding tactile contrast to smooth leather surfaces. Lighting fixtures have evolved into sculptural statements, with oversized pendant lamps and asymmetrical floor lamps becoming functional art pieces. Color palettes are shifting towards earthy tones, with terracotta, olive green, and muted blues taking center stage, creating a serene backdrop for both relaxation and creativity."
        },
        {
            id: 3,
            image: blog6,
            admin: "Admin",
            date: "14 Nov 2025",
            category: "Wood",
            title: "Handmade pieces that took time to make",
            description: "The current shift toward biophilic design brings natural elements indoors through live-edge wood tables, rattan headboards, and organic-shaped decor. While open floor plans remain popular, strategic furniture placement creates intimate zones within larger areas using backless shelving units or carefully positioned area rugs. The most successful interiors balance trend-forward elements with timeless staples, allowing for easy updates while maintaining a cohesive aesthetic. Ultimately, great furniture design should serve daily needs while sparking joy every time you enter the room."
        },
        {
            id: 4,
            image: blog1,
            admin: "Admin",
            date: "10 Nov 2025",
            category: "Design",
            title: "Modern home in Urban",
            description: "Urban living demands smart solutions that maximize space without compromising style. This comprehensive guide explores how to transform compact city apartments into functional, beautiful living spaces. From multi-functional furniture pieces to clever storage solutions, discover how to make every square foot count. Learn about vertical gardening, modular furniture systems, and innovative lighting solutions that create the illusion of more space. Urban homes can be both practical and aesthetically pleasing with the right approach to design and organization."
        },
        {
            id: 5,
            image: blog5,
            admin: "Admin",
            date: "8 Nov 2025",
            category: "Interior",
            title: "Colourful office redesign",
            description: "Transform your workspace into an inspiring environment that boosts productivity and creativity. This guide covers everything from color psychology in office design to ergonomic furniture selection. Learn how to create zones for different types of work, incorporate natural elements, and use lighting to enhance mood and focus. Discover how the right office design can improve employee satisfaction, reduce stress, and create a more collaborative atmosphere. From startup spaces to corporate environments, find the perfect balance of functionality and style."
        },
        {
            id: 6,
            image: blog3,
            admin: "Admin",
            date: "5 Nov 2025",
            category: "Crafts",
            title: "Artisan furniture making",
            description: "Discover the art and craft of handmade furniture creation, where tradition meets modern innovation. This exploration delves into the techniques, tools, and materials used by master craftsmen to create unique, high-quality pieces. Learn about wood selection, joinery methods, and finishing techniques that have been perfected over generations. Understand the difference between mass-produced and handcrafted furniture, and why investing in artisan pieces can transform your living space. From selecting the right wood species to understanding construction methods, gain insights into the world of bespoke furniture making."
        }
    ];

    const categories = [
        { name: "Crafts", count: 2 },
        { name: "Design", count: 8 },
        { name: "Handmade", count: 7 },
        { name: "Interior", count: 1 },
        { name: "Wood", count: 9 },
    ];

    const recentPosts = [
        {
            id: 1,
            image: blog4,
            title: "Going all-in with millennial design",
            date: "12 May 2022"
        },
        {
            id: 2,
            image: blog9,
            title: "Exploring new ways of decorating",
            date: "12 May 2022"
        },
        {
            id: 3,
            image: blog6,
            title: "Handmade pieces that took time to make",
            date: "12 May 2022"
        },
        {
            id: 4,
            image: blog7,
            title: "Modern home in Urban",
            date: "12 May 2022"
        },
        {
            id: 5,
            image: blog1,
            title: "Colourful office redesign",
            date: "12 May 2022"
        },
    ];

    // Calculate pagination
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    // Generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

  return (
    <div>
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
          <h1 className="text-5xl font-bold mb-2">Blog</h1>
          <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
            <Link to="/" className="hover:text-black font-bold transition">
              Home
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" /></span>
            <span className="text-white hover:text-black">Blog</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-30 py-6 sm:py-8 lg:py-16">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-14">
                {/* Main Content */}
                <div className="w-full lg:w-3/4 space-y-8 sm:space-y-10 lg:space-y-12">
                    {currentPosts.map((post) => (
                        <div key={post.id} className="bg-white overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-48 sm:h-64 lg:w-260 lg:h-130 rounded-lg object-cover" />
                            <div className="p-4 sm:p-6 lg:p-3 lg:pl-1 mt-1">
                                <div className="flex flex-col sm:flex-row sm:items-start text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 gap-2 sm:gap-0">
                                    <span className="flex items-center sm:mr-4"><FaUser className="mr-1" /> {post.admin}</span>
                                    <span className="flex items-center sm:mr-4"><FaClock className="mr-1" /> {post.date}</span>
                                    <span className="flex items-center"><FaTag className="mr-1" /> {post.category}</span>
                                </div>
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 mb-3 sm:mb-4">{post.title}</h2>
                                <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{post.description}</p>
                                <Link to={`/blog/${post.id}`} className="text-purple-600 hover:underline font-medium text-sm sm:text-base" onClick={() => window.scrollTo(0, 0)}>
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                  
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-1/4 space-y-4 sm:space-y-6">
                    {/* Search */}
                    <div className="bg-white rounded-lg shadow-xs p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-800 mb-3 sm:mb-4">Search</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-3 sm:px-4 py-2 font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                               <IoIosSearch className="h-5 w-5 sm:h-6 sm:w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-lg shadow-xs p-4 sm:p-6 lg:p-8">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-800 mb-3 sm:mb-4">Categories</h3>
                        <ul>
                            {categories.map((category, index) => (
                                <li key={index} className="flex justify-between items-center py-2 border-gray-100 last:border-b-0">
                                    <Link to={`/blog/category/${category.name.toLowerCase()}`} className="text-gray-600 p-1 hover:text-purple-600 transition-colors text-sm sm:text-base">
                                        {category.name}
                                    </Link>
                                    <span className="text-gray-500 text-sm sm:text-base">({category.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-white rounded-lg shadow-xs p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-800 mb-3 sm:mb-4">Recent Posts</h3>
                        <ul>
                            {recentPosts.map((post) => (
                                <li key={post.id} className="flex items-center py-2 sm:py-3 border-gray-100 last:border-b-0">
                                    <img src={post.image} alt={post.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg mr-3 sm:mr-4" />
                                    <div>
                                        <Link to={`/blog/${post.id}`} className="text-gray-800 hover:text-purple-500 font-medium line-clamp-2 text-sm sm:text-base">
                                            {post.title}
                                        </Link>
                                        <p className="text-xs sm:text-sm text-gray-500 flex items-center"><FaClock className="mr-1 text-xs" /> {post.date}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
              <div className="flex justify-center items-center gap-1 sm:gap-2 mt-6 sm:mt-8">
                {/* Previous button */}
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm sm:text-base transition-colors ${
                        currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Previous
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                        disabled={page === '...'}
                        className={`px-3 sm:px-4 py-2 border rounded-lg text-sm sm:text-base transition-colors ${
                            page === currentPage
                                ? 'bg-[#fbebb5] border-purple-300 text-gray-700'
                                : page === '...'
                                ? 'border-gray-300 text-gray-500 cursor-default'
                                : 'bg-[#fff9e5] border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next button */}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm sm:text-base transition-colors ${
                        currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Next
                </button>
            </div>
                    
        </div>
        <div className="bg-[#faf4f4] py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-start">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Free Delivery</h3>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl">For all orders over $50, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">90 Days Return</h3>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl">If goods have problems, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Secure Payment</h3>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl">100% secure payment, consectetur adipim scing elit.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBlogs