import React, { useEffect, useRef } from "react";

const PayPal = () => {
    const paypal = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const addPayPalScript = async () => {
            if (window.paypal && paypal.current?.childNodes.length === 0) {
                renderPayPalButtons();
                return;
            }

            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=ASCSXrjWougQ6HvrZt8O6GbdHfgnfjY0g1aYK0KIClsGqVMLPIWa3KVJKLe-k-fQiBghqVTYnU7lebnK"; // Replace with actual client ID
            script.async = true;
            script.onload = () => renderPayPalButtons();
            document.body.appendChild(script);
        };

        const renderPayPalButtons = () => {
            if (paypal.current) {
                paypal.current.innerHTML = ""; 
                window.paypal.Buttons({
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    description: "Nike-800",
                                    amount: {
                                        currency_code: "USD",
                                        value: "13",
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        console.log("Data: ", data);
                        console.log("Actions: ", actions);
                        const order = await actions.order.capture();
                        console.log("Order Captured: ", order);
                    },
                    onError: (err) => {
                        console.error("PayPal Error: ", err);
                    },
                }).render(paypal.current);
            }
        };

        addPayPalScript();
    }, []);

    return <div ref={paypal}></div>;
};

export default PayPal;
