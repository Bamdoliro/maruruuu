import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormGradeStepStore } from '@/stores';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormGradeStep('봉사시간');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormGradeStep('교과성적');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
