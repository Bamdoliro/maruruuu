import styled from '@emotion/styled';
import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import DetailTable from './ApplicantCountDetailTable/DetailTable';
import { ANALYSIS_STEP } from '@/constants/analysis/constant';
import { SwitchCase } from '@toss/react';
import useApplicantCount from './ApplicantCount.hooks';

const ApplicantCount = () => {
  const { currentAnalysisStep, setCurrentAnalysisStep, formList } = useApplicantCount();

  const handleSetCurrentAnalysisStep = (step: string) => {
    setCurrentAnalysisStep(step);
  };

  return (
    <StyledApplicantCount>
      <NavigatorBar>
        {ANALYSIS_STEP.map((step, index) => (
          <UnderlineButton
            key={`form-step-tab ${index}`}
            active={step === currentAnalysisStep}
            onClick={() => handleSetCurrentAnalysisStep(step)}
          >
            {step}
          </UnderlineButton>
        ))}
      </NavigatorBar>
      <SwitchCase
        value={currentAnalysisStep}
        caseBy={{
          '변경 전': <DetailTable formList={formList} />,
          '변경 후': <DetailTable formList={formList} />,
        }}
      />
    </StyledApplicantCount>
  );
};

export default ApplicantCount;

const StyledApplicantCount = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 40px;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
