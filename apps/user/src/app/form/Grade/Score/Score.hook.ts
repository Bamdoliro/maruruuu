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
    setFormGradeStep('출결상황');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormStep('전형선택');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
