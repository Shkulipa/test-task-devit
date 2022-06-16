import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { $apiPrivate } from "../../config/axios.config";
import { CONST } from "../../interfaces/consts.interfaces";

export const logoutAsync = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI)  => {
    try {
      await $apiPrivate.post<string>("/auth/logout");
      localStorage.removeItem(CONST.LOCAL_STORAGE_USER);
    } catch (error) {
      console.error(error)
      const err = error as AxiosError;
      
      if(err.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(err.message);
      }

      return thunkAPI.rejectWithValue("Smth went wrong, on logout :(");
    }
  }
);