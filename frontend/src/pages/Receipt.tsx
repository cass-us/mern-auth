import React, { useState } from 'react';
import logo from "../components/assets/logo2.png";
import { jsPDF, ShadingPattern } from 'jspdf';


const sendReceiptByEmail = (receiptData: any) => {
  
  console.log("Sending receipt to email:", receiptData);
 
};

const Receipt = () => {
  const [orderDetails, setOrderDetails] = useState({
    items: [
      { name: "Item 1", price: 20 },
      { name: "Item 2", price: 30 },
    ],
    totalPrice: 50,
  });

  const companyAddress = "123 Company St, Business City, 12345, Country";
  const yourAddress = "700 Steve Biko Rd, Wonderboom South, Pretoria, 0084, South Africa";
  const companyLogo =logo; 
  const handlePrintReceipt = () => {
    window.print(); 
  };

  const handleSendEmail = () => {
    sendReceiptByEmail({
      companyAddress,
      yourAddress,
      companyLogo,
      orderDetails,
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    
    doc.addImage(companyLogo, 'PNG', 10, 10, 50, 50);
    doc.setFontSize(8);
    doc.text('Receipt', 70, 20);
    

    doc.setFontSize(12);
    doc.text(companyAddress, 10, 70);
    doc.text(`Customer Address: ${yourAddress}`, 10, 80);
    

    let y = 100;
    orderDetails.items.forEach((item) => {
      doc.text(`${item.name}: $${item.price}`, 10, y);
      y += 10;
    });

    
    doc.text(`Total: $${orderDetails.totalPrice}`, 10, y + 10);

    doc.save('receipt.pdf');
  };

  return (
    <div className='bg-blue-300'>
      <header>
        <img src={companyLogo} alt="Company Logo" />
        <h1>Receipt</h1>
        <p>{companyAddress}</p>
      </header>
      <section>
        <h3>Order Details</h3>
        <p>Customer Address: {yourAddress}</p>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              {item.name}: R{item.price}
            </li>
          ))}
        </ul>
        <h4>Total: R{orderDetails.totalPrice}</h4>
      </section>
      <footer>
        <button onClick={handlePrintReceipt}>Print Receipt</button>
        <button onClick={handleSendEmail}>Send Receipt to Email</button>
        <button onClick={handleDownloadPDF}>Download Receipt as PDF</button>
      </footer>
    </div>
  );
};

export default Receipt;
