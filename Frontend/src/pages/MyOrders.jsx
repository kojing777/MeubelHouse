import React, { useState, useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";
import { FaMoneyCheckAlt, FaCalendarAlt, FaBoxOpen } from 'react-icons/fa';

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="min-h-screen mt-18 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col items-start mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 tracking-tight">My Orders</h1>
          <div className="w-20 h-1 bg-purple-500 rounded-full mb-2"></div>
          <p className="text-gray-600 text-lg font-medium">Track your recent purchases and order status</p>
        </div>

        {myOrders.length > 0 ? (
          <div className="space-y-8">
            {myOrders.map((order, index) => (
              <div
                key={index}
                className="bg-[#f7f0f0] rounded-2xl shadow-sm   p-6"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <FaBoxOpen className="text-purple-500" />
                    <span className="font-semibold text-gray-700">Order ID:</span> <span className="break-all">{order._id}</span>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      <FaMoneyCheckAlt className="text-purple-400" /> {order.paymentType || 'N/A'}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Total: Rs. {order.amount || 0}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-green-200 text-green-800' : order.status === 'Cancelled' ? 'bg-red-200 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>Status: {order.status || 'Processing'}</span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                      <FaCalendarAlt className="text-blue-400" />
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-6"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="bg-purple-200/10 p-3 rounded-lg flex-shrink-0">
                          <img
                            src={item.productId?.image?.[0] || '/placeholder-image.png'}
                            alt={item.productId?.name || 'Product'}
                            className="w-20 h-20 object-cover rounded-lg shadow"
                          />
                        </div>
                        <div className="min-w-0">
                          <h2 className="text-lg font-semibold text-gray-800 truncate">{item.productId?.name || 'Product not available'}</h2>
                          <p className="text-gray-500 text-sm">Category: {item.productId?.category || 'N/A'}</p>
                          <p className="text-gray-500 text-sm">Quantity: <span className="font-medium text-gray-700">{item.quantity || 1}</span></p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 min-w-[120px]">
                        <span className="text-black text-lg font-bold">Rs. {(item.productId?.offerPrice || 0) * (item.quantity || 1)}</span>
                        <span className="text-xs text-gray-400">Unit: Rs. {item.productId?.offerPrice || 0}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <img src="/empty-orders.svg" alt="No orders" className="w-40 h-40 mb-6 opacity-80" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Orders Found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <a href="/" className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">Start Shopping</a>
          </div>
        )}
      </div>
      <div className="bg-[#faf4f4] py-16 mt-10">
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

export default MyOrders;
