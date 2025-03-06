import express from "express";
import Checkout from "../models/checkout.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

export const createCheckout = async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    console.log(checkoutItems);

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }
    //const totalPrice = checkoutItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            quantity: checkoutItems.quantity,
            CheckItem: checkoutItems, 
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(200).json(newCheckout);
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ message: "Server error" });
    }
};

import mongoose from "mongoose";

export const updateCheckout = async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    const checkoutId = req.params.id;


    if (!mongoose.Types.ObjectId.isValid(checkoutId)) {
        return res.status(400).json({ message: "Invalid checkout ID" });
    }

    try {
        const foundCheckout = await Checkout.findById(checkoutId);
        if (!foundCheckout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (!foundCheckout.isPaid) {
            foundCheckout.isPaid = true;
            foundCheckout.paymentStatus = paymentStatus;
            foundCheckout.paymentDetails = paymentDetails;
            foundCheckout.paidAt = Date.now();

            await foundCheckout.save();
            return res.status(200).json(foundCheckout);
        } else {
            return res.status(400).json({ message: "Checkout already marked as paid" });
        }
    } catch (error) {
        console.error("Error updating checkout:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export const finalizeCheckout = async (req, res) => {
    try {
        const foundCheckout = await Checkout.findById(req.params.id);

        if (!foundCheckout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (foundCheckout.isPaid && !foundCheckout.isFinalized) {
            const finalOrder = await Order.create({
                user: foundCheckout.user,
                orderItems: foundCheckout.CheckItem, 
                shippingAddress: foundCheckout.shippingAddress,
                paymentMethod: foundCheckout.paymentMethod,
                totalPrice: foundCheckout.totalPrice,
                isPaid: true,
              
                paidAt: foundCheckout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: foundCheckout.paymentDetails,
            });

            
            foundCheckout.isFinalized = true;
            foundCheckout.finalizedAt = Date.now();
            await foundCheckout.save();

            await Cart.findOneAndDelete({ user: foundCheckout.user });

            res.status(201).json({ finalOrder });
        } else if (foundCheckout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid yet" });
        }
    } catch (error) {
        console.error("Error finalizing checkout:", error);
        res.status(500).json({ message: "Server error" });
    }
};
