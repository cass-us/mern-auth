import Product from "../models/product.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const product = req.body;

    // Required Fields Validation
    if (
        !product.name || 
        !product.product_id || 
        !product.category || 
        !product.gender || 
        !product.price || 
        !product.background_image || 
        !product.additional_images || 
        !product.description || 
        !product.quantity || 
        !product.sizes
    ) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product: ", error.message);
        res.status(500).json({ success: false, message: "Error creating product" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error updating product: ", error.message);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product: ", error.message);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product by ID: ", error.message);
        res.status(500).json({ success: false, message: "Error fetching product" });
    }
};
