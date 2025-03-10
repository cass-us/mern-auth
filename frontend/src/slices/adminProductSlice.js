import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Fetch admin products
export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/products`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`, // Retrieve token dynamically
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error fetching products");
    }
});

// Create a new product
export const createProduct = createAsyncThunk("adminProducts/createProduct", async (productData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/products`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error creating product");
    }
});

// Update product
export const updateProduct = createAsyncThunk("adminProducts/updateProduct", async ({ id, productData }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/products/${id}`, productData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error updating product");
    }
});

// Delete product
export const deleteProduct = createAsyncThunk("adminProducts/deleteProduct", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/api/admin/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
            },
        });
        return id;
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.response?.data || "Error deleting product");
    }
});

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter((product) => product._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default adminProductSlice.reducer;
