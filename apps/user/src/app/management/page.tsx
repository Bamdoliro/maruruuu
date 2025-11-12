'use client';

import { ManagementContent } from '@/components/management';
import { usePageAccessGuard } from '@/hooks';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { Suspense } from 'react';
import styled from 'styled-components';
import { SCHEDULE } from '@/constants/common/constants';

const Management = () => {
  usePageAccessGuard({
    period: { start: SCHEDULE.원서_접수, end: SCHEDULE.입학_등록_마감 },
    title: '입학 전형 기간이 아닙니다',
    content:
      '입학 전형 기간에만 원서 관리가 가능합니다.\n입학 전형 기간에만 접속해주세요.',
  });

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
  padding: 82px 204px 200px;
  gap: 36px;
`;
