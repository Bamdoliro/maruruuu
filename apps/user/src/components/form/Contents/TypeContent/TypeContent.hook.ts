import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useCorrectStore,
  useFormValueStore,
  useSetFormStepStore,
  useSetFormStore,
} from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const [correct, setCorrect] = useCorrectStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    if (correct === true) {
      setFormStep('초안작성완료');
      saveFormMutate(form);
      setCorrect(false);
    }

    setFormStep('성적입력');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormStep('출신학교및학력');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};

export const useRadio = () => {
  const setForm = useSetFormStore();

  const handleFormTypeChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { handleFormTypeChange };
};
