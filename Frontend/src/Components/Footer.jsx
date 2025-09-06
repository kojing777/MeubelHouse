import { Link } from "react-router-dom";
import logo from "../assets/MeubelLogo.png";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="MeubelHouse Logo"
                className="h-10 md:h-18"
              />
              <span className="text-xl font-semibold text-gray-800"></span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Bringing quality furniture to your home with elegant design and modern craftsmanship.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link to="#" className="text-gray-400 hover:text-purple-600 transition-colors duration-300" aria-label="LinkedIn">
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                 
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help-center" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/safety-info" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
              
                  Safety Info
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
               
                  Cancellation
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wider">Newsletter</h3>
            <p className="text-gray-500 mb-4">
              Subscribe to our newsletter for inspiration and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Your email address"
                aria-label="Email address"
                required
              />
              <button 
                type="submit" 
                className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} MeubelHouse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-300">
              Terms
            </Link>
            <Link to="/sitemap" className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;