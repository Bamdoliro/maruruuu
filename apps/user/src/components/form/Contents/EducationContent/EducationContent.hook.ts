import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormStepStore, useSetFormStore } from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormStep('전형선택');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormStep('보호자정보');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};

export const useInput = () => {
  const setForm = useSetFormStore();
  const numberFiled = [
    'graduationYear',
    'teacherPhoneNumber',
    'teacherMobilePhoneNumber',
  ];

  const handleEducationChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    if (numberFiled.includes(name) && /\D/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value,
      },
    }));
  };

  return { handleEducationChange };
};
