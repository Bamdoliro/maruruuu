import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Text } from '@maru/ui';
import { useAuthState } from '@maru/hooks';
import { ROUTES } from '@/constants/common/constants';
import { AlertStyleModal, NeedLoginModal } from '@/components/common';
import { useRef } from 'react';

interface GuardOptions {
  period?: { start: Dayjs; end: Dayjs };
  title?: string;
  content?: string;
  // TODO: 원서접수 기간 검증 임시 우회용. 재적용 시 이 옵션과 사용처를 제거
  bypassPeriod?: boolean;
}

const usePageAccessGuard = (options: GuardOptions) => {
  const router = useRouter();
  const overlay = useOverlay();
  const { isLoggedIn } = useAuthState();
  const initialIsLoggedIn = useRef(isLoggedIn);
  const initialOptions = useRef(options);

  useEffect(() => {
    const now = dayjs();
    const guardOptions = initialOptions.current;

    if (!initialIsLoggedIn.current) {
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
    } else if (
      !guardOptions.bypassPeriod &&
      !now.isBetween(guardOptions.period?.start, guardOptions.period?.end, 'hour', '[]')
    ) {
      overlay.open(({ close, isOpen }) => (
        <AlertStyleModal
          isOpen={isOpen}
          onClose={() => {
            router.replace(ROUTES.MAIN);
            close();
          }}
          title={guardOptions.title ?? ''}
          content={
            <Text fontType="p2" whiteSpace="pre-line">
              {guardOptions.content}
            </Text>
          }
          height={350}
        />
      ));
    }
  }, [router, overlay]);
};

export default usePageAccessGuard;
