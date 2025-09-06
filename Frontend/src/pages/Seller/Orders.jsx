import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const Orders = () => {
    const { axios } = useAppContext();
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/seller');
            if (data.success) {
                setOrders(data.orders)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(() => {
        fetchOrders()
    }, []);

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-gradient-to-br from-purple-50 via-gray-50 to-blue-50">
            <div className="md:p-10 p-4 space-y-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">📦 Orders List</h2>
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh]">
                        <img src={assets.box_icon} alt="No Orders" className="w-24 h-24 opacity-60 mb-4" />
                        <p className="text-lg text-gray-500 font-medium">No orders yet! When you receive orders, they will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-between gap-6 p-6 bg-white rounded-3xl border border-gray-200  transition duration-200 min-h-[260px] relative"
                            >
                                {/* Order Placed Badge */}
                               

                                {/* Product Details */}
                                <div className="flex gap-4 items-start">
                                    <img className="w-16 h-16 object-cover rounded-lg border border-gray-100 bg-gray-50" src={assets.box_icon} alt="boxIcon" />
                                    <div className="space-y-1 flex-1">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-1">
                                                <span className="font-medium text-gray-700 truncate max-w-[120px]">{item.productId?.name || 'Product not available'}</span>
                                                <span className="text-black font-semibold">x{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="text-xs md:text-sm text-gray-600 space-y-0.5 bg-gray-50 rounded-lg p-3">
                                    <p className="font-semibold text-gray-800">{order.address?.firstName || 'N/A'} {order.address?.lastName || ''}</p>
                                    <p>{order.address?.street || 'N/A'}, {order.address?.city || 'N/A'}</p>
                                    <p>{order.address?.state || 'N/A'}, {order.address?.zipcode || 'N/A'}</p>
                                    <p>{order.address?.country || 'N/A'}</p>
                                    <p className="mt-1 text-gray-500">📞 {order.address?.phone || 'N/A'}</p>
                                </div>

                                {/* Price & Order Info */}
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mt-2">
                                    <div className="text-xl font-extrabold text-purple-600 text-center md:text-left">Rs. {order.amount || 0}</div>
                                    <div className="flex flex-col gap-1 text-xs md:text-sm text-gray-600 min-w-[140px]">
                                        <span className="flex items-center gap-1"><span className="font-semibold">Method:</span> <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold ml-1">{order.paymentType || 'N/A'}</span></span>
                                        <span className="flex items-center gap-1"><span className="font-semibold">Date:</span> <span className="ml-1">{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</span></span>
                                        <span className="flex items-center gap-1">
                                            <span className="font-semibold">Payment:</span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-semibold ${order.isPaid ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                                {order.isPaid ? (
                                                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                ) : (
                                                    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" /></svg>
                                                )}
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders;