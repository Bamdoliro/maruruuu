import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useCorrectStore,
  useFormValueStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
} from '@/stores';

export const useCTAButton = () => {
  const [correct, setCorrect] = useCorrectStore();
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    if (correct === true) {
      setFormStep('초안작성완료');
      saveFormMutate(form);
      setCorrect(false);
    }

    setFormStep('자기소개서');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormGradeStep('출결상황');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
