'use client';

import AppLayout from '@/layouts/AppLayout';
import ScheduleForm from '@/components/schedule/ScheduleForm/ScheduleForm';
import styled from '@emotion/styled';
import { flex } from '@maru/utils';
import { Text } from '@maru/ui';

const SchedulePage = () => {
  return (
    <AppLayout>
      <StyledSchedulePage>
        <Text fontType="H1">일정 관리</Text>
        <ScheduleForm />
      </StyledSchedulePage>
    </AppLayout>
  );
};

export default SchedulePage;

const StyledSchedulePage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  padding: 3.25rem 3.25rem;
`;
