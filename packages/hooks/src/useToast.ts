import { useCallback, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

export type ToastType = 'ERROR' | 'SUCCESS';
export type DeviceType = 'MOBILE' | 'COMPUTER';

export type ToastItem = {
  id: string;
  message: string;
  toastType: ToastType;
  device: DeviceType;
  duration: number;
};

const toastListState = atom<ToastItem[]>({
  key: 'toastListState',
  default: [],
});

const useToast = () => {
  const [toasts, setToasts] = useRecoilState(toastListState);
  const timeoutRefs = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const removeToast = useCallback(
    (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      if (timeoutRefs.current[id]) {
        clearTimeout(timeoutRefs.current[id]);
        delete timeoutRefs.current[id];
      }
    },
    [setToasts],
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
      duration = 3000,
    ) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const item: ToastItem = { id, message, toastType: type, device, duration };
      setToasts((prev) => [...prev, item]);

      timeoutRefs.current[id] = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        delete timeoutRefs.current[id];
      }, duration);

      return id;
    },
    [setToasts],
  );

  return {
    toasts,
    toast,
    removeToast,
    clearToasts,
  };
};

export default useToast;
