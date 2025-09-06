import React, { useState, useRef } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../assets/MeubelLogo.png";
import shop from "../assets/shop.jpg";
import { FaClock } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";


const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simplified template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        email: "kojingmoktan92@gmail.com",
      };

      console.log("Sending email with params:", templateParams);

      const result = await emailjs.send(
        "service_g27i7oe",
        "template_i7h8wdc",
        templateParams,
        "7lwUAYpv7ZPYn5m5-"
      );

      console.log("EmailJS result:", result);

      if (result.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Detailed error:", error);
      if (error.text) {
        console.error("EmailJS error details:", error.text);
      }
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
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
          <h1 className="text-5xl font-bold mb-2">Contact</h1>
          <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
            <Link to="/" className="hover:text-black font-bold transition">
              Home
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" /></span>
            <span className="text-white hover:text-black">Contact</span>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Get in <span className="text-purple-600">Touch</span> with Us
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
             For More Information About Our Products, and Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There to Help You Out. Do Not Hesitate to Contact Us.
            </p>
          </div>

          {/* Contact Content - Closer Layout */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Contact Information */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 lg:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h2>
       
                <div className="space-y-8">
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <FiMapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600">123 Furniture Street</p>
                      <p className="text-gray-600">Nepal, Nep 10001, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <FiPhone className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <FiMail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">support@meubelhouse.com</p>
                      <p className="text-gray-600">info@meubelhouse.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                      <FaClock className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sat - Sun: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-purple-50 transition-all duration-200"
                    >
                      <FaFacebookF className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                    </a>
                    <a
                      href="#"
                      className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-purple-50 transition-all duration-200"
                    >
                      <FaTwitter className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                    </a>
                    <a
                      href="#"
                      className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-purple-50 transition-all duration-200"
                    >
                      <FaInstagram className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                    </a>
                    <a
                      href="#"
                      className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md hover:bg-purple-50 transition-all duration-200"
                    >
                      <FaLinkedinIn className="w-5 h-5 text-gray-600 hover:text-purple-600 transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 lg:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>
             
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Meubelhouse@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-purple-600 text-white py-4 px-2 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl ${
                      loading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-purple-700 hover:scale-[1.02]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
    </div>
  );
};

export default Contact;
