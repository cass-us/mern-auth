import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products by filters
export const fetchProductByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({ collection, gender, color, minPrice, maxPrice, sortBy, search, category, brand, limit }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (gender) query.append("gender", gender);
    if (color) query.append("color", color);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (category) query.append("category", category);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);
    if (search) query.append("search", search);

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`);
    return response.data;
  }
);

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/newArrival`);
    return response.data;
  }
);

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
    return response.data.data;
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/similar/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    allProducts: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetching products by filters
      .addCase(fetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handling fetching all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = Array.isArray(action.payload) ? action.payload : []; // Fixed: corrected state assignment
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handling fetching product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handling updating product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handling fetching similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;