import styled from 'styled-components';
import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import DetailTable from './ApplicantCountDetailTable/DetailTable';
import { ANALYSIS_STEP } from '@/constants/analysis/data';
import { useState } from 'react';
import { SwitchCase } from '@toss/react';

const ApplicantCount = () => {
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('변경 전');

  return (
    <StyledApplicantCount>
      <NavigatorBar>
        {ANALYSIS_STEP.map((step, index) => (
          <UnderlineButton
            key={`form-step-tab ${index}`}
            active={step === currentAnalysisStep}
            onClick={() => setCurrentAnalysisStep(step)}
          >
            {step}
          </UnderlineButton>
        ))}
      </NavigatorBar>
      <SwitchCase
        value={currentAnalysisStep}
        caseBy={{
          '변경 전': <DetailTable />,
          '변경 후': <DetailTable />,
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
