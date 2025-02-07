'use client';

import { GlobalStyle } from '@maru/design-system';
import { Loader } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';

interface Props {
  children: ReactNode;
}

const Provider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <OverlayProvider>
        <GlobalStyle />
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </OverlayProvider>
    </RecoilRoot>
  );
};

export default Provider;
