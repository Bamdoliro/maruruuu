import { useApplicantCountQuery } from '@/services/analysis/queries';
import type { AnalysisApplicantCountType } from '@/types/analysis/client';
import { useState } from 'react';

const useApplicantCount = () => {
  const [currentAnalysisStep, setCurrentAnalysisStep] =
    useState<keyof typeof stepMap>('변경 전');

  const stepMap: Record<string, AnalysisApplicantCountType> = {
    '변경 전': 'ORIGINAL',
    '변경 후': 'CURRENT',
  };

  const { data: formList } = useApplicantCountQuery({
    type: stepMap[currentAnalysisStep],
  });

  return {
    currentAnalysisStep,
    setCurrentAnalysisStep,
    formList,
  };
};

export default useApplicantCount;
