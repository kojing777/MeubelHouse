import React, { useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import { useParams, Link } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCart from '../Components/ProductCart';
import { FiFilter, FiX } from 'react-icons/fi';
import { FaSort } from 'react-icons/fa';
import shop from '../assets/shop.JPG';
import logo from '../assets/MeubelLogo.png';
import { MdArrowForwardIos } from 'react-icons/md';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
    const [inStockOnly, setInStockOnly] = useState(false);

    const searchCategory = categories.find((item) => 
        item.path.toLowerCase() === category
    );
    
    let filteredProducts = searchCategory 
        ? products.filter((product) => 
            product.category.toLowerCase() === category
          )
        : [];

    // Apply filters
    filteredProducts = filteredProducts.filter(product => {
        const price = product.offerPrice || product.price;
        const matchesPrice = price >= priceRange.min && price <= priceRange.max;
        const matchesStock = !inStockOnly || product.inStock;
        return matchesPrice && matchesStock;
    });

    // Apply sorting
    switch (sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#f6eeee] to-white'>
            {/* Hero Section */}
            {searchCategory && (
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
                        <h1 className="text-5xl font-bold mb-2">{searchCategory.text}</h1>
                        <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
                            <Link to="/" className="hover:text-black font-bold transition">
                                Home
                            </Link>
                            <span><MdArrowForwardIos className="font-bold text-white" /></span>
                            <span className="text-white hover:text-black">{searchCategory.text}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className='max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Filters and Sort Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <FiFilter />
                            <span>Filters</span>
                        </button>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="appearance-none pl-4 pr-10 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <option value="default">Sort by: Featured</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                            <FaSort className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <p className="text-gray-600">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-slideDown">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Filters</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-3">Price Range</h4>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                                        className="w-24 px-3 py-2 border rounded-lg"
                                        placeholder="Min"
                                    />
                                    <span>to</span>
                                    <input
                                        type="number"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                                        className="w-24 px-3 py-2 border rounded-lg"
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            <div>
                                <h4 className="font-medium mb-3">Availability</h4>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={inStockOnly}
                                        onChange={(e) => setInStockOnly(e.target.checked)}
                                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                    />
                                    <span>In Stock Only</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="transform transition-all duration-300 hover:-translate-y-1">
                                <ProductCart product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-sm'>
                        <div className="text-center p-8">
                            <h3 className='text-2xl font-semibold text-gray-800 mb-2'>No Products Found</h3>
                            <p className="text-gray-600 mb-6">
                                {searchCategory 
                                    ? `We couldn't find any products in the ${searchCategory.text} category matching your filters.`
                                    : "The requested category was not found."}
                            </p>
                            <button
                                onClick={() => {
                                    setSortBy('default');
                                    setPriceRange({ min: 0, max: 100000 });
                                    setInStockOnly(false);
                                }}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCategory