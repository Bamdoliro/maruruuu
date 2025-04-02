import type { ChangeEventHandler } from 'react';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormStepStore, useSetFormStore } from '@/stores';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormStep('출신학교및학력');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormStep('지원자정보');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};

export const useInput = () => {
  const setForm = useSetFormStore();

  const formatter: Record<string, (value: string) => string> = {
    phoneNumber: (value) => value.replace(/\D/g, ''),
  };

  const handleGuardianInformationChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setForm((prev) => ({
      ...prev,
      parent: {
        ...prev.parent,
        [name]: formatter[name] ? formatter[name](value) : value,
      },
    }));
  };

  return { handleGuardianInformationChange };
};
