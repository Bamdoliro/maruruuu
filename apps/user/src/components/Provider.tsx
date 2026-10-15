'use client';

import { GlobalStyle } from '@maru/design-system';
import { Loader, Toast } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { Suspense, useEffect } from 'react';
import { MobileProvider } from './common';
import { AuthStateProvider, useAuthState, useToast } from '@maru/hooks';
import { useSessionExpired } from '@/hooks';
import { useScheduleQuery } from '@/services/schedule/queries';
import { ROUTES } from '@/constants/common/constants';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import styled from '@emotion/styled';

dayjs.extend(isBetween);

interface Props {
  children: ReactNode;
  initialLoggedIn: boolean;
}

const GlobalToast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <StyledToastContainer>
      {toasts.map((toast) => (
        <StyledToastWrapper key={toast.id}>
          <Toast
            type={toast.toastType}
            device={toast.device}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </StyledToastWrapper>
      ))}
    </StyledToastContainer>
  );
};

const SessionExpiredHandler = () => {
  const { setIsLoggedIn } = useAuthState();

  useSessionExpired(() => setIsLoggedIn(false));

  return null;
};

const ScheduleGate = ({ children }: { children: ReactNode }) => {
  const { data, isError } = useScheduleQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isInspection = !!data && dayjs().isBetween(data.점검_시작, data.점검_끝);
  const isInspectionPage = pathname === ROUTES.INSPECTION;
  const shouldRedirect = !!data && isInspection !== isInspectionPage;

  useEffect(() => {
    if (!shouldRedirect) return;

    router.replace(isInspection ? ROUTES.INSPECTION : ROUTES.MAIN);
  }, [shouldRedirect, isInspection, router]);

  if (isError) return;
  if (!data || shouldRedirect) return <Loader />;

  return <>{children}</>;
};

const StyledToastContainer = styled.div`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    align-items: center;
  }

  @media (min-width: 769px) {
    top: 150px;
    right: 48px;
    align-items: flex-end;
  }
`;

const StyledToastWrapper = styled.div`
  animation: slideIn 0.3s ease forwards;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Provider = ({ children, initialLoggedIn }: Props) => {
  return (
    <JotaiProvider>
      <AuthStateProvider initialLoggedIn={initialLoggedIn}>
        <SessionExpiredHandler />
        <OverlayProvider>
          <GlobalStyle />
          <ScheduleGate>
            <MobileProvider>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </MobileProvider>
          </ScheduleGate>
          <GlobalToast />
        </OverlayProvider>
      </AuthStateProvider>
    </JotaiProvider>
  );
};

export default Provider;
