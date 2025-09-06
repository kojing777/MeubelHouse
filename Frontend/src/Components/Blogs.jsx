import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FiArrowRight, FiCalendar, FiClock, FiTag, FiShare2, FiHeart } from "react-icons/fi";

const Blogs = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const navigate = useNavigate();

  const blogPosts = [
    {
      id: 1,
      title: "Modern Living Room Designs",
      excerpt: "Discover the latest trends in living room furniture for 2024 and how to incorporate them into your space for a contemporary look.",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: blog4,
      category: "Interior Design",
      author: "Sarah Johnson",
      authorImage: "https://i.pinimg.com/736x/f2/5a/a3/f25aa3f31451fd87fb336d79655c9132.jpg",
      likes: 245,
      shares: 89
    },
    {
      id: 2,
      title: "Sustainable Furniture Choices",
      excerpt: "Learn how to choose eco-friendly furniture without compromising on style or quality for your sustainable home.",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: blog5,
      category: "Sustainability",
      author: "Eva Elfie",
      authorImage: "https://i.pinimg.com/736x/e4/89/7c/e4897cba31a089629c3bdecee4c93def.jpg",
      likes: 189,
      shares: 67
    },
    {
      id: 3,
      title: "Space-Saving Solutions",
      excerpt: "Maximize small spaces with these clever furniture arrangements and multi-functional pieces for urban living.",
      date: "March 5, 2024",
      readTime: "4 min read",
      image: blog9,
      category: "Small Spaces",
      author: "Mia Khalifa",
      authorImage: "https://i.pinimg.com/736x/0b/34/92/0b34926d2f02f26a0c0c2999854f42df.jpg",
      likes: 312,
      shares: 124
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleViewAllPosts = () => {
    navigate('/about');
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="font-extrabold text-3xl sm:text-3xl md:text-5xl text-gray-900 mb-4 animate-[slideUp_0.8s]">
          Our <span className="text-purple-600 relative">
            Blogs
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></span>
          </span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto animate-[slideUp_1s] px-4">
          Find a bright ideal to suit your taste with our great selection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mx-2 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-20">
        {blogPosts.map((post, index) => (
          <div 
            key={post.id} 
            className="flex flex-col h-full overflow-hidden rounded-2xl bg-white transition-all duration-300 animate-[slideUp_0.8s]"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Image Container with Overlay */}
            <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-xl group">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-300/60 via-purple-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
              
              {/* Category Tag */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                  <FiTag className="text-purple-600" />
                  {post.category}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-sm transition-colors duration-300 ${
                    likedPosts[post.id] ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  }`}
                >
                  <FiHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${likedPosts[post.id] ? 'fill-current' : ''}`} />
                </button>
                <button className="p-1.5 sm:p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-600 hover:text-primary transition-colors duration-300">
                  <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow mt-4 p-4 sm:p-6">
              {/* Author Info */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <img 
                  src={post.authorImage} 
                  alt={post.author}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-800">{post.author}</p>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 hover:text-purple-600 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-5 flex-grow">
                {post.excerpt}
              </p>

              {/* Stats and Read More */}
              <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiHeart className={`w-3 h-3 sm:w-4 sm:h-4 ${likedPosts[post.id] ? 'fill-current text-red-500' : ''}`} />
                    {post.likes + (likedPosts[post.id] ? 1 : 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiShare2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    {post.shares}
                  </span>
                </div>
                <button className="text-purple-600 hover:text-purple-800 text-xs sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 transition-all duration-300 bg-purple-50 hover:bg-purple-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:shadow-md transform hover:-translate-y-0.5">
                  Read More
                  <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-12 lg:mt-16">
        <button 
          onClick={handleViewAllPosts}
          className="group inline-flex items-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-8 sm:px-10 py-3 sm:py-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-base sm:text-lg font-semibold shadow-sm hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="flex items-center gap-2">
            View All Post
            <FiArrowRight className="transition-transform font-bold duration-200 group-hover:translate-x-1" />
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Blogs;