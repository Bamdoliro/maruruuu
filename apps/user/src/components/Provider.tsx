'use client';

import { GlobalStyle } from '@maru/design-system';
import { Loader, Toast } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { useToast } from '@/hooks';

interface Props {
  children: ReactNode;
}

const GlobalToast = () => {
  const { showToast, toastMessage, toastType } = useToast();

  return showToast ? <Toast type={toastType}>{toastMessage}</Toast> : null;
};

const Provider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <OverlayProvider>
        <GlobalStyle />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </OverlayProvider>
      <GlobalToast />
    </RecoilRoot>
  );
};

export default Provider;
