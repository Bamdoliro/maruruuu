import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useSetFormStepStore } from '@/stores';
import { useFormProfileValueStore } from '@/stores/form/formProfile';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useUser } from '@/hooks';
import { formatDate, useFormStep } from '@/utils';
import { z } from 'zod';

export const useApplicantForm = () => {
  const [form, setForm] = useFormStore();
  const profileUrl = useFormProfileValueStore();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();
  const { userData } = useUser();
  const { data: saveFormQuery } = useSaveFormQuery();

  const formatter: Record<string, (value: string) => string> = {
    birthday: (value) => formatDate(value.replace(/\D/g, '')),
    phoneNumber: (value) => value.replace(/\D/g, ''),
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        name: saveFormQuery?.applicant.name ?? userData.name,
        phoneNumber: saveFormQuery?.applicant.phoneNumber ?? userData.phoneNumber,
      },
    }));
  }, [
    saveFormQuery?.applicant.name,
    saveFormQuery?.applicant.phoneNumber,
    setForm,
    userData,
  ]);

  // 증명사진 URL이 변경되면 form에 반영
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        profile: profileUrl?.downloadUrl || '',
      },
    }));
  }, [profileUrl?.downloadUrl, setForm]);

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        [name]: formatter[name] ? formatter[name](value) : value,
      },
    }));
    if (errors[name]?.length) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleNextStep = () => {
    try {
      ApplicantSchema.parse(form.applicant);
      FormStep({
        schema: ApplicantSchema,
        formData: form.applicant,
        nextStep: '보호자정보',
        setErrors,
      });
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
      ApplicantSchema.parse(form.applicant);
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

  return { onFieldChange, handleNextStep, handlePreviousStep, errors };
};
