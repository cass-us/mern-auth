import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItemQuantity } from "../slices/cartSlice.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";  // To link to product details page

const Cart = () => {
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    const token = userInfo?.token || localStorage.getItem("userToken");
    const guestId = localStorage.getItem("guestId");

    useEffect(() => {
        if (token || guestId) {
            dispatch(fetchCart({ userId: userInfo?._id, guestId }));
        } else {
            toast.error("You must be logged in to view your cart.");
        }
    }, [dispatch, token, guestId, userInfo]);

    const handleIncreaseQuantity = (productId) => {
        const updatedCart = cart.products.map(item => 
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        dispatch(updateCartItemQuantity({ cartId: cart._id, updatedCart }));
    };

    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cart.products.map(item => 
            item.productId === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        dispatch(updateCartItemQuantity({ cartId: cart._id, updatedCart }));
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {cart?.products?.length > 0 ? (
                <div>
                    <ul>
                        {cart.products.map((item) => (
                            <li key={item.productId} className="cart-item">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                                        <Link to={`/product/${item.productId}`} className="text-blue-500">
                                            <span>{item.name}</span>
                                        </Link>
                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleDecreaseQuantity(item.productId)}
                                            className="bg-gray-300 p-1 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">Quantity: {item.quantity}</span>
                                        <button
                                            onClick={() => handleIncreaseQuantity(item.productId)}
                                            className="bg-gray-300 p-1 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div>
                                        <span>Price: ${item.price}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* Display total price */}
                    <div className="total-price mt-4">
                        <h3>Total: ${cart.products.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</h3>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
