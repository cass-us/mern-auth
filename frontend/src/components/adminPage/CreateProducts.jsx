import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        navigate("/products");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleChange} required />
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} required />
        </label>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProducts;
