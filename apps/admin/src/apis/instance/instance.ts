import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ROUTES } from '@/constants/common/constant';

export const maru = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

maru.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    const isTokenExpired =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('isLoggedIn');

    if (isTokenExpired) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = maru
          .patch('/auth')
          .then(() => {})
          .catch((refreshError) => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = ROUTES.MAIN;
            return Promise.reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      originalRequest._retry = true;

      await refreshPromise;
      return maru(originalRequest);
    }

    return Promise.reject(error);
  },
);
