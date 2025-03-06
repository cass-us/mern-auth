import mongoose from "mongoose";
import Product from "../models/product.js"; 


export const createProduct = async (req, res) => {
    try {
        const {
            name, product_id, category, gender, price, background_image, 
            additional_images, description, quantity, sizes, brand, 
            isFeatured, collections, material, colors, discount
        } = req.body;

     
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: "Unauthorized: User ID required" });
        }

    
        const newProduct = new Product({
            name, product_id, category, gender, price, background_image, additional_images, 
            description, quantity, sizes, brand, isFeatured, collections, material, colors, 
            discount, user: req.user._id
        });

        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Error creating product", error: error.message });
    }
};


export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'name', order = 'asc', search = '' } = req.query;

        const searchQuery = search ? { name: { $regex: search, $options: 'i' } } : {};

        const sortOrder = order === 'desc' ? -1 : 1;
        const sort = { [sortBy]: sortOrder };

        const products = await Product.find(searchQuery)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        if (!products.length) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
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
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ success: false, message: "Error fetching product", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Error updating product", error: error.message });
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
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Error deleting product", error: error.message });
    }
};

export const filterBy = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, gender } = req.query;

       
        const filters = {};

        if (category) {
            filters.category = category;
        }

        if (gender) {
            filters.gender = gender;
        }

        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice); 
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice); 
        }

       
        const products = await Product.find(filters).lean();

        if (!products.length) {
            return res.status(404).json({ success: false, message: "No products found matching your filters" });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error filtering products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const newArrival = async (req, res) => {
    try {
     
          const newArr = await Product.find().sort({createdAt: -1}).limit(8);
          res.json(newArr);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("server error");
      
    }
};
