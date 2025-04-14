import { useSetFormGradeStepStore, useSetFormStepStore } from '@/stores';
import type { FormStep } from '@/types/form/client';

export const useCTAButton = () => {
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();

  const handleCorrectGrade = () => {
    setFormStep('성적입력');
    setFormGradeStep('교과성적');
  };

  const handleCorrectForm = (step: FormStep) => {
    setFormStep(step);
  };

  return { handleCorrectGrade, handleCorrectForm };
};
