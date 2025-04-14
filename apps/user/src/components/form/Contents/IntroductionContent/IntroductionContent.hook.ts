import { IntroductionSchema } from '@/schemas/IntroductionSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useCorrectStore,
  useFormStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
} from '@/stores';
import { useState, type ChangeEventHandler } from 'react';
import { z } from 'zod';

export const useIntoductionForm = () => {
  const [form, setForm] = useFormStore();
  const [correct, setCorrect] = useCorrectStore();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const onFieldChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      document: { ...prev.document, [name]: value },
    }));
  };

  const handleNextStep = () => {
    if (correct === true) {
      IntroductionSchema.parse(form.document);
      setErrors({});
      setFormStep('초안작성완료');
      saveFormMutate(form);
      setCorrect(false);
    }

    try {
      IntroductionSchema.parse(form.document);
      setErrors({});
      setFormStep('초안작성완료');
      saveFormMutate(form);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const normalizedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
        );
        setErrors(normalizedErrors);
      }
    }
  };

  const handlePreviousStep = () => {
    try {
      IntroductionSchema.parse(form.document);
      setErrors({});
      setFormStep('성적입력');
      setFormGradeStep('자격증');
      saveFormMutate(form);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const normalizedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
        );
        setErrors(normalizedErrors);
      }
    }
  };

  return { onFieldChange, handleNextStep, handlePreviousStep, errors };
};
