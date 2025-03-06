import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);
    const token = userInfo?.token || localStorage.getItem("userToken");

    useEffect(() => {
        const fetchCart = async () => {
            if (!token) {
                toast.error("You must be logged in to view your cart.");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/cart/retrieve", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                // Handle the cart data and extract the products and total price
                if (data.success) {
                    setCartItems(data.data.products);  // Assuming data.data.products contains the actual cart items
                } else {
                    toast.error("Failed to load cart items.");
                }
            } catch (err) {
                setError(err.message);
                toast.error(`Error fetching cart: ${err.message}`);
            }
        };

        fetchCart();
    }, [token]);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {error && <p className="text-red-500">{error}</p>} {/* Show error if there is one */}

            {cartItems.length > 0 ? (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.productId} className="cart-item">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <span>{item.name}</span>
                                    </div>
                                    <div>
                                        <span>Quantity: {item.quantity}</span>
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
                        <h3>Total: ${cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</h3>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
