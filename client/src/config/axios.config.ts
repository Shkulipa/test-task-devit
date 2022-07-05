import axios, { AxiosRequestConfig } from "axios";
import { CONST } from "../interfaces/consts.interfaces";
import { IAuthResponse } from "../interfaces/user";

const config: AxiosRequestConfig = {
  baseURL: '',
  responseType: "json",
  withCredentials: true
};

export const $apiPublic = axios.create(config);
export const $apiPrivate = axios.create(config);

/**
 * @info refresh tokens
 */
$apiPrivate.interceptors.request.use((config) => {
  if (config?.headers) {
    const parsedUser = localStorage.getItem(CONST.LOCAL_STORAGE_USER) as unknown as IAuthResponse;
    config.headers.Authorization = `Bearer ${parsedUser.accessToken}`;
  }
  return config;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 403 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
          const user = await $apiPublic.post<IAuthResponse>('/refresh-token', { withCredentials: true })
          localStorage.setItem(CONST.LOCAL_STORAGE_USER, JSON.stringify(user));
          return $apiPrivate.request(originalRequest);
      } catch (err) {
          console.error(err);
      }
  }

  throw error;
})