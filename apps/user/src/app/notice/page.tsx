'use client';

import { NoticeList } from '@/components/notice';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

const Notice = () => {
  return (
    <AppLayout header footer>
      <StyledNotice>
        <Text fontType="H1" color={color.gray900}>
          공지사항
        </Text>
        <NoticeList />
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
