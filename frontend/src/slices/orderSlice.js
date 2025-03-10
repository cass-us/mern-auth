import { createAsyncThunk , createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserOrders = createAsyncThunk("order/fetchUserOrders",async(_, {isRejectedWithValue})=>{
    try{
     const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
        }
     )
     return response.data;
    }catch(error){
        return isRejectedWithValue(error);
    }
})


export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails", async (orderId,{rejectedWithValue})=>{
    try{
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }

        );
        return response.data;

    }catch(error){
        rejectedWithValue(error.response.data);

    }
})



const orderSlice = createSlice({
    name: "order",
    initialState:{
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers:(builder)=>{
        //fetch order
        builder
        .addCase(fetchUserOrders.pending, (state)=>{
            state.loading = true;
            state.error = null; 
        })
        .addCase(fetchUserOrders.fulfilled, (state ,action)=>{
            state.loading = false;
            state.error = action.payload; 
        })

        .addCase(fetchUserOrders.rejected, (state,action)=>{
            state.loading = false;
            state.error = action.payload.message; 
        })

      // fetch order details 



      .addCase(fetchOrderDetails.pending, (state)=>{
        state.loading = true;
        state.error = null; 
    })
    .addCase(fetchOrderDetails.fulfilled, (state ,action)=>{
        state.loading = false;
        state.orderDetails = action.payload; 
    })

    .addCase(fetchOrderDetails.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload.message; 
    })



    },
});


export default orderSlice.reducer;