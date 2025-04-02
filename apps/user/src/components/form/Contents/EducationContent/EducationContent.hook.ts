import { EducationSchema } from '@/schemas/EducationSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useSetFormStepStore } from '@/stores';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { z } from 'zod';

export const useEducationForm = () => {
  const [form, setForm] = useFormStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const numberFiled = [
    'graduationYear',
    'teacherPhoneNumber',
    'teacherMobilePhoneNumber',
  ];

  const handleNextStep = () => {
    try {
      EducationSchema.parse(form.education);
      setErrors({});
      setFormStep('전형선택');
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
      EducationSchema.parse(form.education);
      setErrors({});
      setFormStep('보호자정보');
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

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (numberFiled.includes(name) && /\D/.test(value)) return;

    setForm((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value,
      },
    }));

    if (errors[name]?.length) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  return { onFieldChange, handleNextStep, handlePreviousStep, errors };
};
