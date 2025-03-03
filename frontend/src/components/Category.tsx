import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  
  const filterByCategory = (category) => {
    setFilteredProducts(category === "All" ? products : products.filter((p) => p.category === category));
  };

 
  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center p-4 space-x-2 mb-6">
        <select
          onChange={(e) => filterByCategory(e.target.value)}
          className="px-4 py-2 text-xs bg-white border h-8 rounded-md shadow-sm w-35"
        >
          <option value="All">All Categories</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Boots">Boots</option>
          <option value="Sandals">Sandals</option>
          <option value="Loafers">Loafers</option>
          <option value="Sports">Sports</option>
          <option value="Formal">Formal</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:col-2">
        {filteredProducts.map((product) => (
          <Link key={product._id} to={`/view-product/${product._id}`} className="block">
            <div className="relative rounded-lg overflow-hidden w-[500px] shadow-md border-b-0 cursor-pointer ml-12">
              <div
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product._id);
                }}
              >
                <FaHeart className={`transition-colors duration-300 ${favorites[product._id] ? "text-green-500" : "text-gray-300"}`} />
              </div>
              <img src={product.background_image} alt={product.name} className="w-full h-[200px] object-contain" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">Gender: {product.gender}</p>
                <p className="text-gray-600">Price: R{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
