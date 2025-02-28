import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconFunction } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const SimulationBox = () => {
  const router = useRouter();

  const handleMoveSimulation = () => {
    router.push(ROUTES.SIMULATION);
  };

  return (
    <StyledSimulationBox onClick={handleMoveSimulation}>
      <Row gap={8} alignItems="flex-start" justifyContent="space-between">
        <Text fontType="H3" color={color.gray900}>
          성적 모의 계산
        </Text>
        <IconFunction width={64} height={64} color={color.maruDefault} />
      </Row>
      <Text fontType="p2" color={color.gray500}>
        복잡한 성적 산출 공식을
        <br />
        자동으로 계산할 수 있어요
      </Text>
    </StyledSimulationBox>
  );
};

export default SimulationBox;

const StyledSimulationBox = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 384px;
  height: 180px;
  padding: 28px 32px;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  cursor: pointer;
`;
