import React, { useState } from "react";
import suggest1 from "../dumbData/assets/NIKE+DUNK+LOW+RETRO.png";
import suggest2 from "../dumbData/assets/W+NIKE+DUNK+LOW+NN.png";
import suggest3 from "../dumbData/assets/nike-1.png";

const Order: React.FC = () => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([
    { id: 1, name: "Sneakers", brand: "Nike", image: "https://i8.amplience.net/i/jpl/jd_343799_a?qlt=92", price: 100, quantity: 1 },
    { id: 2, name: "Boots", brand: "Adidas", image: "https://m.media-amazon.com/images/I/71KQ5b5n6fL._AC_UL1500_.jpg", price: 150, quantity: 1 },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section>
      <div className="flex text-center justify-center space-x-8 mb-4 bg-black text-green-600 p-4 ">
        <h1 className="text-2xl text-white ml-8">SneakerFactory</h1>
        <button onClick={() => setStep(1)} className={step === 1 ? "font-bold" : "text-white"}>Order</button>
        <button onClick={() => setStep(2)} className={step === 2 ? "font-bold" : "text-white"}>Shipping</button>
        <button onClick={() => setStep(3)} className={step === 3 ? "font-bold" : "text-white"}>Payment</button>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Order</h2>
            <div>
              {items.map((item) => (
                <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                  <div className="flex items-center justify-between">
                    <img src={item.image} alt={item.name} className="w-[100px] h-[150px]" />
                    <div className="flex items-center">
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2">+</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2">-</button>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-semibold">{item.name}</span>
                      <p className="text-sm text-gray-600">{item.brand}</p>
                    </div>
                    <span>R{item.price}</span>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">Remove</button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Delivery Free | Free exchange or return within 30 days</p>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-bold mt-4">Total: R{total}</h3>
            <button onClick={() => setStep(2)} className="w-full bg-green-600 text-white p-2 rounded-md mt-4">Checkout..</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
            <input type="text" placeholder="Full Name" className="w-full p-2 mb-2 border" />
            <input type="text" placeholder="Address" className="w-full p-2 mb-2 border" />
            <input type="text" placeholder="City" className="w-full p-2 mb-2 border" />
            <input type="text" placeholder="Postal Code" className="w-full p-2 mb-2 border" />
            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(1)} className="bg-gray-300 p-2 rounded">Back</button>
              <button onClick={() => setStep(3)} className="bg-blue-500 text-white p-2 rounded">Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            <input type="text" placeholder="Card Number" className="w-full p-2 mb-2 border" />
            <input type="text" placeholder="Expiry Date" className="w-full p-2 mb-2 border" />
            <input type="text" placeholder="CVV" className="w-full p-2 mb-2 border" />
            <div className="flex justify-between mt-4">
              <button onClick={() => setStep(2)} className="bg-gray-300 p-2 rounded">Back</button>
              <button className="bg-green-500 text-white p-2 rounded">Pay Now</button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-8 shadow-md p-4"> 
        <h2 className="text-center mb-2 text-lg font-semibold">You May Also Like</h2>
        <div className="flex justify-center gap-4">
          <img src={suggest1} className="w-24 rounded-md shadow" />
          <img src={suggest2} className="w-24 rounded-md shadow" />
          <img src={suggest3} className="w-24 rounded-md shadow" />
        </div>
      </div>
    </section>
  );
};

export default Order;
