import { SESSION_EXPIRED_EVENT } from '@/apis/instance/session';
import { useEffect, useRef } from 'react';

const useSessionExpired = (onExpired: () => void) => {
  const onExpiredRef = useRef(onExpired);
  onExpiredRef.current = onExpired;

  useEffect(() => {
    const handleExpired = () => onExpiredRef.current();

    window.addEventListener(SESSION_EXPIRED_EVENT, handleExpired);

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleExpired);
    };
  }, []);
};

export default useSessionExpired;
