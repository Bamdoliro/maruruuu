import Provider from '@/components/Provider';
import React, { ReactNode } from 'react';

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
          <Provider>{children}</Provider>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
