import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Text } from '@maru/ui';
import { Storage } from '@/apis/storage/storage';
import { ROUTES, TOKEN } from '@/constants/common/constants';
import { AlertStyleModal, NeedLoginModal } from '@/components/common';
import { jwtDecode } from 'jwt-decode';

interface GuardOptions {
  period?: { start: Dayjs; end: Dayjs };
  title?: string;
  content?: string;
}

const usePageAccessGuard = (options: GuardOptions) => {
  const router = useRouter();
  const overlay = useOverlay();

  useEffect(() => {
    const now = dayjs();
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
    } else if (!now.isBetween(options.period?.start, options.period?.end, 'hour', '[]')) {
      overlay.open(({ close, isOpen }) => (
        <AlertStyleModal
          isOpen={isOpen}
          onClose={() => {
            router.replace(ROUTES.MAIN);
            close();
          }}
          title={options.title ?? ''}
          content={
            <Text fontType="p2" whiteSpace="pre-line">
              {options.content}
            </Text>
          }
          height={350}
        />
      ));
    }
  }, [router, overlay, options]);
};

export default usePageAccessGuard;
