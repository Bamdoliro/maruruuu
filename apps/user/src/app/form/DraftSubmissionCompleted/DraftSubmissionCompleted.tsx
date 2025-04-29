import { CompleteAlarm, DraftSubmissionCompletedContent } from '@/components/form';
import { AppLayout } from '@/layouts';
import { IconCheckCircle } from '@maru/icon';
import { styled } from 'styled-components';

const DraftSubmissionCompleted = () => {
  return (
    <AppLayout header>
      <CompleteAlarmBox>
        <CompleteAlarm
          isComplete={true}
          completeText="원서 초안 제출 완료"
          completeIcon={<IconCheckCircle width={150} height={150} />}
        />
      </CompleteAlarmBox>
      <DraftSubmissionCompletedContent />
    </AppLayout>
  );
};

export default DraftSubmissionCompleted;

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
