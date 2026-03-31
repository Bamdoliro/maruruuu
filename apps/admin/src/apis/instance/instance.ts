import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ROUTES } from '@/constants/common/constant';

export const maruAdmin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/admin`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const maru = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

const handleRefreshAndRetry = async (error: AxiosError, instance: typeof maru) => {
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
    return instance(originalRequest);
  }

  return Promise.reject(error);
};

maru.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleRefreshAndRetry(error, maru),
);

maruAdmin.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleRefreshAndRetry(error, maruAdmin),
);
