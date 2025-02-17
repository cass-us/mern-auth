import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import image1 from "../dumbData/assets/nike-1.png";
import image2 from "../dumbData/assets/nike-2.png";
import image3 from "../dumbData/assets/nike-1.png";
import image4 from "../dumbData/assets/nike-2.png";
import image5 from "../dumbData/assets/nike-1.png";
import image6 from "../dumbData/assets/nike-1.png";

const products = [
  { id: 1, name: "Nike Dunk Hi Retro", price: 1500, category: "Sneakers", size: 10, gender: "Men", image: image1 },
  { id: 2, name: "Nike Dunk Low Retro", price: 1400, category: "Sneakers", size: 9, gender: "Men", image: image2 },
  { id: 3, name: "W Air Force 1 '07 PRM", price: 1600, category: "Sneakers", size: 8, gender: "Women", image: image3 },
  { id: 4, name: "W Nike Dunk Low NN", price: 1300, category: "Sneakers", size: 7, gender: "Women", image: image4 },
  { id: 5, name: "Casual Shoes", price: 1100, category: "Casual", size: 9, gender: "Kids", image: image5 },
  { id: 6, name: "Nike Dunk Hi Retro", price: 1500, category: "Sneakers", size: 10, gender: "Men", image: image6 },
];

const Category = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [favorites, setFavorites] = useState({});

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
    <div className="p-6  min-h-screen">
      <div className="flex justify-center space-x-2 mb-6">
        <select onChange={(e) => filterByCategory(e.target.value)} className="px-4 py-2 text-xs bg-white border h-8 rounded-md shadow-sm w-35">
          <option value="All">All Categories</option>
          <option value="Sneakers">Sneakers</option>
          <option value="Casual">Casual</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/view-product/${product.id}`} className="block">
            <div className="relative rounded-lg overflow-hidden bg-white shadow-sm cursor-pointer">
              <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer" onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product.id);
              }}>
                <FaHeart className={`transition-colors duration-300 ${favorites[product.id] ? "text-red-500" : "text-gray-300"}`} />
              </div>
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">Gender: {product.gender}</p>
                <p className="text-gray-900 font-bold bg-yellow-400 p-2 w-20 mx-auto rounded-md">R{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
