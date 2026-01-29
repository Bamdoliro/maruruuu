'use client';

import AppLayout from '@/layouts/AppLayout';
import { Text } from '@maru/ui';
import styled from '@emotion/styled';
import FairForm from '@/components/fair/FairForm/FairForm';
import { flex } from '@maru/utils';

const FairCreatePage = () => {
  return (
    <AppLayout>
      <StyledFairCreate>
        <StyledFairText>
          <Text fontType="H1">입학 전형 설명회 생성</Text>
        </StyledFairText>
        <FairForm />
      </StyledFairCreate>
    </AppLayout>
  );
};

export default FairCreatePage;

const StyledFairCreate = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0 60px 60px;
  position: relative;
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  gap: 65px;
`;

const StyledFairText = styled.div`
  width: 100%;
  top: 0;
`;
