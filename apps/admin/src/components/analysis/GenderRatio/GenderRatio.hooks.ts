import { useState } from 'react';
import { useGenderRatioListQuery } from '@/services/analysis/queries';
import {
  AnalysisApplicantType,
  FormTypeMainCategory,
  GenderRatioType,
} from '@/types/analysis/client';

const stepMap: Record<string, AnalysisApplicantType[]> = {
  '전체 조회': ['RECEIVED', 'FIRST_PASSED', 'FIRST_FAILED', 'FAILED', 'PASSED'],
  '1차 합격자': ['FIRST_PASSED', 'FAILED', 'PASSED'],
  '2차 전형자': ['FAILED', 'PASSED'],
  '최종 합격자': ['PASSED'],
};

const useGenderRatio = () => {
  const [currentAnalysisPassStep, setCurrentAnalysisPassStep] =
    useState<keyof typeof stepMap>('전체 조회');
  const [, setMainCategory] = useState<FormTypeMainCategory>('REGULAR');

  const handleDataUpdate = (data: FormTypeMainCategory) => {
    setMainCategory(data);
  };

  const fetchGenderRatioData = (category: FormTypeMainCategory) => {
    return (
      useGenderRatioListQuery({
        statusList: stepMap[currentAnalysisPassStep],
        mainCategory: category,
        type: currentAnalysisPassStep === '전체 조회' ? 'ORIGINAL' : 'CURRENT',
      }).data || []
    );
  };

  const RegularData = fetchGenderRatioData('REGULAR');
  const SpecialData = fetchGenderRatioData('SPECIAL');
  const SupernumeraryData = fetchGenderRatioData('SUPERNUMERARY');

  const calculateGenderRatio = (data: GenderRatioType[]) => {
    const totalMale = data.reduce(
      (acc, item) => acc + (item.busanMale || 0) + (item.otherLocationMale || 0),
      0
    );
    const totalFemale = data.reduce(
      (acc, item) => acc + (item.busanFemale || 0) + (item.otherLocationFemale || 0),
      0
    );
    return { totalMale, totalFemale };
  };

  const RegularRatio = calculateGenderRatio(RegularData);
  const SpecialRatio = calculateGenderRatio(SpecialData);
  const SupernumeraryRatio = calculateGenderRatio(SupernumeraryData);

  const totalMaleCount =
    RegularRatio.totalMale + SpecialRatio.totalMale + SupernumeraryRatio.totalMale;
  const totalFemaleCount =
    RegularRatio.totalFemale + SpecialRatio.totalFemale + SupernumeraryRatio.totalFemale;

  return {
    currentAnalysisPassStep,
    setCurrentAnalysisPassStep,
    handleDataUpdate,
    RegularRatio,
    SpecialRatio,
    SupernumeraryRatio,
    totalMaleCount,
    totalFemaleCount,
  };
};

export default useGenderRatio;
