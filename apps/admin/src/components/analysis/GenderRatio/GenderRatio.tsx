import { ANALYSIS_PASS_STEP } from '@/constants/analysis/data';
import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import styled from 'styled-components';
import GenderRatioDetailTable from './GenderRatioDetailTable/GenderRatioDetailTable';

const GenderRatio = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] = useState('1차 합격자');

  return (
    <StyledGenderRatio>
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
          '1차 합격자': <GenderRatioDetailTable />,
          '2차 전형자': <GenderRatioDetailTable />,
          '최종 합격자': <GenderRatioDetailTable />,
        }}
      />
    </StyledGenderRatio>
  );
};

export default GenderRatio;

const StyledGenderRatio = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 72px;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
