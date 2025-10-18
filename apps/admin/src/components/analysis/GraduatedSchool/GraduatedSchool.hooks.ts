import { useState } from 'react';
import { useGraduatedSchoolListQuery } from '@/services/analysis/queries';
import type { AnalysisApplicantType, AreaCategory } from '@/types/analysis/client';

const useGraduatedSchool = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] =
    useState<keyof typeof stepMap>('전체 조회');
  const [areaCategory, setAreaCategory] = useState<AreaCategory>('');

  const stepMap: Record<string, AnalysisApplicantType[]> = {
    '전체 조회': ['RECEIVED', 'FIRST_PASSED', 'FIRST_FAILED', 'FAILED', 'PASSED'],
    '1차 합격자': ['FIRST_PASSED', 'FAILED', 'PASSED'],
    '2차 전형자': ['FAILED', 'PASSED'],
    '최종 합격자': ['PASSED'],
  };

  const handleAreaCategoryChange = (selectedValue: string) => {
    setAreaCategory(selectedValue as AreaCategory);
  };

  const { data: formList } = useGraduatedSchoolListQuery({
    statusList: stepMap[currentAnalysisPassStep],
    isBusan: areaCategory !== 'OTHER_AREA',
    gu: areaCategory === 'OTHER_AREA' ? '' : areaCategory,
  });

  return {
    currentAnalysisPassStep,
    setCurrentAnalysisPassStep,
    handleAreaCategoryChange,
    formList,
    stepMap,
  };
};

export default useGraduatedSchool;
