import { useSaveFormMutation } from '@/services/form/mutations';
import { formAtom, formGradeStepAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setFormGradeStep = useSetAtom(formGradeStepAtom);
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormGradeStep('가산점');
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
