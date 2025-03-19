'use client';

import FairList from '@/components/fair/FairList/FairList';
import AppLayout from '@/layouts/AppLayout';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

const FairPage = () => {
  return (
    <AppLayout>
      <StyledFairPage>
        <Text fontType="H1">입학전형 설명회 관리</Text>
        <FairList />
      </StyledFairPage>
    </AppLayout>
  );
};
export default FairPage;

const StyledFairPage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 65px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px 0 60px;
`;
