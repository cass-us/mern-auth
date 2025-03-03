import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
import cartReducer from "./slices/cartSlice.js"; // Import the cart slice

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer, // Add the cart reducer
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
