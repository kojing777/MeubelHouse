import { v2 as cloudinary } from 'cloudinary'
import Product from '../models/Product.js';

//add product: /api/products/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imagesUrl });
         res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.log(error.message);
         res.json({ success: false, message: error.message });
    }

}

//get all products: /api/product/list
export const productList = async (req, res) => {
    try {
        // If user is admin, return all products
        if (req.isAdmin) {
            const products = await Product.find({});
            return res.json({ success: true, products });
        }
        
        // For regular users, only return in-stock products
        const products = await Product.find({ inStock: true });
        res.json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//get single product : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}





//change product instock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { inStock },
            { new: true } // This ensures we get the updated document
        );
        
        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }
        
        res.json({ 
            success: true, 
            message: "Product stock updated successfully",
            product: updatedProduct 
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}