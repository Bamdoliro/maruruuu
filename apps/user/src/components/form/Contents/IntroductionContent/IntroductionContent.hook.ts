import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useFormValueStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
  useSetFormStore,
} from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormStep('초안작성완료');
    setFormGradeStep('자격증');
    saveFormMutate(form);
  };

  const handlePreviousStep = () => {
    setFormStep('성적입력');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};

export const useTextArea = () => {
  const setForm = useSetFormStore();

  const handleIntoductionChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target: { name, value },
  }) => {
    setForm((prev) => ({ ...prev, document: { ...prev.document, [name]: value } }));
  };

  return { handleIntoductionChange };
};
