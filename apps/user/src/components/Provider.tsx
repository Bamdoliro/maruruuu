'use client';

import { GlobalStyle } from '@maru/design-system';
import { Loader, Toast } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { MobileProvider } from './common';
import { useToast } from '@maru/hooks';

interface Props {
  children: ReactNode;
}

const GlobalToast = () => {
  const { showToast, toastMessage, toastType, device } = useToast();

  return showToast ? (
    <Toast type={toastType} device={device}>
      {toastMessage}
    </Toast>
  ) : null;
};

const Provider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <OverlayProvider>
        <GlobalStyle />
        <MobileProvider>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </MobileProvider>
      </OverlayProvider>
      <GlobalToast />
    </RecoilRoot>
  );
};

export default Provider;
