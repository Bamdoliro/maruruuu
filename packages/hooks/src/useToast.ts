import { useCallback, useRef } from 'react';
import { atom, useRecoilState } from 'recoil';

export type ToastType = 'ERROR' | 'SUCCESS';

const toastState = atom({
  key: 'toastState',
  default: {
    showToast: false,
    toastMessage: '',
    toastType: 'SUCCESS' as 'ERROR' | 'SUCCESS',
    device: 'COMPUTER' as 'MOBILE' | 'COMPUTER',
  },
});

const useToast = () => {
  const [popup, setPopup] = useRecoilState(toastState);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toast = useCallback(
    (
      message: string,
      type: 'ERROR' | 'SUCCESS' = 'SUCCESS',
      device: 'MOBILE' | 'COMPUTER' = 'COMPUTER'
    ) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setPopup({
        showToast: true,
        toastMessage: message,
        toastType: type,
        device: device,
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
    device: popup.device,
    toast,
  };
};

export default useToast;
