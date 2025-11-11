'use client';

import { GlobalStyle } from '@maru/design-system';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import { Toast } from '@maru/ui';
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
        {children}
        <GlobalToast />
      </OverlayProvider>
    </RecoilRoot>
  );
};

export default Provider;
