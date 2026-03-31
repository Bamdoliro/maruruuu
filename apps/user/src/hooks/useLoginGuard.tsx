import { NeedLoginModal } from '@/components/common';
import { ROUTES } from '@/constants/common/constants';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useLoginGuard = () => {
  const router = useRouter();
  const overlay = useOverlay();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
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
    }
  }, [overlay, router]);
};

export default useLoginGuard;
