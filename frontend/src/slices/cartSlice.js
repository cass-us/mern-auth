import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to local storage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            console.log(userId);
            console.log(guestId);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/retrieve`, {
                params: { userId, guestId },
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || "Error fetching cart");
        }
    }
);

// Add to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || "Error adding to cart");
        }
    }
);

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ productId, quantity, guestId,userId , size , color}, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${cartItemId}`, {
                productId,

                quantity,

                guestId,

                userId,
                size,
                color,
            });

            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || "Error updating cart item");
        }
    }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId,guestId, userId,size, color }, { rejectWithValue }) => {
        try {
         const response =   await axios({

                method:"DELETE",
                url:`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                 data:{ productId,
                  guestId,
                  userId,
                  size,
                  color
          },});
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || "Error removing from cart");
        }
    }
);
// merge guest cart into user cart

export const mergeCart = createAsyncThunk("cart/mergeCart",async({guestId,user},{rejectWithValue})=>{
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {guestId,user},
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },

        }
      );
      return response.data;
    }catch(error){
        return rejectWithValue(error.response.data);
    }
});




const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: { items: [], products: [], totalPrice: 0 },
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { items: [], products: [], totalPrice: 0 };
            saveCartToStorage(state.cart);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.data; // Use `.data` to match API response
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.data;
                saveCartToStorage(state.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart";
            })
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.data;
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update the cart";
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart.items = state.cart.items.filter((item) => item._id !== action.payload);
                state.cart.products = state.cart.products.filter((product) => product.productId !== action.payload);
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove the cart";
            })
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.data;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to merge the cart";
            });
    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
