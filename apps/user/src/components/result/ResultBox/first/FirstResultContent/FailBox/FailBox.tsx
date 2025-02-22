import { color } from '@maru/design-system';
import { Button, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useCTAButton } from '../FirstResultContent.hook';

const FailBox = () => {
  const { handleMoveMainPage } = useCTAButton();

  return (
    <StyledFailBox>
      <Text fontType="p1" color={color.gray900} textAlign="center">
        학교에 지원해주신 당신의 열정과 노력에 진심으로 감사드립니다.
        <br />
        불합격이라는 결과는 멈추라는 것이 아닌 시작일 뿐입니다.
        <br />
        앞으로의 여정에서도 여러분의 도전과 성장을 응원하며, 더 나은 내일을 향해 함께
        걷도록 하겠습니다.
      </Text>
      <Button size="LARGE" styleType="SECONDARY" onClick={handleMoveMainPage}>
        홈으로 돌아가기
      </Button>
    </StyledFailBox>
  );
};

export default FailBox;

const StyledFailBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding-bottom: 127px;
  gap: 206px;
`;
