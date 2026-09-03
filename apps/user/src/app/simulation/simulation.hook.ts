import { formAtom } from '@/stores';
import type { GraduationType } from '@/types/form/client';
import { useAtom } from 'jotai';
import { useState } from 'react';

export const useNavigationClick = () => {
  const [form, setForm] = useAtom(formAtom);
  const [currentStep, setCurrentStep] = useState('성적 입력');

  const graduationType = form.education.graduationType;
  const isQualificationExam = graduationType === 'QUALIFICATION_EXAMINATION';

  const handleMoveStep = (step: string) => {
    if (isQualificationExam && step === '출결상황') {
      alert('검정고시 합격자는 출결상황 기본 점수가 부여돼요.');
      return;
    }
    setCurrentStep(step);
  };

  const handleChangeGraduationType = (value: string) => {
    const nextGraduationType = value as GraduationType;

    if (
      nextGraduationType === 'QUALIFICATION_EXAMINATION' &&
      currentStep === '출결상황'
    ) {
      setCurrentStep('성적 입력');
    }

    setForm((prev) => ({
      ...prev,
      education: { ...prev.education, graduationType: nextGraduationType },
    }));
  };

  return { handleMoveStep, currentStep, graduationType, handleChangeGraduationType };
};
