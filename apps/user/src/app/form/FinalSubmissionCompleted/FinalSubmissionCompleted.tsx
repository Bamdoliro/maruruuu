import { CompleteAlarm } from '@/components/form';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { IconCheckCircle } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useCTAButton } from './FinalSubmissionCompleted.hook';
import { SCHEDULE } from '@/constants/form/constants';
import { formatMonthDay } from '@/utils';

const FinalSubmissionCompleted = () => {
  const { handleDownloadReciptButtonClick, userData } = useCTAButton();

  return (
    <AppLayout header footer>
      <CompleteAlarmBox>
        <CompleteAlarm
          text="원서 최종 제출 완료"
          icon={<IconCheckCircle width={150} height={150} />}
        />
      </CompleteAlarmBox>
      <StyledFinalSubmissionCompleted>
        <Row gap={8} alignItems="center" justifyContent="center">
          <IconCheckCircle width={64} height={64} />
          <Text fontType="H1" color={color.gray900}>
            입학원서 최종 제출 완료
          </Text>
        </Row>
        <Column gap={71} alignItems="center">
          <Column gap={27} alignItems="center">
            <Text fontType="H2" color={color.gray900}>
              부산소프트웨어마이스터고에 지원해주셔서 감사합니다.
            </Text>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              {userData.name}님, 부산소프트웨어마이스터고에 지원해주셔서 대단히
              감사드립니다.
              <br />
              1차 합격자는 {formatMonthDay(SCHEDULE.일차_합격_발표)}에 발표됩니다.
              <br />
              {userData.name}님의 1차 합격을 기원합니다.
            </Text>
          </Column>
          <Button
            onClick={handleDownloadReciptButtonClick}
            size="SMALL"
            styleType="PRIMARY"
          >
            접수증 다운로드
          </Button>
        </Column>
      </StyledFinalSubmissionCompleted>
    </AppLayout>
  );
};

export default FinalSubmissionCompleted;

const StyledFinalSubmissionCompleted = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  gap: 70px;
  padding-top: 69px;

  opacity: 0;
  animation: show 1.2s 2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;

  pointer-events: none;

  @keyframes show {
    from {
      transform: translateY(200px);
    }
    to {
      transform: translateY(0);
      opacity: 100;
      pointer-events: auto;
    }
  }
`;

const CompleteAlarmBox = styled.div`
  width: 100%;
  position: absolute;

  animation: hide 1.2s 1s cubic-bezier(0.65, 0.05, 0.36, 1) forwards;

  @keyframes hide {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-300px);
      opacity: 0;
      display: none;
    }
  }
`;
