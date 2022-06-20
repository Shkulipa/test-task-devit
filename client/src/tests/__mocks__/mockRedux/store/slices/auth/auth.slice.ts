import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../../../../interfaces/user";
import { loginAsync } from "../../actions/login";
import { logoutAsync } from "../../actions/logout";
import { IAuthState } from "./authSlice.interfaces";

const initialState: IAuthState = {
  user: null,
  isLoading: false,
  error: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload; 
    },
    closeError(state) {
      state.error = ""; 
    }
  },
  extraReducers: (builder) => {
    builder
      /**
       * @info login
       */
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /**
       * @info logout
       */
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = '';
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})