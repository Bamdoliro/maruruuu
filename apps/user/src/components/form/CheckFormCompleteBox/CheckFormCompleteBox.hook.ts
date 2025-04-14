import {
  useSetCorrectStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
} from '@/stores';
import type { FormStep } from '@/types/form/client';

export const useCTAButton = () => {
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const setCorrect = useSetCorrectStore();

  const handleCorrectGrade = () => {
    setFormStep('성적입력');
    setFormGradeStep('교과성적');
    setCorrect(true);
  };

  const handleCorrectForm = (step: FormStep) => {
    setFormStep(step);
    setCorrect(true);
  };

  return { handleCorrectGrade, handleCorrectForm };
};
