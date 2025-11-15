import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { SwitchCase } from '@toss/react';
import GradeDistributionDetailTable from './GradeDistributionDetailTable/GradeDistributionDetailTable';
import useGradeDistribution from './GradeDistribution.hooks';

const GradeDistribution = () => {
  const {
    currentAnalysisPassStep,
    setCurrentAnalysisPassStep,
    formList,
    ANALYSIS_PASS_STEP,
  } = useGradeDistribution();

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
          '전체 조회': (
            <GradeDistributionDetailTable formList={formList} selectedRound="전체 조회" />
          ),
          '1차 합격자': (
            <GradeDistributionDetailTable
              formList={formList}
              selectedRound="1차 합격자"
            />
          ),
          '2차 전형자': (
            <GradeDistributionDetailTable
              formList={formList}
              selectedRound="2차 전형자"
            />
          ),
          '최종 합격자': (
            <GradeDistributionDetailTable
              formList={formList}
              selectedRound="최종 합격자"
            />
          ),
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
