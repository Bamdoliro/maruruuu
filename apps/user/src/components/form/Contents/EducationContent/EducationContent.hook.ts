import { EducationSchema } from '@/schemas/EducationSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useSetFormGradeStepStore, useSetFormStepStore } from '@/stores';
import { useFormStep } from '@/utils';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { z } from 'zod';

const NUMBER_FIELDS = [
  'graduationYear',
  'teacherPhoneNumber',
  'teacherMobilePhoneNumber',
] as const;

export const useEducationForm = () => {
  const [form, setForm] = useFormStore();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    try {
      FormStep({
        schema: EducationSchema,
        formData: form.education,
        nextStep: '전형선택',
        setErrors,
      });
      setFormGradeStep('교과성적');
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

    if (
      NUMBER_FIELDS.includes(name as (typeof NUMBER_FIELDS)[number]) &&
      /\D/.test(value)
    )
      return;

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
