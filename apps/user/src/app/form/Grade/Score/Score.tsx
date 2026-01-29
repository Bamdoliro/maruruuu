import { FormController, GradeCalculator } from '@/components/form';
import { Column, UnderlineButton } from '@maru/ui';
import styled from '@emotion/styled';
import { useCTAButton } from './Score.hook';

const Score = () => {
  const { handleNextStep, handlePreviousStep, subjectError, newSubjectError } =
    useCTAButton();

  return (
    <>
      <Column gap={24}>
        <NavigationBar>
          <UnderlineButton active={true}>교과 성적</UnderlineButton>
        </NavigationBar>
        <GradeCalculator
          option="FORM"
          subjectError={subjectError}
          newSubjectError={newSubjectError}
        />
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="성적입력"
      />
    </>
  );
};

export default Score;

const NavigationBar = styled.div`
  width: 100%;
`;
