import { NeedLoginModal } from '@/components/common';
import { ROUTES } from '@/constants/common/constants';
import { useAuthState } from '@maru/hooks';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';
import useSessionExpired from './useSessionExpired';

const useLoginGuard = () => {
  const router = useRouter();
  const overlay = useOverlay();
  const { isLoggedIn } = useAuthState();
  const initialIsLoggedIn = useRef(isLoggedIn);

  const openNeedLoginModal = useCallback(() => {
    overlay.open(({ close, isOpen }) => (
      <NeedLoginModal
        isOpen={isOpen}
        onClose={() => {
          router.replace(ROUTES.MAIN);
          close();
        }}
        onConfirm={() => {
          router.replace(ROUTES.LOGIN);
          close();
        }}
      />
    ));
  }, [overlay, router]);

  useEffect(() => {
    if (!initialIsLoggedIn.current) openNeedLoginModal();
  }, [openNeedLoginModal]);

  useSessionExpired(openNeedLoginModal);
};

export default useLoginGuard;
