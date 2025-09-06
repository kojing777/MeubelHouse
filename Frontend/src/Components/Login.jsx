import React, { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/MeubelLogo.png";
import shop from "../assets/shop.jpg";
import login from "../assets/login.jpeg";
import { MdArrowForwardIos } from "react-icons/md";

const Login = () => {
  const { setUser, navigate } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmitLoginHandler = async (event) => {
    event.preventDefault();
    setIsLoginSubmitting(true);
    try {
      const { data } = await axios.post(`/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setUser(data.user);
        toast.success(`Welcome back ${data.user.name || ""}!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoginSubmitting(false);
    }
  };

  const onSubmitRegisterHandler = async (event) => {
    event.preventDefault();
    setIsRegisterSubmitting(true);
    try {
      const { data } = await axios.post(`/api/user/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setUser(data.user);
        toast.success(`Welcome ${data.user.name || ""}!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsRegisterSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-5xl font-bold mb-2">My Account</h1>
          <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
            <Link to="/" className="hover:text-black font-bold transition">
              Home
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" /></span>
            <span className="text-white hover:text-black">My Account</span>
          </div>
        </div>
      </div>

      <div className="pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className=" p-8 md:p-12 rounded-xl  grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Section */}
            <div className="space-y-8 px-4 md:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  {isLoginForm ? "Welcome Back!" : "Create Account"}
                </h2>
                <button
                  onClick={() => setIsLoginForm(!isLoginForm)}
                  className="px-5 py-3 text-sm font-medium text-black border-2 border-purple-300 rounded-full hover:bg-purple-300 hover:text-white transition-all duration-300"
                >
                  {isLoginForm ? "Need an account ? Register" : " Have an account ? Login"}
                </button>
              </div>

              {isLoginForm ? (
                <form onSubmit={onSubmitLoginHandler} className="space-y-6">
                  <div className="w-full space-y-1">
                    <label className="text-gray-700 font-medium">Username or email address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400 h-5 w-5" />
                      </div>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter Your Email"
                        className="w-full mt-2 pl-10 pr-4 py-5 rounded-xl border border-purple-300 focus:border-purple-500 focus:ring-3 focus:ring-purple-100/20 transition-all"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-1">
                    <label className="text-gray-700 font-medium">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400 h-5 w-5" />
                      </div>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter Your Password"
                        className="w-full mt-2 pl-10 pr-12 py-5 rounded-lg border border-purple-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-100/20 transition-all"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-purple rounded focus:ring-purple-200 border-gray-300"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-black hover:underline hover:text-purple-300-dark transition-colors"
                    >
                      Lost Your Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoginSubmitting}
                    className={`group inline-flex items-center justify-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-10 py-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-lg font-semibold shadow-sm hover:shadow-xl transform  w-full ${isLoginSubmitting ? "opacity-80 cursor-not-allowed" : ""}`}
                  >
                    {isLoginSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-700"
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
                        Logging in...
                      </span>
                    ) : (
                      <>
                        Log In
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={onSubmitRegisterHandler} className="space-y-6">
                  <div className="w-full space-y-1">
                    <label className="text-gray-700 font-medium">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400 h-5 w-5" />
                      </div>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter Your Name"
                        className="w-full mt-2 pl-10 pr-4 py-5 rounded-lg border border-gray-300 focus:border-purple-200 focus:ring-2 focus:ring-purple-300/20 transition-all"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full space-y-1">
                    <label className="text-gray-700 font-medium">Email address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400 h-5 w-5" />
                      </div>
                      <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter Your Email"
                        className="w-full mt-2 pl-10 pr-4 py-5 rounded-lg border border-gray-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-300/20 transition-all"
                        type="email"
                        required
                      />
                    </div>
                  </div>

                  <div className="w-full space-y-1">
                    <label className="text-gray-700 font-medium">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400 h-5 w-5" />
                      </div>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter Your Password"
                        className="w-full mt-2 pl-10 pr-12 py-5 rounded-lg border border-gray-300 focus:border-purple-300 focus:ring-2 focus:ring-purple-300/20 transition-all"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      A link to set a new password will be sent to your email address.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#" className="text-purple-600 hover:underline">privacy policy</a>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isRegisterSubmitting}
                    className={`group inline-flex items-center justify-center text-purple-700 hover:text-purple-900 transition-all duration-300 px-10 py-4 border-2 border-purple-600 rounded-xl hover:bg-purple-50 text-lg font-semibold shadow-sm hover:shadow-xl transform  w-full ${isRegisterSubmitting ? "opacity-80 cursor-not-allowed" : ""}`}
                  >
                    {isRegisterSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-700"
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
                        Creating Account...
                      </span>
                    ) : (
                      <>
                        Register
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Image Section */}
            <div className="hidden lg:block relative h-[600px] rounded-2xl overflow-hidden">
              <img
                src={login}
                alt="Login"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <div className="max-w-md space-y-6 text-center">
                  <h3 className="text-4xl font-bold mb-6 leading-tight">
                    Discover Your Perfect Furniture
                  </h3>
                  <div className="space-y-4">
                    <p className="text-lg md:text-xl font-medium">
                      {isLoginForm
                        ? "Sign in to explore our exclusive collection of premium furniture and enjoy personalized shopping experience."
                        : "Join our community and get access to exclusive deals, personalized recommendations, and premium furniture collections."}
                    </p>
                    <div className="space-y-3 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-200/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm md:text-base">Premium Quality Furniture</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-300/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm md:text-base">Free Shipping on Orders Over $50</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-300/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="text-sm md:text-base">90 Days Return Policy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-[#fbebb5] py-16 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">Free Delivery</h3>
            <p className="text-gray-600">For all orders over $50, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">90 Days Return</h3>
            <p className="text-gray-600">If goods have problems, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">Secure Payment</h3>
            <p className="text-gray-600">100% secure payment, consectetur adipim scing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;