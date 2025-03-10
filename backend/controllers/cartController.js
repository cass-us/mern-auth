import Cart from '../models/Cart.js';
import Product from '../models/product.js';


export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, color } = req.body;
        const userId = req.user ? req.user._id : null; 

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        let cart = await Cart.findOne({ user: userId }) || await Cart.findOne({ guestId: req.cookies.guestId });

        if (!cart) {
            cart = new Cart({
                user: userId || undefined,
                guestId: req.cookies.guestId,
                products: [],
                totalPrice: 0,
            });
        }

        
        const existingProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);

        if (existingProductIndex > -1) {
    
            cart.products[existingProductIndex].quantity += quantity;
        } else {
    
            const newCartItem = {
                productId,
                name: product.name,
                image: product.background_image,
                price: product.price,
                color,
                quantity,
            };
            cart.products.push(newCartItem);
        }

        
        cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

       
        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ success: false, message: "Error adding product to cart", error: error.message });
    }
};


export const updateCartQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user ? req.user._id : null;
      
        const cart = await Cart.findOne({ user: userId }) || await Cart.findOne({ guestId: req.cookies.guestId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

      
        const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not in cart" });
        }

 
        cart.products[productIndex].quantity = quantity;

        
        cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

      
        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        res.status(500).json({ success: false, message: "Error updating cart", error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user ? req.user._id : null; 
       
        const cart = await Cart.findOne({ user: userId }) || await Cart.findOne({ guestId: req.cookies.guestId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        
        cart.products = cart.products.filter(item => item.productId.toString() !== productId);

       
        cart.totalPrice = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

      
        await cart.save();

        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({ success: false, message: "Error removing product from cart", error: error.message });
    }
};


export const getCart = async (req, res) => {
    try {
        // Check if there's a user ID or guest ID
        const userId = req.user ? req.user._id : null; 
        const guestId = req.cookies.guestId || null;

        console.log("User ID:", req.userId);
        console.log("Guest ID:", guestId);

        // If both userId and guestId are null, return an error
        if (!userId && !guestId) {
            return res.status(400).json({ success: false, message: "User ID and Guest ID are both missing." });
        }

        // Query for the cart based on userId or guestId
        const cart = await Cart.findOne({ user: userId }) || await Cart.findOne({ guestId: guestId });

        // Check if cart is found
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Respond with the cart data
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, message: "Error fetching cart", error: error.message });
    }
};


export const clearCart = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null; 
       
        const cart = await Cart.findOne({ user: userId }) || await Cart.findOne({ guestId: req.cookies.guestId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

      
        cart.products = [];
        cart.totalPrice = 0;

       
        await cart.save();

        res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ success: false, message: "Error clearing cart", error: error.message });
    }
};
