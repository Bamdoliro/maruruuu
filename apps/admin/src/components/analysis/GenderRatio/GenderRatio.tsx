import { ANALYSIS_PASS_STEP } from '@/constants/analysis/constant';
import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import styled from '@emotion/styled';
import GenderRatioDetailTable from './GenderRatioDetailTable/GenderRatioDetailTable';
import useGenderRatio from './GenderRatio.hooks';

const GenderRatio = () => {
  const {
    currentAnalysisPassStep,
    setCurrentAnalysisPassStep,
    handleDataUpdate,
    RegularRatio,
    SpecialRatio,
    SupernumeraryRatio,
    totalMaleCount,
    totalFemaleCount,
  } = useGenderRatio();

  const totalCounts = {
    maleCount: totalMaleCount,
    femaleCount: totalFemaleCount,
    regularRatio: RegularRatio,
    specialRatio: SpecialRatio,
    supernumeraryRatio: SupernumeraryRatio,
  };

  const handleSetCurrentAnalysisPassStep = (step: string) => {
    setCurrentAnalysisPassStep(step);
  };

  return (
    <StyledGenderRatio>
      <NavigatorBar>
        {ANALYSIS_PASS_STEP.map((step, index) => (
          <UnderlineButton
            key={`form-pass-step-tab ${index}`}
            active={step === currentAnalysisPassStep}
            onClick={() => handleSetCurrentAnalysisPassStep(step)}
          >
            {step}
          </UnderlineButton>
        ))}
      </NavigatorBar>
      <SwitchCase
        value={currentAnalysisPassStep}
        caseBy={{
          '전체 조회': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              totalCounts={totalCounts}
            />
          ),
          '1차 합격자': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              totalCounts={totalCounts}
            />
          ),
          '2차 전형자': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              totalCounts={totalCounts}
            />
          ),
          '최종 합격자': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              totalCounts={totalCounts}
            />
          ),
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
