import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();


  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        //console.log(response);
        if (!response.ok) throw new Error("Failed to fetch product");
        
        const data = await response.json();
        console.log(data)
        if (data.success && data.data) {
          setProduct(data.data);
          setActiveImage(data.data.background_image);
        } else {
          console.error("Product not found in response");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const handleSizeChange = (size) => setSelectedSize(size);
  const handleColorChange = (color) => setSelectedColor(color);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          size: selectedSize,
          color: selectedColor,
          quantity: 1,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300 p-4">
      <div className="bg-white p-6 max-w-4xl w-full">
        <div className="flex">
          <div className="flex flex-col items-center mr-6">
            {product.additional_images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-24 h-40 object-cover mb-4 cursor-pointer rounded-md ${
                  activeImage === image ? "border-2 border-blue-600" : ""
                }`}
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
          <div className="w-full">
            <div className="flex justify-center mb-6">
              <img
                src={activeImage}
                alt={product.name}
                className="w-[250px] object-contain rounded-lg"
              />
            </div>

            <h2 className="text-3xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Gender:</span> {product.gender}
            </p>
            <p className="text-gray-800 font-bold mt-2 text-lg">Price: R{product.price}</p>
            <div className="mt-4">
              <label className="font-semibold text-gray-800">Select Size</label>
              <div className="flex mt-2">
                {product.sizes?.map((size) => (
                  <div
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded-full border-2 border-gray-400 m-2 ${
                      selectedSize === size ? "bg-blue-600 text-white" : "text-gray-800"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="font-semibold text-gray-800">Select Color</label>
              <div className="flex mt-2">
                {product.colors?.map((color) => (
                  <div
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-12 h-12 flex items-center justify-center cursor-pointer rounded-full border-2 border-gray-400 m-2 ${
                      selectedColor === color ? "bg-blue-600 text-white" : "text-gray-800"
                    }`}
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-gray-600 mt-4">
              <span className="font-semibold">Stock:</span> {product.quantity} available
            </p>
            <div className="mt-6 flex space-x-4">
              <button
                className={`w-1/2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${
                  !selectedSize || !selectedColor ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!selectedSize || !selectedColor}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
