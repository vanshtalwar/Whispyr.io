import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/api";
import authReducer from "./features/auth/slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
