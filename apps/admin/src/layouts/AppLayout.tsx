'use client';

import { SideBar } from '@/components/common';
import { flex } from '@maru/utils';
import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import styled from '@emotion/styled';

interface Props {
  children: ReactNode;
}

const AppLayout = forwardRef<HTMLElement, Props>(({ children }, ref) => {
  return (
    <StyledAppLayout>
      <SideBar />
      <Section ref={ref}>{children}</Section>
    </StyledAppLayout>
  );
});

AppLayout.displayName = 'AppLayout';

export default AppLayout;

const StyledAppLayout = styled.div`
  ${flex({ flexDirection: 'row' })}
  width: 100%;
  height: 100vh;
`;

const Section = styled.main`
  flex: 1;
  min-width: auto;
  overflow: auto;
`;
