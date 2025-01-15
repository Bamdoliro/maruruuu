import React, { ReactNode } from 'react';

export const metadata = {
  title: '마루 어드민',
  description:
    '부산소프트웨어마이스터고등학교 입학전형 시스템 마루의 어드민 페이지입니다.',
};
const RootLayout = (props: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>layout할거임</div>
        {props.children}
      </body>
    </html>
  );
};

export default RootLayout;
