'use client';

import { CompleteAlarm, DraftCompletedContent, DraftFormModal } from '@/components/form';
import { AppLayout } from '@/layouts';
import { IconCancelCircle, IconLoader } from '@maru/icon';
import styled from 'styled-components';
import { useCheckFilledForm, useCTAButton } from './DraftCompleted.hook';
import { useOverlay } from '@toss/use-overlay';

const DraftCompleted = () => {
  const overlay = useOverlay();
  const { handleCheckAgainForm, handleSubmitDraftForm } = useCTAButton();
  const {
    applicantFilledCount,
    parentFilledCount,
    educationFilledCount,
    typeFilledCount,
    documentFilledCount,
    isFilledForm: isComplete,
  } = useCheckFilledForm();

  const openDraftFormModal = () => {
    overlay.open(({ isOpen, close }) => (
      <DraftFormModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => {
          handleSubmitDraftForm();
          close();
        }}
      />
    ));
  };

  console.log(isComplete);

  return (
    <AppLayout header>
      <CompleteAlarmBox>
        <CompleteAlarm
          isComplete={isComplete}
          completeText="입학 원서 작성 중"
          completeIcon={<IconLoader width={150} height={150} />}
          inCompleteText="아직 작성하지 않은 곳이 있어요"
          inCompleteIcon={<IconCancelCircle width={150} height={150} />}
        />
      </CompleteAlarmBox>
      <DraftCompletedContent
        isComplete={isComplete}
        applicantFilledCount={applicantFilledCount}
        parentFilledCount={parentFilledCount}
        educationFilledCount={educationFilledCount}
        typeFilledCount={typeFilledCount}
        documentFilledCount={documentFilledCount}
        onClick={handleCheckAgainForm}
        check={openDraftFormModal}
      />
    </AppLayout>
  );
};

export default DraftCompleted;

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
