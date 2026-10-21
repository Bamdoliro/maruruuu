import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { Button, Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const OffSeasonBox = () => {
  const router = useRouter();

  const handleMoveSimulation = () => {
    router.push(ROUTES.SIMULATION);
  };

  return (
    <StyledOffSeasonBox>
      <Column gap={36}>
        <Text fontType="H1" color={color.white}>
          현재 입학 전형 기간이 아닙니다
        </Text>
        <Text fontType="p2" color={color.gray300}>
          입학 일정은 전형 기간에 맞춰 공개됩니다.
          <br />
          성적 모의 계산은 지금도 이용할 수 있어요.
        </Text>
      </Column>
      <Button width={250} size="LARGE" styleType="PRIMARY" onClick={handleMoveSimulation}>
        성적 모의 계산하기
      </Button>
    </StyledOffSeasonBox>
  );
};

export default OffSeasonBox;

const StyledOffSeasonBox = styled.div`
  ${flex({ justifyContent: 'space-between', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
