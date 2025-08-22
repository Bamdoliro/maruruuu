import { Storage } from '@/apis/storage/storage';
import { NeedLoginModal } from '@/components/common';
import { ROUTES, TOKEN } from '@/constants/common/constants';
import { useOverlay } from '@toss/use-overlay';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useLoginGuard = () => {
  const router = useRouter();
  const overlay = useOverlay();

  useEffect(() => {
    const token = Storage.getItem(TOKEN.ACCESS) || undefined;

    const isTokenValid = (token?: string) => {
      if (!token) return false;

      try {
        const decoded: { exp: number } = jwtDecode(token);
        const now = Date.now() / 1000;
        return decoded.exp > now;
      } catch (e) {
        return false;
      }
    };

    if (!isTokenValid(token)) {
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
