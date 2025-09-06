import React, { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import { FaUserShield } from "react-icons/fa";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-2xl z-0"></div>
        <form
          onSubmit={onSubmitHandler}
          className="relative z-10 flex flex-col gap-6 m-auto items-center p-8 py-12 w-full max-w-md shadow-2xl rounded-2xl border border-gray-100 bg-white/90 backdrop-blur-md hover:shadow-3xl transition-shadow duration-300"
        >
          <div className="flex flex-col items-center w-full mb-2">
            <div className="bg-purple-100 p-4 rounded-full mb-3 shadow">
              <FaUserShield className="text-4xl text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">
              <span className="text-purple-600">Admin</span> Login
            </p>
            <p className="text-gray-500 text-base">Welcome back! Please login to your admin account.</p>
          </div>
          <div className="w-full space-y-1">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 hover:border-gray-300 bg-white/80"
              required
            />
          </div>
          <div className="w-full space-y-1">
            <label className="text-gray-700 font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-200 rounded-lg w-full p-3 mt-1 outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 hover:border-gray-300 bg-white/80"
              required
            />
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-sm text-purple-500 hover:text-purple-700 hover:underline transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-3 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-lg tracking-wide"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;