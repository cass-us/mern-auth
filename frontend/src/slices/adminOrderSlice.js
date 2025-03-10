import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching orders");
    }
});

// Update order status
export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus", async ({ id, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `${API_URL}/api/admin/orders/${id}`,
            { status }, // Fixed syntax issue here
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error updating order status");
    }
});

// Delete order
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        });
        return id; // Return the deleted order ID to remove it from state
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error deleting order");
    }
});

const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;

                //calc total


                const totalSales = action.payload.reduce((acc,order)=>{
                    return acc+Provider.totalPrice;
                },0);

                state.totalSales = totalSales;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Update order status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete order
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((order) => order._id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default adminOrderSlice.reducer;
