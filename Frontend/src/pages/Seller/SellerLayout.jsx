import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import Meubel from "../../assets/MeubelLogo.png";
import { useAppContext } from "../../Context/AppContext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const Logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Topbar */}
      <header className="flex sticky top-0 z-50 items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 h-20 bg-white shadow-sm">
        <NavLink to="/">
          <img src={Meubel} alt="logo" className="cursor-pointer w-28 md:w-32" />
        </NavLink>

        <div className="flex items-center gap-4 text-gray-500">
          <span className="hidden sm:block text-gray-600 font-medium animate-fade-in">
            {(() => {
              const hour = new Date().getHours();
              if (hour < 5) return "Late night shift, Admin?";
              if (hour < 12) return "Good morning, Admin!";
              if (hour < 14) return "Lunch time yet, Admin?";
              if (hour < 18) return "Good afternoon, Admin!";
              if (hour < 22) return "Good evening, Admin!";
              return "Working late, Admin?";
            })()}
          </span>

          <button
            onClick={Logout}
            className="relative border border-purple-400 rounded-full px-6 py-1.5 font-medium text-black hover:bg-purple-500 hover:text-white transition duration-300"
          >
            Logout
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-full hover:bg-purple-100 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? (
              <FaTimes className="text-xl text-gray-700" />
            ) : (
              <FaBars className="text-xl text-gray-700" />
            )}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <aside
          className={`fixed z-40 md:static top-0 left-0 w-64 h-full md:h-auto bg-white/90 backdrop-blur-md border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 shadow-lg md:shadow-none pt-24 md:pt-6`}
        >
          <nav className="flex flex-col gap-2 px-4">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                end={item.path === "/seller"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-purple-100 text-purple-800 border-l-4 border-purple-500"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <img src={item.icon} className="w-6 h-6" alt="" />
                <span className="md:block">{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default SellerLayout;
