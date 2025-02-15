'use client';

import { NoticeList } from '@/components/notice';
import AppLayout from '@/layouts/AppLayout';
import { color } from '@maru/design-system';
import { Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { Suspense } from 'react';
import styled from 'styled-components';

const Notice = () => {
  return (
    <AppLayout header footer>
      <StyledNotice>
        <Text fontType="H1" color={color.gray900}>
          공지사항
        </Text>
        <Suspense fallback={<Loader />}>
          <NoticeList />
        </Suspense>
      </StyledNotice>
    </AppLayout>
  );
};

export default Notice;

const StyledNotice = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  gap: 48px;
  margin: 0 auto;
  position: relative;
  padding: 82px 204px;
`;
