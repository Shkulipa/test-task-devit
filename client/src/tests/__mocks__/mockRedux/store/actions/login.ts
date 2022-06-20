import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { $apiPublic } from '../../../../../config/axios.config';
import { IAuthData } from '../../../../../interfaces/authData';
import { CONST } from '../../../../../interfaces/consts.interfaces';
import { IErrorHandler } from '../../../../../interfaces/errorHandler';
import { IAuthResponse } from '../../../../../interfaces/user';

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (authData: IAuthData, thunkAPI)  => {
    const { email, password } = authData;
    try {
      const response = await $apiPublic.post<IAuthResponse>(process.env.REACT_APP_SERVER_URL + "/auth/signin", {
        email,
        password,
      });
      const user = response.data;
      localStorage.setItem(CONST.LOCAL_STORAGE_USER, JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error(error);
      const err = error as AxiosError;
      if(err.code === "ERR_NETWORK") {
        return thunkAPI.rejectWithValue(err.message);
      }

      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data as IErrorHandler;
        return thunkAPI.rejectWithValue(errorData.message);
      } 

      return thunkAPI.rejectWithValue("Smth went wrong, on login :(");
    }
  }
);