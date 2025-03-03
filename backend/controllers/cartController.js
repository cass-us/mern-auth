import Product from "../models/product.js";
import Cart from "../models/Cart.js";
import mongoose from "mongoose";


export const addToCart = async (req, res) => {
    try {
        console.log('Request Body:', req.body);  

        const userId = req.user._id;
        const { productId, quantity } = req.body;

        console.log('User ID:', userId); 
        console.log('Product ID:', productId); 

        const product = await Product.findById(productId);
        if (!product) {
            console.error('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }

        console.log('Product Details:', product);  
    
        res.status(201).json({ success: true, message: 'Product added to cart' });

    } catch (error) {
        console.error("Error adding to cart:", error);  
        res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
    }
};


export const getCart = async (req, res) => {

  console.log(req.body)
  try {
      if (!req.user._id) {
          return res.status(401).json({ message: "User not authenticated" });
      }

      const userId = req.user._id;
      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      res.json(cart);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
          return res.status(404).json({ success: false, message: "Cart not found" });
      }

      const itemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === productId.toString()
      );

      if (itemIndex === -1) {
          return res.status(404).json({ success: false, message: "Item not found in cart" });
      }

      cart.items.splice(itemIndex, 1);
      await cart.save();

      res.status(200).json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ success: false, message: "Error removing item from cart" });
  }
};
