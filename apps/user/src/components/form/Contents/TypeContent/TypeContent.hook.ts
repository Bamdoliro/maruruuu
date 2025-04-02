import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormStepStore, useSetFormStore } from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
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
