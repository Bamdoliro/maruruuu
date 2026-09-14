import { ROUTES } from '@/constants/common/constants';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { clearStaleSession } from './session';

export const maru = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const REFRESH_URL = '/auth';

interface FailedRequest {
  resolve: () => void;
  reject: (error?: unknown) => void;
}

const isRefreshRequest = (config?: AxiosRequestConfig) =>
  config?.url === REFRESH_URL && config?.method?.toLowerCase() === 'patch';

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

maru.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (isRefreshRequest(originalRequest)) {
      return Promise.reject(error);
    }

    const isTokenExpired = error.response?.status === 401 && !originalRequest?._retry;

    if (isTokenExpired) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(maru(originalRequest)),
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await maru.patch(REFRESH_URL);
        processQueue(null);
        return maru(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        const refreshStatus = (refreshError as AxiosError).response?.status;

        if (refreshStatus === 401 || refreshStatus === 403) {
          await clearStaleSession();
        }

        if (window.location.pathname !== ROUTES.LOGIN) {
          window.location.href = ROUTES.LOGIN;
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
