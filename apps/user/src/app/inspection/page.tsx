'use client';

import { AppLayout } from '@/layouts';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { color } from '@maru/design-system';
import dayjs from 'dayjs';
import { formatDate } from '@/utils';

const InspectionPage = () => {
	const 점검_시작 = dayjs(process.env.NEXT_PUBLIC_INSPECTION_START_DAY);
	const 점검_끝 = dayjs(process.env.NEXT_PUBLIC_INSPECTION_END_DAY);

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
            일시: 2025.10.20.(월) 11:30 - 14:00
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
