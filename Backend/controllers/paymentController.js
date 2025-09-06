import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Stripe payment
export const initStripePayment = async (req, res) => {
    try {
        const { items, address } = req.body;
        const { userId } = req;

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: 'Invalid order data' });
        }

        // Calculate amount using items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.json({ success: false, message: `Product not found: ${item.productId}` });
            }
            if (!product.inStock) {
                return res.json({ success: false, message: `Product out of stock: ${product.name}` });
            }
            amount += (product.offerPrice || product.price) * item.quantity;
        }

        // Add tax charge 2%
        amount += Math.floor(amount * 0.02);

        // Create order with pending payment
        const order = await Order.create({
            userId,
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            amount,
            address,
            paymentType: "Online",
            isPaid: false,
            status: "Payment Pending"
        });

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency: "usd",
            metadata: {
                orderId: order._id.toString()
            }
        });

        return res.json({
            success: true,
            message: "Payment initialized",
            clientSecret: paymentIntent.client_secret,
            orderId: order._id
        });
    } catch (error) {
        console.error("Payment initialization error:", error);
        return res.json({ success: false, message: error.message });
    }
};

// Verify Stripe payment
export const verifyStripePayment = async (req, res) => {
    try {
        const { orderId, paymentIntentId } = req.body;
        
        // Update order payment status
        const order = await Order.findByIdAndUpdate(
            orderId,
            { 
                isPaid: true,
                status: "Payment Completed",
                paymentRefId: paymentIntentId
            },
            { new: true }
        );

        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        return res.json({
            success: true,
            message: "Payment verified successfully",
            order
        });
    } catch (error) {
        console.error("Payment verification error:", error);
        return res.json({ success: false, message: error.message });
    }
}; 