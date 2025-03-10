import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters, fetchAllProducts } from "../slices/productSlice.js";

const Category = () => {
  const dispatch = useDispatch();
  const { allProducts, loading, error } = useSelector((state) => state.products);
  const [favorites, setFavorites] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  // Initial fetch of all products
  useEffect(() => {
    if (!allProducts.length && !searchTerm && !sortOption) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, allProducts.length]);

  // Fetch with filters when search or sort changes
  useEffect(() => {
    if (searchTerm || sortOption) {
      dispatch(fetchProductByFilters({
        search: searchTerm,
        sortBy: sortOption,
      }));
    }
  }, [dispatch, searchTerm, sortOption]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
 console.log(sortOption);
 console.log(searchTerm);
  return (
    <div className="min-h-screen p-4">
      {/* Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="w-full md:w-1/4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
          <option value="createdAt_desc">Newest First</option>
          <option value="createdAt_asc">Oldest First</option>
        </select>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : allProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product, index) => (
            <div 
              key={product._id || product.product_id || index} 
              className="flex justify-center"
            >
              <Link 
                to={`/view-product/${product._id || product.product_id}`} 
                className="block w-full max-w-sm"
              >
                <div className="relative rounded-lg overflow-hidden shadow-md border hover:shadow-lg transition-shadow">
                  <div
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(product._id || product.product_id);
                    }}
                  >
                    <FaHeart
                      className={`transition-colors duration-300 ${
                        favorites[product._id || product.product_id] 
                          ? "text-red-500" 
                          : "text-gray-300"
                      }`}
                    />
                  </div>
                  <img
                    src={product.background_image || "/placeholder-image.jpg"}
                    alt={product.name || `Product ${index}`}
                    className="w-full h-[200px] object-contain bg-white"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name || "Unnamed Product"}
                    </h3>
                    <p className="text-gray-600">
                      Gender: {product.gender || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Price: R{product.price?.toFixed(2) || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Category: {product.category || "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default Category;