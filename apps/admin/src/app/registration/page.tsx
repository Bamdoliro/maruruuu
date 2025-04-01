'use client'

import RegistartonTable from '@/components/registration/RegistrationTable/RegistrationTable';
import AppLayout from '@/layouts/AppLayout';
import { Column, Loader, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { Suspense } from 'react';
import styled from 'styled-components';

const RegistrationPage = () => {
  return (
    <AppLayout>
      <StyledRegistartionPage>
        <Text fontType="H1">입학 등록원 관리</Text>
        <Column gap={36}>
          <Suspense fallback={<Loader />}>
            <RegistartonTable />
          </Suspense>
        </Column>
      </StyledRegistartionPage>
    </AppLayout>
  );
};

export default RegistrationPage;

const StyledRegistartionPage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px 0 60px;
`;
