'use client';

import AppLayout from '@/layouts/AppLayout';
import { Text } from '@maru/ui';
import { styled } from 'styled-components';
import FairForm from '../../../components/fair/FairForm/FairForm';

const FairCreatePage = () => {
  return (
    <AppLayout>
      <FairCreate>
        <Text fontType="H1">입학 전형 설명회 생성</Text>
        <StyledFairForm>
          <FairForm />
        </StyledFairForm>
      </FairCreate>
    </AppLayout>
  );
};

export default FairCreatePage;

const FairCreate = styled.div`
  width: 100%;
  height: 100%;
  padding: 64px 0 60px 60px;
`;

const StyledFairForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
