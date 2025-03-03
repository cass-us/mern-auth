import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
  baseUrl: fetchBaseQuery({ baseUrl: ''}),
  credentials: 'include', 
});


export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({

    getUser: builder.query({
      query: (id) => `user/${id}`,
      providesTags: ['User'],
    }),
    auth: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),

  }),
});

export const { useGetUserQuery, useAuthMutation } = apiSlice;
