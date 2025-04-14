import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useCorrectValueStore,
  useFormValueStore,
  useSetFormGradeStepStore,
} from '@/stores';
import { useFormStep } from '@/utils';

export const useCTAButton = () => {
  const correct = useCorrectValueStore();
  const form = useFormValueStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    if (correct === true) {
      FormStep({
        nextStep: '초안작성완료',
      });
    }

    FormStep({
      nextStep: '자기소개서',
    });
  };

  const handlePreviousStep = () => {
    setFormGradeStep('출결상황');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
