import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {  removeFromCart } from '../controllers/cartController.js';
import Product from '../models/product.js';
import Cart from '../models/Cart.js';
const router = express.Router();

// Route to add an item to the cart, requires authentication
const getCart = async(userId,guestId) =>{
    console.log("user id :",userId ,"guest id: ",guestId);
    if(userId){
        console.log("user id :",userId ,"guest id: ",guestId);
        return await Cart.findOne({User: userId});

    }else if(guestId){
        return await Cart.findOne({guestId: guestId});
    }
    return null;
}

router.post("/", async (req, res) => {
    try {
        const { productId, quantity, color, size, guestId, userId } = req.body;

        // Find product in the database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Fetch existing cart for user or guest
        let cart = await Cart.findOne({ user: userId }) || await Cart.findOne({ guestId });

        if (cart) {
            // Check if the product already exists in the cart
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId && p.size === size && p.color === color
            );

            if (productIndex > -1) {
             
                cart.products[productIndex].quantity += quantity;
            } else {
               
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.background_image,
                    price: product.price,
                    color,
                    size,
                    quantity,
                });
            }
        } else {
            
            cart = await Cart.create({
                userId: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.background_image,
                        price: product.price,
                        color,
                        size,
                        quantity,
                    }
                ],
            });
        }

        // Recalculate total price
        cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Save the cart
        await cart.save();

        return res.status(200).json({ success: true, data: cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});

router.get('/', async (req, res) => {
    const { userId, guestId } = req.query;

    console.log(" /: user id :",userId ,"guest id: ",guestId);
    try {
        const cart = await getCart(userId, guestId); // Ensure getCart handles req and res properly

        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// Route to remove an item from the cart, requires authentication
router.delete('/', protect, removeFromCart);

export default router;
