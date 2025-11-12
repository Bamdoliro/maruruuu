import { color, font } from '@maru/design-system';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useCTAButton } from '../FirstResultContent.hook';
import { SCHEDULE } from '@/constants/form/constants';
import formatMonthDay from '@/utils/formatMonthDay';

const PassBox = () => {
  const {
    handleMoveMainPage,
    handleDownloadAdmissionsGuideline,
    handleDownloadAdmissionTicket,
  } = useCTAButton();

  return (
    <StyledPassBox>
      <Column gap={24} alignItems="center">
        <Text fontType="p1" color={color.gray900} textAlign="center">
          2단계 전형 응시를 위해 수험표를 출력하고 {formatMonthDay(SCHEDULE.이차_면접)}에
          본교에 방문해주시기 바랍니다.
          <br />
          자세한 내용은 입학 요강에서 확인해주시기 바랍니다.
        </Text>
        <AdmissionsGuidelineDownloadLink onClick={handleDownloadAdmissionsGuideline}>
          입학 요강 다운로드
        </AdmissionsGuidelineDownloadLink>
      </Column>
      <Row gap={16} alignItems="center">
        <Button size="LARGE" styleType="PRIMARY" onClick={handleDownloadAdmissionTicket}>
          수험표 출력하기
        </Button>
        <Button size="LARGE" styleType="SECONDARY" onClick={handleMoveMainPage}>
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
  gap: 161px;
`;

const AdmissionsGuidelineDownloadLink = styled.a`
  ${font.p2}
  color: ${color.gray600};

  &:hover {
    text-decoration-line: underline;
    text-decoration-color: ${color.gray600};
  }
`;
