import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useCorrectValueStore,
  useFormValueStore,
  useSetFormStepStore,
  useSetFormStore,
} from '@/stores';
import { useFormStep } from '@/utils';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const correct = useCorrectValueStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    if (correct === true) {
      FormStep({
        nextStep: '초안작성완료',
      });
    }

    FormStep({
      nextStep: '초안작성완료',
    });
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
