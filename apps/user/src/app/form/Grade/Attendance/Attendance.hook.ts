import { useSaveFormMutation } from '@/services/form/mutations';
import { formAtom, formGradeStepAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setFormGradeStep = useSetAtom(formGradeStepAtom);
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
