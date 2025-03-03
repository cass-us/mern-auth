import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState(null);

    const { userInfo } = useSelector((state) => state.auth);
    const token = userInfo?.token || localStorage.getItem("token"); 
    useEffect(() => {
        const fetchCart = async () => {
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
                setCartItems(data);
            } catch (err) {
                setError(err.message);

                if (!error) {
                    toast.error(`Error fetching cart: ${err.message}`);
                }
            }
        };

        if (token) {
            fetchCart();
        } else { 
            if (!error) {
                toast.error("You must be logged in to view your cart.");
            }
        }
    }, [token, error]); 
    return (
        <div>
            <h2>Your Cart</h2>
            {error ? <p className="text-red-500">{error}</p> : null}
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>{item.name} - ${item.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
