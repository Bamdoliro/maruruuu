import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useSetFormStepStore } from '@/stores';
import { GuardianSchema } from '@/schemas/GuardianSchema';
import { z } from 'zod';

export const useGuardianForm = () => {
  const [form, setForm] = useFormStore();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const formatter: Record<string, (value: string) => string> = {
    phoneNumber: (value) => value.replace(/\D/g, ''),
  };

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      parent: {
        ...prev.parent,
        [name]: formatter[name] ? formatter[name](value) : value,
      },
    }));

    if (errors[name]?.length) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleNextStep = () => {
    try {
      GuardianSchema.parse(form.parent);
      setErrors({});
      setFormStep('출신학교및학력');
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
      GuardianSchema.parse(form.parent);
      setErrors({});
      setFormStep('지원자정보');
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
