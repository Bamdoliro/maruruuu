import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import DetailTable from './DetailTable/DetailTable';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { AnalysisApplicantCountType } from '@/types/analysis/client';
import { ANALYSIS_STEP } from '@/constants/analysis/data';
import { useApplicantCountQuery } from '@/services/analysis/queries';

const ApplicationTypeRatio = () => {
  const [currentAnalysisStep, setCurrentAnalysisStep] =
    useState<keyof typeof stepMap>('변경 전');

  const stepMap: Record<string, AnalysisApplicantCountType> = {
    '변경 전': 'ORIGINAL',
    '변경 후': 'CURRENT',
  };

  const { data: formList } = useApplicantCountQuery({
    type: currentAnalysisStep as AnalysisApplicantCountType,
  });

  return (
    <StyledApplicationTypeRatio>
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
          '변경 전': <DetailTable formList={formList} />,
          '변경 후': <DetailTable formList={formList} />,
        }}
      />
    </StyledApplicationTypeRatio>
  );
};

export default ApplicationTypeRatio;

const StyledApplicationTypeRatio = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 40px;
`;

const NavigatorBar = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 60px;
`;
