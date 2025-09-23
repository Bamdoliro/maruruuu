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

const SCHOOL_INFO_FIELDS_TO_RESET = [
  'schoolName',
  'schoolLocation',
  'schoolAddress',
  'schoolCode',
  'teacherName',
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

  const getCleanedEducationData = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      const cleanedEducation = { ...form.education };
      SCHOOL_INFO_FIELDS_TO_RESET.forEach((field) => {
        cleanedEducation[field] = null;
      });
      return cleanedEducation;
    }
    return form.education;
  };

  const handleNextStep = () => {
    try {
      const cleanedEducationData = getCleanedEducationData();
      FormStep({
        schema: EducationSchema,
        formData: cleanedEducationData,
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
      const cleanedEducationData = getCleanedEducationData();
      EducationSchema.parse(cleanedEducationData);
      setErrors({});
      setFormStep('보호자정보');

      const cleanedForm = {
        ...form,
        education: cleanedEducationData,
      };
      saveFormMutate(cleanedForm);
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
