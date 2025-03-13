import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useFormValueStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
} from '@/stores';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormStep('자기소개서');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormGradeStep('출결상황');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
