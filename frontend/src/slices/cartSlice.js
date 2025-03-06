import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/cart";
const PRODUCT_API_URL = "http://localhost:5000/api/products";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token") || ""; // Ensure token is a string

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "", // Avoid invalid header format
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }

        const result = await response.json();
        const data = result?.data;

        if (!data || !Array.isArray(data.items)) {
            throw new Error("Invalid cart data");
        }

        // Fetch product details
        const itemsWithDetails = await Promise.all(
            data.items.map(async (item) => {
                if (!item.productId) return null;

                try {
                    const productResponse = await fetch(`${PRODUCT_API_URL}/${item.productId}`);
                    if (!productResponse.ok) return null;
                    
                    const product = await productResponse.json();
                    return {
                        id: item._id,
                        productId: item.productId,
                        name: product.name || "Unknown",
                        price: product.price || 0,
                        image: product.image || "",
                        quantity: item.quantity,
                    };
                } catch {
                    return null; // Prevent crashes if fetching product fails
                }
            })
        );

        return itemsWithDetails.filter(item => item !== null);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        status: "idle",
        error: null,
    },
    reducers: {
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                state.totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.quantity, 0);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
