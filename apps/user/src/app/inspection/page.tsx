'use client';

import { AppLayout } from '@/layouts';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { color } from '@maru/design-system';
import { SCHEDULE } from '@/constants/form/constants';

const InspectionPage = () => {
  return (
    <AppLayout>
      <StyledErrorPage>
        <Column gap={10} alignItems="center">
          <Text fontType="H1" color={color.gray900}>
            현재 마루가 점검 중입니다.
          </Text>
          <Text fontType="p2" color={color.gray600} textAlign="center">
            서버 점검으로 인하여 프로그램이 잠시 사용 중단됩니다.
          </Text>
          <Text fontType="p2" color={color.gray600} textAlign="center">
            사용에 불편을 드려 죄송합니다.
          </Text>
          <Text fontType="p1" color={color.red} textAlign="center">
            일시: {SCHEDULE.점검_시작.format('YYYY. MM. DD.(dd) hh:mm')} -&nbsp;
            {SCHEDULE.점검_끝.format('YYYY. MM. DD.(dd) hh:mm')}
          </Text>
        </Column>
      </StyledErrorPage>
    </AppLayout>
  );
};

export default InspectionPage;

const StyledErrorPage = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })};
  height: 100vh;
  width: 100%;
`;
