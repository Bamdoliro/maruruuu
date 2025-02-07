import { Footer, Header } from '@/components/common';
import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface AppLayoutProps {
  header?: boolean;
  footer?: boolean;
  children: ReactNode;
  backgroundColor?: CSSProperties['backgroundColor'];
}

const AppLayout = ({ header, footer, children, backgroundColor }: AppLayoutProps) => {
  return (
    <>
      {header && <Header />}
      <StyledAppLayout style={{ backgroundColor }}>{children}</StyledAppLayout>
      {footer && <Footer />}
    </>
  );
};

export default AppLayout;

const StyledAppLayout = styled.div`
  width: 100%;
  min-height: calc(100vh - 118px);
`;
