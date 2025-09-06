import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import logo from "../assets/MeubelLogo.png";
import shop from "../assets/shop.jpg";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const Cart = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        product.quantity = cartItems[key];
        tempArray.push(product);
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      if (!user) return;
      
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        const validAddresses = Array.isArray(data.addresses) ? data.addresses : [];
        setAddresses(validAddresses);
        setSelectedAddress(validAddresses[0] || null);
      } else {
        toast.error(data.message || "Failed to load addresses");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("Address fetch error:", error);
    }
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select an address");
        return;
      }

      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress,
          paymentOption,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        // Online payment
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
          paymentOption,
        });

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("Order placement error:", error);
    }
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [cartItems, products]);

  useEffect(() => {
    getUserAddress();
  }, [user]);

  if (!products.length || !cartItems) return null;

  return products.length > 0 && cartItems ? (
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
          <h1 className="text-5xl font-bold mb-2">Cart</h1>
          <div className="flex flex-wrap mb-8 items-center justify-center space-x-2 text-lg font-medium">
            <Link to="/" className="hover:text-black font-bold transition">
              Home
            </Link>
            <span><MdArrowForwardIos className="font-bold text-white" /></span>
            <span className="text-white hover:text-black">Cart</span>
          </div>
        </div>
      </div>
    <div className="max-w-7xl mx-auto mt-20 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Shopping Cart
              <span className="ml-2 text-sm text-purple-600 bg-primary/10 px-2 py-0.5 rounded">
                {getCartCount()} Items
              </span>
            </h1>
            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="flex items-center gap-2 text-purple-500 hover:text-purple-500/80 transition-colors"
            >
              <FaLongArrowAltLeft />
              Continue Shopping
            </button>
          </div>

          <div className=" bg-[#fff9e5] rounded-lg border border-gray-200 overflow-hidden">
            <div className="hidden bg-[#fff9e5] md:grid grid-cols-[2fr_1fr_1fr] text-gray-600 text-sm font-medium p-4  border-b">
              <p>Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartArray.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 p-4 border-b last:border-0 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => {
                      navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                      scrollTo(0, 0);
                    }}
                    className="cursor-pointer w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden hover:border-purple-600/50 transition-colors"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={product.image[0]}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-1">{product.name}</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Weight: {product.weight || "N/A"}</p>
                      <div className="flex items-center gap-2">
                        <p>Quantity:</p>
                        <select 
                          onChange={e => updateCartItem(product._id, Number(e.target.value))}
                          value={cartItems[product._id]}
                          className="border border-gray-200 rounded px-2 py-1 outline-none focus:border-purple-600 transition-colors  "
                        >
                          {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 10)
                            .fill("")
                            .map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex md:justify-center items-center">
                  <p className="font-medium text-gray-800">Rs. {product.offerPrice * product.quantity}</p>
                </div>
                
                <div className="flex md:justify-center items-center">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <img
                      src={assets.remove_icon}
                      alt="remove"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-[380px] bg-[#fff9e5] w-full">
          <div className="rounded-lg border border-gray-200 p-6 sticky top-24">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-medium text-gray-700">Delivery Address</p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-purple-600  text-lg hover:underline"
                >
                  Change
                </button>
              </div>
              
              <div className="relative">
                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm text-gray-600">
                    {selectedAddress
                      ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                      : "No Address Found"}
                  </p>
                </div>

                {showAddress && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded border border-gray-200 shadow-sm z-10">
                    {addresses.map((address, index) => (
                      <div
                        key={index}
                        onClick={() => {setSelectedAddress(address); setShowAddress(false)}}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-0"
                      >
                        <p className="text-sm text-gray-600">
                          {address.street}, {address.city}, {address.state}, {address.country}
                        </p>
                      </div>
                    ))}
                    <div
                      onClick={() => navigate("/add-address")}
                      className="p-3 text-purple-500 text-center cursor-pointer hover:bg-primary/5 font-medium"
                    >
                      + Add New Address
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="text-lg font-medium text-gray-700 mb-2">Payment Method</p>
                <select 
                  onChange={e => setPaymentOption(e.target.value)}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-gray-700 focus:border-black outline-none"
                >
                  <option value="COD">Cash On Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-gray-600">
                <span className="text-lg">Subtotal</span>
                <span>Rs. {getCartAmount()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-lg">Shipping</span>
                <span className="text-purple-600 text-lg">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-lg">Tax (2%)</span>
                <span>Rs. {(getCartAmount() * 2 / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-800 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span>Rs. {(getCartAmount() + getCartAmount() * 2 / 100).toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={placeOrder}
              className="w-full mt-6 bg-purple-400 text-white font-medium py-3 rounded hover:bg-purple-600/90 transition-colors"
            >
              {paymentOption === "COD"
                ? "Place Order (Cash On Delivery)"
                : "Pay Now (Online Payment)"}
            </button>
          </div>
        </div>
      </div>
    </div>
     <div className="bg-[#faf4f4] py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-start">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Free Delivery</h3>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl">For all orders over $50, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">90 Days Return</h3>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl">If goods have problems, consectetur adipim scing elit.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Secure Payment</h3>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl">100% secure payment, consectetur adipim scing elit.</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Cart;
