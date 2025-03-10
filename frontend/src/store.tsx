import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice.js";
import authReducer from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
import cartReducer from "./slices/cartSlice.js"; // Import the cart slice
import checkoutReducer from "./slices/checkoutSlice.js"
import orderReducer from "./slices/orderSlice.js"
import adminProductReducer from "./slices/adminProductSlice.js";
import adminOrderReducer from "./slices/adminOrderSlice.js";
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer, // Add the cart reducer
        products: productReducer, // Add the product reducer
        api: apiSlice.reducer, // Assign the apiSlice reducer correctly
        checkout: checkoutReducer,
        order: orderReducer,
        adminProducts: adminProductReducer,
        adminOrders: adminOrderReducer,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
