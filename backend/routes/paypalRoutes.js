import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // Change for live mode

// Create an order
router.post("/create-order", async (req, res) => {
    try {
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64")}`
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [{ amount: { currency_code: "USD", value: req.body.amount } }]
            })
        });

        const data = await response.json();
        res.json({ orderID: data.id });
    } catch (error) {
        res.status(500).json({ message: "PayPal order creation failed", error });
    }
});

// Capture a payment
router.post("/capture-order", async (req, res) => {
    try {
        const { orderID } = req.body;
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64")}`
            }
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "PayPal payment capture failed", error });
    }
});

export { router as paypalRoutes };
