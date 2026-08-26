import { useSaveFormMutation } from '@/services/form/mutations';
import { formAtom, formGradeStepAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFormStep } from '@/utils';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setFormGradeStep = useSetAtom(formGradeStepAtom);
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    FormStep({
      nextStep: '자기소개서',
    });
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
