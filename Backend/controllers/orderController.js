import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";

//place order cod :/api/order/COD
export const placeOrderCOD = async(req,res)=>{
    try {
        const {items, address} = req.body;
        const {userId} = req;

        if(!address || !items || items.length === 0) {
            return res.json({success: false, message: 'Invalid order data'});
        }

        // Calculate amount using items
        let amount = 0;
        for(const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.json({success: false, message: `Product not found: ${item.productId}`});
            }
            if (!product.inStock) {
                return res.json({success: false, message: `Product out of stock: ${product.name}`});
            }
            amount += (product.offerPrice || product.price) * item.quantity;
        }

        // Add tax charge 2%
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            amount,
            address,
            paymentType: "COD",
            isPaid: false
        });

        // Populate the order with product and address details
        const populatedOrder = await Order.findById(order._id)
            .populate("items.productId")
            .populate("address");

        return res.json({
            success: true,
            message: "Order Placed Successfully",
            order: populatedOrder
        });
    } catch (error) {
        console.error("Order placement error:", error);
        return res.json({success: false, message: error.message});
    }
}
//place order cod :/api/order/STRIPE
export const placeOrderStripe = async(req,res)=>{
    try {
        const {items, address} = req.body;
        const {userId} = req;
        const {origin} = req.headers;

        if(!address || !items || items.length === 0) {
            return res.json({success: false, message: 'Invalid order data'});
        }
        let productData =[];
        // Calculate amount using items
        let amount = 0;
        for(const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.json({success: false, message: `Product not found: ${item.productId}`});
            }
            if (!product.inStock) {
                return res.json({success: false, message: `Product out of stock: ${product.name}`});
            }
            amount += (product.offerPrice || product.price) * item.quantity;
        }

        // Add tax charge 2%
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            amount,
            address,
            paymentType: "online",
            isPaid: false
        });

        //stipte payment intent creation
        const stipeInstance =new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe
        const lineItems = items.map(item => {
            const product = item.productId;
            return {
                price_data: {
                    currency: 'Rs',
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: (product.offerPrice || product.price) * 100, // Convert to paise
                },
                quantity: item.quantity,
            };
        });




        // Populate the order with product and address details
        const populatedOrder = await Order.findById(order._id)
            .populate("items.productId")
            .populate("address");

        return res.json({
            success: true,
            message: "Order Placed Successfully",
            order: populatedOrder
        });
    } catch (error) {
        console.error("Order placement error:", error);
        return res.json({success: false, message: error.message});
    }
}



//get orders by user id :/api/order/user
export const getUserOrders = async(req,res)=>{
    try {
        const {userId} = req;
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"}, {isPaid: true}]
        })
        .populate("items.productId")
        .populate("address")
        .sort({createdAt: -1});

        res.json({success: true, orders});
    } catch (error) {
        console.error("Get user orders error:", error);
        res.json({success: false, message: error.message});
    }
}

//get all order for seller / admin :/api/order/seller
export const getAllOrders= async(req,res)=>{
    try {
        const orders= await Order.find({
            $or: [{paymentType:"COD"},{isPaid:true}]
        }).populate("items.productId address").sort({createdAt:-1});;
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false, message: error.message});
    }

}