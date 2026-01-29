import { color } from '@maru/design-system';
import { Button, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useMobile } from '../../Mobile.hook';

const PassBox = () => {
  const { handleDownloadAdmissionTicket, handleMoveStep } = useMobile('MAIN');

  return (
    <StyledPassBox>
      <Text fontType="p3" color={color.gray900} textAlign="center">
        2단계 전형 응시를 위해 수험표를 출력하고
        <br />
        10월 31일에 본교에 방문해주시기 바랍니다.
        <br />
        자세한 내용은 입학 요강에서 확인해주시기 바랍니다.
      </Text>
      <Row gap={16} alignItems="center">
        <Button size="SMALL" onClick={handleDownloadAdmissionTicket}>
          수험표 출력하기
        </Button>
        <Button size="SMALL" styleType="SECONDARY" onClick={handleMoveStep}>
          홈으로 돌아가기
        </Button>
      </Row>
    </StyledPassBox>
  );
};

export default PassBox;

const StyledPassBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding-bottom: 127px;
  gap: 77.6px;
`;
