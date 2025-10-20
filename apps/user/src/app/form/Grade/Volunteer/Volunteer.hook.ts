import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormGradeStepStore } from '@/stores';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormGradeStep('자격증');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      setFormGradeStep('교과성적');
    } else {
      setFormGradeStep('출결상황');
    }
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
