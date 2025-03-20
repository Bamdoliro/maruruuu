import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { ANALYSIS_PASS_STEP } from '@/constants/analysis/data';
import { useState } from 'react';
import { SwitchCase } from '@toss/react';
import GradeDistributionDetailTable from './GradeDistributionDetailTable/GradeDistributionDetailTable';
import { AnalysisApplicantType } from '@/types/analysis/client';
import { useGradeDistributionListQuery } from '@/services/analysis/queries';

const GradeDistribution = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] =
    useState<keyof typeof stepMap>('전체 조회');

  const stepMap: Record<string, string[]> = {
    '전체 조회': ['RECEIVED', 'FIRST_PASSED', 'FIRST_FAILED', 'FAILED', 'PASSED'],
    '1차 합격자': ['FIRST_PASSED', 'FAILED', 'PASSED'],
    '2차 전형자': ['FAILED', 'PASSED'],
    '최종 합격자': ['PASSED'],
  };

  const { data: formList } = useGradeDistributionListQuery({
    statusList: stepMap[currentAnalysisPassStep] as AnalysisApplicantType[],
  });

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
          '전체 조회': <GradeDistributionDetailTable formList={formList} />,
          '1차 합격자': <GradeDistributionDetailTable formList={formList} />,
          '2차 전형자': <GradeDistributionDetailTable formList={formList} />,
          '최종 합격자': <GradeDistributionDetailTable formList={formList} />,
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
