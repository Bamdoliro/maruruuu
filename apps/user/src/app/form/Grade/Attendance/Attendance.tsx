import { AttendanceCalculator, FormController } from '@/components/form';
import { Column, UnderlineButton } from '@maru/ui';
import styled from '@emotion/styled';
import { useCTAButton } from './Attendance.hook';

const Attendance = () => {
  const { handleNextStep, handlePreviousStep } = useCTAButton();

  return (
    <>
      <Column gap={24}>
        <NavigationBar>
          <UnderlineButton active={true}>출결 상황</UnderlineButton>
        </NavigationBar>
        <AttendanceCalculator />
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="성적입력"
      />
    </>
  );
};

export default Attendance;

const NavigationBar = styled.div`
  width: 100%;
`;
