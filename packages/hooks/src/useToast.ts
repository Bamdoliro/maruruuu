import { useCallback, useEffect, useRef, useState } from 'react';
import { atom, useRecoilState } from 'recoil';

export type ToastType = 'ERROR' | 'SUCCESS';
export type DeviceType = 'MOBILE' | 'COMPUTER';

export type ToastItem = {
  id: string;
  message: string;
  toastType: ToastType;
  device: DeviceType;
  duration: number;
  createdAt: number;
};

export type ToastProgress = ToastItem & {
  progress: number;
  remaining: number;
};

const toastListState = atom<ToastItem[]>({
  key: 'toastListState',
  default: [],
});

const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastListState);
  const timeoutRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const [tick, setTick] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setTick((t) => t + 1), 100);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      Object.keys(timeoutRefs.current).forEach((key) => {
        clearTimeout(timeoutRefs.current[key]);
      });
      timeoutRefs.current = {};
    };
  }, []);

  const removeToast = useCallback(
    (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      if (timeoutRefs.current[id]) {
        clearTimeout(timeoutRefs.current[id]);
        delete timeoutRefs.current[id];
      }
    },
    [setToasts]
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
    Object.keys(timeoutRefs.current).forEach((key) => {
      clearTimeout(timeoutRefs.current[key]);
    });
    timeoutRefs.current = {};
  }, [setToasts]);

  const toast = useCallback(
    (
      message: string,
      type: ToastType = 'SUCCESS',
      device: DeviceType = 'COMPUTER',
      duration = 3000
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const createdAt = Date.now();
      const item: ToastItem = {
        id,
        message,
        toastType: type,
        device,
        duration,
        createdAt,
      };
      setToasts((prev) => [...prev, item]);
      timeoutRefs.current[id] = setTimeout(() => {
        setToasts((prev) => prev.filter((p) => p.id !== id));
        delete timeoutRefs.current[id];
      }, duration);

      return id;
    },
    [setToasts]
  );

  const toastsWithProgress: ToastProgress[] = toasts.map((t) => {
    const elapsed = Date.now() - t.createdAt;
    const progress = Math.min(1, elapsed / t.duration);
    const remaining = Math.max(0, t.duration - elapsed);
    return { ...t, progress, remaining };
  });
  void tick;

  return {
    toasts: toastsWithProgress,
    toast,
    removeToast,
    clearToasts,
  };
};

export default useToast;
