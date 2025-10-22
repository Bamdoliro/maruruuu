import { color } from '@maru/design-system';
import { Button, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useMobile } from '../../Mobile.hook';

const PassBox = () => {
  const { handleMoveStep } = useMobile('MAIN');

  return (
    <StyledPassBox>
      <Text fontType="p3" color={color.gray900} textAlign="center">
        당신의 합격을 진심으로 축하드립니다.
        <br />
        당신의 밝은 미래를 응원하며,
        <br />
        앞으로의 여정에 당신과 함께할 수 있어 영광입니다.
      </Text>
      <Button size="SMALL" onClick={handleMoveStep}>
        홈으로 돌아가기
      </Button>
    </StyledPassBox>
  );
};

export default PassBox;

const StyledPassBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding-bottom: 127px;
  gap: 99.6px;
`;
