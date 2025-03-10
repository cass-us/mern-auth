import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get token from local storage
const getToken = () => localStorage.getItem("userToken");

// Fetch all users (Admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            {
                headers: { Authorization: `Bearer ${getToken("userToken")}` },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
});

// Add a new user
export const addUser = createAsyncThunk("admin/addUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken("userToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add user");
    }
});

// Remove user
export const deleteUser = createAsyncThunk("admin/removeUser", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
            {
                headers: { Authorization: `Bearer ${getToken("userToken")}` },
            }
        );
        return id; // Return userId to update state
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to remove user");
    }
});

// Update user details
export const updateUser = createAsyncThunk("admin/updateUser", async ({ id,name,email,role}, { rejectWithValue }) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
           {name,email,role},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken("userToken")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
});

// Toggle Admin Status
export const toggleAdminStatus = createAsyncThunk("admin/toggleAdmin", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}/toggle-admin`,
            {},
            {
                headers: { Authorization: `Bearer ${getToken("userToken")}` },
            }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update admin status");
    }
});

// Admin Slice
const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add User
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove User
            .addCase(removeUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(removeUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Toggle Admin Status
            .addCase(toggleAdminStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleAdminStatus.fulfilled, (state, action) => {
                state.loading = false;
                const user = state.users.find(user => user._id === action.payload._id);
                if (user) {
                    user.isAdmin = action.payload.isAdmin;
                }
            })
            .addCase(toggleAdminStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;
