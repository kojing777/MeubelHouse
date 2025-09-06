
import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import delivery from "../assets/delivery.png";
import { FiUser, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const InputField = ({ type, placeholder, name, handleChange, address, icon }) => (
  <div className="relative">
    {icon && (
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
        {icon}
      </span>
    )}
    <input
      className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-200 rounded-lg outline-none text-gray-700 placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/30 transition-all duration-200 bg-white/90`}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  </div>
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { 
    if (!user) {
      navigate("/cart");
    }
  }, []);

  // Scroll to top when this page is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
    <div className="min-h-screen mt-15  flex items-center justify-center py-8 px-2 sm:px-0">
      <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <div className="bg-white/90 rounded-3xl  p-4 sm:p-8 md:p-12 flex flex-col lg:flex-row gap-10 md:gap-16 items-center">
          {/* Form Section (always left) */}
          <div className="flex-1 w-full max-w-xl order-2 lg:order-1">
            <div className="text-center mb-8">
             
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
                Add Shipping <span className="text-purple-600 relative">Address
                  <span className="absolute left-0 -bottom-2 w-full h-1 bg-purple-200 rounded-full"></span>
                </span>
              </h1>
              <p className="mt-3 text-gray-600 text-base md:text-lg">Please fill in your delivery details below</p>
            </div>
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  icon={<FiUser className="w-5 h-5" />}
                />
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  icon={<FiUser className="w-5 h-5" />}
                />
              </div>
              <InputField
                handleChange={handleChange}
                address={address}
                name="email"
                type="email"
                placeholder="Email Address"
                icon={<FiMail className="w-5 h-5" />}
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="street"
                type="text"
                placeholder="Street Address"
                icon={<FiMapPin className="w-5 h-5" />}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="city"
                  type="text"
                  placeholder="City"
                  icon={<FiMapPin className="w-5 h-5" />}
                />
                {/* State Dropdown for Nepal */}
                <div className="relative">
                  <select
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none text-gray-700 bg-white/90 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/30 transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="">Select State/Province</option>
                    <option value="Koshi">Koshi</option>
                    <option value="Madhesh">Madhesh</option>
                    <option value="Bagmati">Bagmati</option>
                    <option value="Gandaki">Gandaki</option>
                    <option value="Lumbini">Lumbini</option>
                    <option value="Karnali">Karnali</option>
                    <option value="Sudurpashchim">Sudurpashchim</option>
                  </select>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
                    <FiMapPin className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  handleChange={handleChange}
                  address={address}
                  name="zipcode"
                  type="text"
                  placeholder="Zip/Postal Code"
                  icon={<FiMapPin className="w-5 h-5" />}
                />
                {/* Country Dropdown */}
                <div className="relative">
                  <select
                    name="country"
                    value={address.country}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none text-gray-700 bg-white/90 focus:border-purple-400 focus:ring-2 focus:ring-purple-200/30 transition-all duration-200 appearance-none"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="Nepal">Nepal</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
                    <FiMapPin className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <InputField
                handleChange={handleChange}
                address={address}
                name="phone"
                type="tel"
                placeholder="Phone Number"
                icon={<FiPhone className="w-5 h-5" />}
              />
              <button
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3.5 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg text-lg tracking-wide"
                type="submit"
              >
                Save Address
              </button>
            </form>
          </div>
          {/* Image Section (always right) */}
          <div className="flex-1 w-full max-w-md order-1 lg:order-2 mb-6 lg:mb-0 flex justify-center items-center">
            <div className="relative w-full">
              <img
                src={delivery}
                alt="delivery illustration"
                className="w-full h-auto object-contain drop-shadow-2xl max-h-[400px] md:max-h-[480px] lg:max-h-[520px]"
              />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      `}</style>
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

export default AddAddress;
