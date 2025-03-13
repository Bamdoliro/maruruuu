import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { ANALYSIS_PASS_STEP } from '@/constants/analysis/data';
import { useState } from 'react';
import { SwitchCase } from '@toss/react';
import GradeDistributionDetailTable from './GradeDistributionDetailTable/GradeDistributionDetailTable';

const GradeDistribution = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] = useState('1차 합격자');

  return (
    <StyledGradeDistribution>
      <NavigatorBar>
        {ANALYSIS_PASS_STEP.map((step, index) => (
          <UnderlineButton
            key={`form-pass-step-tab ${index}`}
            active={step === currentAnalysisPassStep}
            onClick={() => setCurrentAnalysisPassStep(step)}
          >
            {step}
          </UnderlineButton>
        ))}
      </NavigatorBar>
      <SwitchCase
        value={currentAnalysisPassStep}
        caseBy={{
          '1차 합격자': <GradeDistributionDetailTable />,
          '2차 전형자': <GradeDistributionDetailTable />,
          '최종 합격자': <GradeDistributionDetailTable />,
        }}
      />
    </StyledGradeDistribution>
  );
};

export default GradeDistribution;

const StyledGradeDistribution = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 40px;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
