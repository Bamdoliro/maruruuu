import { useCallback, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

export type ToastType = 'ERROR' | 'SUCCESS';

const toastState = atom({
  key: 'toastState',
  default: {
    showToast: false,
    toastMessage: '',
    toastType: 'SUCCESS' as 'ERROR' | 'SUCCESS',
  },
});

const useToast = () => {
  const [popup, setPopup] = useRecoilState(toastState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toast = useCallback(
    (message: string, type: 'ERROR' | 'SUCCESS' = 'SUCCESS') => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setPopup({
        showToast: true,
        toastMessage: message,
        toastType: type,
      });
      timeoutRef.current = setTimeout(() => {
        setPopup((prev) => ({
          ...prev,
          showToast: false,
        }));
        timeoutRef.current = null;
      }, 3000);
    },
    [setPopup]
  );

  return {
    showToast: popup.showToast,
    toastMessage: popup.toastMessage,
    toastType: popup.toastType,
    toast,
  };
};

export default useToast;
