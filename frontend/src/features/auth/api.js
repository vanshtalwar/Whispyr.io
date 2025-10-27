import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.MODE === "development" ? "http://localhost:5001/" : "/", }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

     getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
  }),
});


export const { useSignupMutation, useLoginMutation, useGetAllUsersQuery} = authApi;
