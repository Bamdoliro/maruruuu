import { FormController, VolunteerCalculator } from '@/components/form';
import { Column, UnderlineButton } from '@maru/ui';
import { styled } from 'styled-components';
import { useCTAButton } from './Volunteer.hook';

const Volunteer = () => {
  const { handleNextStep, handlePreviousStep } = useCTAButton();

  return (
    <>
      <Column gap={24}>
        <NavigationBar>
          <UnderlineButton active={true}>봉사시간</UnderlineButton>
        </NavigationBar>
        <VolunteerCalculator />
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="성적입력"
      />
    </>
  );
};

export default Volunteer;

const NavigationBar = styled.div`
  width: 100%;
`;
