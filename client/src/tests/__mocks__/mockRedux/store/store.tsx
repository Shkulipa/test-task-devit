import { configureStore } from "@reduxjs/toolkit";
import { postAPIMock } from "../services/postAPIMock.service";
import { authSlice } from "./slices/auth/auth.slice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [postAPIMock.reducerPath]: postAPIMock.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(postAPIMock.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;