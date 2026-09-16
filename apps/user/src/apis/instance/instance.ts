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

const REFRESH_EXCLUDED_REQUESTS = [
  { url: REFRESH_URL, method: 'patch' },
  { url: REFRESH_URL, method: 'post' },
  { url: '/users', method: 'post' },
  { url: '/users/password', method: 'patch' },
  { url: '/users/verification', method: 'post' },
  { url: '/users/verification', method: 'patch' },
];

const isRefreshExcluded = (config?: AxiosRequestConfig) =>
  REFRESH_EXCLUDED_REQUESTS.some(
    ({ url, method }) => config?.url === url && config?.method?.toLowerCase() === method,
  );

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

    if (isRefreshExcluded(originalRequest)) {
      return Promise.reject(error);
    }

    const isTokenExpired = error.response?.status === 401 && !originalRequest?._retry;

    if (isTokenExpired) {
      // 재발급 후 재시도할 요청임을 먼저 표시한다.
      // 큐에 들어가는 요청도 재시도 대상이므로 여기서 표시해야
      // 재시도가 또 401이 났을 때 재발급을 반복하지 않는다.
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(maru(originalRequest)),
            reject,
          });
        });
      }

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
