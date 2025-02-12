'use client';

import AppLayout from '@/layouts/AppLayout';
import { color } from '@maru/design-system';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Error = () => {
  const router = useRouter();

  const handleMovePeriodPage = () => {
    router.back();
  };

  const handlePageRefresh = () => {
    router.refresh();
    
  };

  return (
    <AppLayout header footer>
      <StyledError>
        <Image width={363.75} height={155.4} alt="500" src="/svg/error.svg" />
        <Column gap={24}>
          <Text fontType="H1" color={color.gray900}>
            페이지가 작동하지 않습니다
          </Text>
          <Column alignItems="center">
            <Text fontType="p2" color={color.gray600}>
              이런! 우리 쪽에서 문제가 발생했습니다.
            </Text>
            <Text fontType="p2" color={color.gray600}>
              지금 밤돌이로 팀이 문제를 해결하기 위해 열심히 노력하고 있습니다.
            </Text>
            <Text fontType="p2" color={color.gray600}>
              일시적인 문제이니 나중에 다시 시도해주세요.
            </Text>
          </Column>
        </Column>
        <Row alignItems="center" gap={16}>
          <Button size="LARGE" width="fit-content" onClick={handleMovePeriodPage}>
            이전 페이지로 돌아가기
          </Button>
          <Button
            styleType="SECONDARY"
            size="LARGE"
            width="fit-content"
            onClick={handlePageRefresh}
          >
            새로고침하기
          </Button>
        </Row>
      </StyledError>
    </AppLayout>
  );
};

export default Error;

const StyledError = styled.div`
  ${flex({ alignItems: 'center', flexDirection: 'column' })}
  gap: 56px;
  margin: 82px auto 0;
  width: fit-content;
`;
