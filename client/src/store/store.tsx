import { configureStore } from "@reduxjs/toolkit";
import { postAPI } from "../services/postAPI.service";
import { authSlice } from "./slices/auth/auth.slice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [postAPI.reducerPath]: postAPI.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postAPI.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;