import Provider from '@/components/Provider';
import StyledComponentRegistry from '@/lib/registry';
import QueryClientProvider from '@/services/QueryClientProvider';
import React, { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: '부산소프트웨어마이스터고 입학전형 | 마루',
  description: '부산소프트웨어마이스터고등학교 입학전형 시스템 마루입니다.',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <head>
        <body>
          <StyledComponentRegistry>
            <QueryClientProvider>
              <Provider>{children}</Provider>
            </QueryClientProvider>
          </StyledComponentRegistry>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
