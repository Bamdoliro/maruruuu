import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ROUTES, TOKEN } from '@/constants/common/constant';
import { Storage } from '../storage/storage';
import { Cookie } from '@/apis/cookie/cookie';

export const maru = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

maru.interceptors.request.use(
  (config) => {
    const token = Storage.getItem(TOKEN.ACCESS);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

maru.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    const isTokenExpired =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookie.getItem(TOKEN.REFRESH);

    if (isTokenExpired) {
      if (!isRefreshing) {
        isRefreshing = true;

        refreshPromise = axios
          .patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, null, {
            headers: {
              'Refresh-Token': Cookie.getItem(TOKEN.REFRESH) || '',
            },
          })
          .then((res) => {
            const newToken = res.data.data.accessToken;
            if (!newToken) {
              alert('다시 로그인 해주세요');
              localStorage.clear();
              window.location.href = ROUTES.MAIN;
              return Promise.reject('No access token');
            }
            Storage.setItem(TOKEN.ACCESS, newToken);
            maru.defaults.headers.common.Authorization = `Bearer ${newToken}`;
            return newToken;
          })
          .catch((refreshError) => {
            localStorage.clear();
            window.location.href = ROUTES.MAIN;
            return Promise.reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      originalRequest._retry = true;

      const newToken = await refreshPromise;
      if (!newToken) return Promise.reject(error);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newToken}`,
      };

      return maru(originalRequest);
    }

    return Promise.reject(error);
  }
);
