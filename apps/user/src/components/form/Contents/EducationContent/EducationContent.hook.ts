import { EducationSchema } from '@/schemas/EducationSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useCorrectValueStore,
  useFormStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
} from '@/stores';
import { useFormStep } from '@/utils';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { z } from 'zod';

export const useEducationForm = () => {
  const [form, setForm] = useFormStore();
  const correct = useCorrectValueStore();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { run: FormStep } = useFormStep();

  const numberFiled = [
    'graduationYear',
    'teacherPhoneNumber',
    'teacherMobilePhoneNumber',
  ];

  const handleNextStep = () => {
    if (correct === true) {
      FormStep({
        schema: EducationSchema,
        formData: form.education,
        nextStep: '초안작성완료',
        setErrors,
      });
    }

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
