'use client';

import { ManagementContent } from '@/components/management';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { Suspense } from 'react';
import styled from 'styled-components';

const Management = () => {
  return (
    <AppLayout header footer>
      <StyledManagement>
        <Text fontType="H1" color={color.gray900}>
          원서 관리
        </Text>
        <Suspense fallback={<Loader />}>
          <ManagementContent />
        </Suspense>
      </StyledManagement>
    </AppLayout>
  );
};

export default Management;

const StyledManagement = styled.div`
  ${flex({ flexDirection: 'column' })}
  position: relative;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 82px 204px 222px;
  gap: 36px;
`;
