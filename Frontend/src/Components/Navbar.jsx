import React, { useState, useRef, useEffect } from "react";
import { PiHeart } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { TbShoppingCart } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { useAppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import SearchModal from "./SearchModal";
import logo from "../assets/MeubelLogo.png";
import profileIcon from "../assets/profile_icon.png";

const Navbar = () => {
    const { getCartCount, navigate, setShowUserLogin, user, logout } = useAppContext();
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/products' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-40 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-1 md:py-2" : "bg-[#fbebb5] text-gray-800 py-2 md:py-3"}`}>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className={`h-10 md:h-12 lg:h-14 transition-all duration-300 ${isScrolled ? "opacity-100" : "opacity-100"}`} 
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                navigate(link.path);
                                window.scrollTo(0, 0);
                            }}
                            className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-gray-800"}`}
                        >
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-gray-800"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </button>
                    ))}
                    <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-gray-800'} transition-all`}>
                        New Launch
                    </button>
                </div>

                {/* Desktop Right - Updated with search modal */}
                <div className="hidden md:flex items-center gap-6">
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className={`p-2 rounded-full ${isScrolled ? "text-gray-700" : "text-gray-800"} hover:bg-gray-100 transition-colors`}
                    >
                        <FiSearch className="h-6 w-6" />
                    </button>
                    <button className={`p-2 rounded-full ${isScrolled ? "text-gray-700" : "text-gray-800"}`}>
                        <PiHeart className="h-6 w-6" />
                    </button>
                    <button 
                        onClick={() => {
                            navigate('/cart');
                            window.scrollTo(0, 0);
                        }}
                        className={`p-2 rounded-full relative ${isScrolled ? "text-gray-700" : "text-gray-800"} hover:bg-gray-100 transition-colors`}
                    >
                        <TbShoppingCart className="h-6 w-6" />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-purple-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {getCartCount()}
                            </span>
                        )}
                    </button>
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={`p-2 rounded-full ${isScrolled ? "text-gray-700" : "text-gray-800"} hover:bg-gray-100 transition-colors`}
                        >
                            {user ? (
                                <img 
                                    src={profileIcon} 
                                    alt="Profile" 
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                            ) : (
                                <CgProfile className="h-6 w-6" />
                            )}
                        </button>
                        
                        {/* Profile Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                                {user ? (
                                    <>
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                                            <p className="text-xs text-gray-500">{user?.email || ''}</p>
                                        </div>
                                        <Link
                                            to="/my-orders"
                                            onClick={() => setIsProfileOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <FiShoppingBag className="h-4 w-4" />
                                            My Orders
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors w-full text-left"
                                        >
                                            <FiLogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            navigate('/login');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                                    >
                                        <CgProfile className="h-4 w-4" />
                                        Login / Register
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <button 
                        onClick={() => setIsSearchOpen(true)}
                        className={`p-2 rounded-full ${isScrolled ? "text-gray-700" : "text-gray-800"} hover:bg-gray-100 transition-colors`}
                    >
                        <FiSearch className="h-6 w-6" />
                    </button>
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : "text-gray-800"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-start pt-20 gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                navigate(link.path);
                                window.scrollTo(0, 0);
                                setIsMenuOpen(false);
                            }}
                            className="text-gray-800"
                        >
                            {link.name}
                        </button>
                    ))}

                    <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                        New Launch
                    </button>

                    <div className="flex items-center gap-6 mt-8">
                        <button className="p-2 rounded-full text-gray-800">
                            <FiSearch className="h-6 w-6" />
                        </button>
                        <button className="p-2 rounded-full text-gray-800">
                            <PiHeart className="h-6 w-6" />
                        </button>
                        <button 
                            onClick={() => {
                                navigate('/cart');
                                window.scrollTo(0, 0);
                                setIsMenuOpen(false);
                            }}
                            className="p-2 rounded-full relative text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                            <TbShoppingCart className="h-6 w-6" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-purple-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </button>
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    if (user) {
                                        setIsProfileOpen(!isProfileOpen);
                                    } else {
                                        setShowUserLogin(true);
                                        setIsMenuOpen(false);
                                    }
                                }}
                                className="p-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                            >
                                {user ? (
                                    <img 
                                        src={profileIcon} 
                                        alt="Profile" 
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                ) : (
                                    <CgProfile className="h-6 w-6" />
                                )}
                            </button>
                            
                            {/* Mobile Profile Dropdown Menu */}
                            {isProfileOpen && user && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-500">{user?.email || ''}</p>
                                    </div>
                                    <Link
                                        to="/my-orders"
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        <FiShoppingBag className="h-4 w-4" />
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsProfileOpen(false);
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors w-full text-left"
                                    >
                                        <FiLogOut className="h-4 w-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Modal */}
            <SearchModal 
                isOpen={isSearchOpen} 
                onClose={() => setIsSearchOpen(false)} 
            />
        </>
    );
}

export default Navbar;