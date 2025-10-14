import { CertificateCalculator, FormController } from '@/components/form';
import { Column, UnderlineButton } from '@maru/ui';
import { styled } from 'styled-components';
import { useCTAButton } from './Certificate.hook';

const Certificate = () => {
  const { handleNextStep, handlePreviousStep } = useCTAButton();

  return (
    <>
      <Column gap={24}>
        <NavigationBar>
          <UnderlineButton active={true}>자격증</UnderlineButton>
        </NavigationBar>
        <CertificateCalculator />
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="성적입력"
      />
    </>
  );
};

export default Certificate;

const NavigationBar = styled.div`
  width: 100%;
`;
