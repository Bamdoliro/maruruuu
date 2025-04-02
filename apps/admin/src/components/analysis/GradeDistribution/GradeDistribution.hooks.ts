import { useState } from 'react';
import { useGradeDistributionListQuery } from '@/services/analysis/queries';
import type { AnalysisApplicantType } from '@/types/analysis/client';
import { ANALYSIS_PASS_STEP } from '@/constants/analysis/constant';

const useGradeDistribution = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] =
    useState<keyof typeof stepMap>('전체 조회');

  const stepMap: Record<string, AnalysisApplicantType[]> = {
    '전체 조회': ['RECEIVED', 'FIRST_PASSED', 'FIRST_FAILED', 'FAILED', 'PASSED'],
    '1차 합격자': ['FIRST_PASSED', 'FAILED', 'PASSED'],
    '2차 전형자': ['FAILED', 'PASSED'],
    '최종 합격자': ['PASSED'],
  };

  const { data: formList } = useGradeDistributionListQuery({
    statusList: stepMap[currentAnalysisPassStep],
  });

  return {
    currentAnalysisPassStep,
    setCurrentAnalysisPassStep,
    formList,
    ANALYSIS_PASS_STEP,
  };
};

export default useGradeDistribution;
