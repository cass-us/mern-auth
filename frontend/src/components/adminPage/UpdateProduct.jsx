import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editPage, setEditPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${_id}`);
      setProducts(products.filter((product) => product._id !== _id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Error deleting product");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/products/update/${selectedProduct._id}`, selectedProduct);
      setProducts(products.map((product) =>
        product._id === selectedProduct._id ? selectedProduct : product
      ));
      setIsModalOpen(false);
      setEditPage(1);
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Error updating product");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => setEditPage((prev) => prev + 1);
  const handlePreviousPage = () => setEditPage((prev) => prev - 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mx-auto py-4 bg-black opacity-80 rounded-2xl">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Mileage</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Dealer</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2 border ">
                <img src={product.background_image} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="px-4 py-2 border text-white">{product.name}</td>
              <td className="px-4 py-2 border text-white">R{product.price}</td>
              <td className="px-4 py-2 border text-white">{product.mileage} km</td>
              <td className="px-4 py-2 border text-white">{product.location}</td>
              <td className="px-4 py-2 border text-white">{product.dealer.name}</td>
              <td className="px-4 py-2 border text-center">
                <div className="flex">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === i + 1 ? "bg-green-600 text-white" : "bg-gray-200 text-black"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">
                <button className="bg-black w-8 h-8 text-white rounded-md">
                {editPage}
                </button></h2>

            <form onSubmit={(e) => e.preventDefault()}>
              {editPage === 1 && (
                <>
                  <label className="block mb-2">
                    Name:
                    <input
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                      className="w-full p-2 border border-black rounded-2xl"
                    />
                  </label>
                  <label className="block mb-2">
                    Price:
                    <input
                      type="number"
                      value={selectedProduct.price}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                  <label className="block mb-2">
                    Mileage:
                    <input
                      type="number"
                      value={selectedProduct.mileage}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, mileage: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                </>
              )}

              {editPage === 2 && (
                <>
                  <label className="block mb-2">
                    Location:
                    <input
                      type="text"
                      value={selectedProduct.location}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, location: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                  <label className="block mb-2">
                    Dealer Rating:
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={selectedProduct.dealer_rating}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, dealer_rating: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </label>
                </>
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <div>
                  {editPage > 1 && (
                    <button
                      onClick={handlePreviousPage}
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    >
                      Previous
                    </button>
                  )}
                  {editPage < 3 ? (
                    <button
                      onClick={handleNextPage}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
