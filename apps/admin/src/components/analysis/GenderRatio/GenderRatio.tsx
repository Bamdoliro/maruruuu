import { ANALYSIS_PASS_STEP } from '@/constants/analysis/data';
import { UnderlineButton } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import styled from 'styled-components';
import GenderRatioDetailTable from './GenderRatioDetailTable/GenderRatioDetailTable';
import { useGenderRatioListQuery } from '@/services/analysis/queries';
import {
  AnalysisApplicantType,
  FormTypeMainCategory,
  GenderRatioType,
} from '@/types/analysis/client';

const GenderRatio = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] =
    useState<keyof typeof stepMap>('전체 조회');
  const [mainCategory, setAreaCategory] = useState<FormTypeMainCategory>('REGULAR');

  const stepMap: Record<string, string[]> = {
    '전체 조회': ['RECEIVED', 'FIRST_PASSED', 'FIRST_FAILED', 'FAILED', 'PASSED'],
    '1차 합격자': ['FIRST_PASSED', 'FAILED', 'PASSED'],
    '2차 전형자': ['FAILED', 'PASSED'],
    '최종 합격자': ['PASSED'],
  };

  const handleDataUpdate = (data: FormTypeMainCategory) => {
    setAreaCategory(data);
  };

  const { data: formList } = useGenderRatioListQuery({
    statusList: stepMap[currentAnalysisPassStep] as AnalysisApplicantType[],
    mainCategory: mainCategory,
    type: currentAnalysisPassStep === '전체 조회' ? 'ORIGINAL' : 'CURRENT',
  });

  const { data: RegularData } = useGenderRatioListQuery({
    statusList: stepMap[currentAnalysisPassStep] as AnalysisApplicantType[],
    mainCategory: 'REGULAR',
    type: currentAnalysisPassStep === '전체 조회' ? 'ORIGINAL' : 'CURRENT',
  });

  const { data: SpecialData } = useGenderRatioListQuery({
    statusList: stepMap[currentAnalysisPassStep] as AnalysisApplicantType[],
    mainCategory: 'SPECIAL',
    type: currentAnalysisPassStep === '전체 조회' ? 'ORIGINAL' : 'CURRENT',
  });

  const { data: SupernumeraryData } = useGenderRatioListQuery({
    statusList: stepMap[currentAnalysisPassStep] as AnalysisApplicantType[],
    mainCategory: 'SUPERNUMERARY',
    type: currentAnalysisPassStep === '전체 조회' ? 'ORIGINAL' : 'CURRENT',
  });

  const calculateGenderRatio = (data: GenderRatioType[]) => {
    const totalMale = data?.reduce(
      (acc, item) => acc + (item.busanMale || 0) + (item.otherLocationMale || 0),
      0
    );
    const totalFemale = data?.reduce(
      (acc, item) => acc + (item.busanFemale || 0) + (item.otherLocationFemale || 0),
      0
    );
    return {
      totalMale,
      totalFemale,
    };
  };

  const RegularRatio = calculateGenderRatio(RegularData || []);
  const SpecialRatio = calculateGenderRatio(SpecialData || []);
  const SupernumeraryRatio = calculateGenderRatio(SupernumeraryData || []);

  const totalMaleCount =
    (RegularData?.reduce(
      (acc, item) => acc + (item.busanMale || 0) + (item.otherLocationMale || 0),
      0
    ) || 0) +
    (SpecialData?.reduce(
      (acc, item) => acc + (item.busanMale || 0) + (item.otherLocationMale || 0),
      0
    ) || 0) +
    (SupernumeraryData?.reduce(
      (acc, item) => acc + (item.busanMale || 0) + (item.otherLocationMale || 0),
      0
    ) || 0);

  const totalFemaleCount =
    (RegularData?.reduce(
      (acc, item) => acc + (item.busanFemale || 0) + (item.otherLocationFemale || 0),
      0
    ) || 0) +
    (SpecialData?.reduce(
      (acc, item) => acc + (item.busanFemale || 0) + (item.otherLocationFemale || 0),
      0
    ) || 0) +
    (SupernumeraryData?.reduce(
      (acc, item) => acc + (item.busanFemale || 0) + (item.otherLocationFemale || 0),
      0
    ) || 0);

  const totalCounts = {
    maleCount: totalMaleCount,
    femaleCount: totalFemaleCount,
    regularRatio: RegularRatio,
    specialRatio: SpecialRatio,
    supernumeraryRatio: SupernumeraryRatio,
  };

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
          '전체 조회': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              formList={formList}
              totalCounts={totalCounts}
            />
          ),
          '1차 합격자': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              formList={formList}
              totalCounts={totalCounts}
            />
          ),
          '2차 전형자': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              formList={formList}
              totalCounts={totalCounts}
            />
          ),
          '최종 합격자': (
            <GenderRatioDetailTable
              onDataUpdate={handleDataUpdate}
              formList={formList}
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
