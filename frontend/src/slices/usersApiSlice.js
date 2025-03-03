import { apiSlice } from './apiSlice';
import { setCookie, clearCookie } from './userSlice'; 
import { createAsyncThunk } from '@reduxjs/toolkit';

const USERS_URL = 'http://localhost:5000/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: credentials,
      }),
    
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const userCookie = data.token; 
          dispatch(setCookie(userCookie));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearCookie());  
        } catch (error) {
          console.error("Logout error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
