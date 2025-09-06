import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaClock, FaUser, FaTag } from 'react-icons/fa';
import logo from "../assets/MeubelLogo.png";
import shop from "../assets/shop.jpg";
import { Link } from "react-router-dom";
import blog1 from "../assets/blog1.jpeg";
import blog2 from "../assets/blog2.jpeg";
import blog3 from "../assets/blog3.jpeg";
import blog4 from "../assets/blog4.jpeg";
import blog5 from "../assets/blog5.jpeg";   
import blog6 from "../assets/blog6.jpeg";
import blog7 from "../assets/blog7.jpeg";
import { MdArrowForwardIos } from "react-icons/md";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Local blog data
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
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Find the blog post by ID
    const post = blogPosts.find(post => post.id === parseInt(id));
    setBlogPost(post);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-lg">Loading blog post...</div>;
  }

  if (!blogPost) {
    return <div className="text-center mt-20 text-lg">Blog post not found.</div>;
  }

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
          <h1 className="text-5xl font-bold mb-2">Blog Details</h1>
          <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
            <Link to="/" className="hover:text-black font-bold transition">
              Home
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" /></span>
            <Link to="/about" className="hover:text-black font-bold transition">
              Blog
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" /></span>
            <span className="text-white hover:text-black line-clamp-1 max-w-[200px]">{blogPost.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-16">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          <img src={blogPost.image} alt={blogPost.title} className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg mb-6" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">{blogPost.title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-start text-gray-500 text-sm mb-6 gap-2 sm:gap-0">
            <span className="flex items-center sm:mr-4"><FaUser className="mr-1" /> {blogPost.admin}</span>
            <span className="flex items-center sm:mr-4"><FaClock className="mr-1" /> {blogPost.date}</span>
            <span className="flex items-center"><FaTag className="mr-1" /> {blogPost.category}</span>
          </div>
          <div className="prose max-w-none text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
            <p>{blogPost.description}</p>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link 
              to="/about" 
              className="text-purple-600 hover:underline font-medium text-sm sm:text-base"
              onClick={() => window.scrollTo(0, 0)}
            >
              ← Back to All Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails; 