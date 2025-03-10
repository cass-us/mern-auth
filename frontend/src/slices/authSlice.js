import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Get user from localStorage (if exists)
const userInfo = localStorage.getItem("userInfo");

let parsedUserInfo = null;
if (userInfo) {
    try {
        parsedUserInfo = JSON.parse(userInfo);
    } catch (error) {
        console.error("Error parsing userInfo:", error);
    }
}

// Generate guest ID if not present in localStorage
const initialGuestId = localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Corrected initial state
const initialState = {
    user: parsedUserInfo,  // Use parsedUserInfo here
    guestId: initialGuestId,
    loading: false,
    error: null
};

// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/auth`, userData);

        // Store user data and token in localStorage
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; // Return user data to update Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, userData);

        // Store user data and token in localStorage
        const rf = response.data.userInfo;

        console.log(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        localStorage.setItem("userToken", response.data.token);

        return response.data.user; // Return user data to update Redux state
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
});

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            // Remove user and token from localStorage
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");

            // Reset user and guestId in state
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        },
        generateGuestId: (state) => {
            // Generate a new guest ID and store in localStorage
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId", state.guestId);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;  // Set user from login
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;  // Set error from failed login
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;  // Set user from registration
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;  // Set error from failed registration
            });
    }
});

export const { logout, generateGuestId } = authSlice.actions;
export default authSlice.reducer;
