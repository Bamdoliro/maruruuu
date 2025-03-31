import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/applicantSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useSaveFormQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStepStore, useSetFormStore } from '@/stores';
import { formatDate } from '@/utils';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { z } from 'zod';

export const useApplicantForm = () => {
  const form = useFormValueStore();
  const setForm = useSetFormStore();
  const setFormStep = useSetFormStepStore();
  const { userData } = useUser();
  const { saveFormMutate } = useSaveFormMutation();
  const { data: saveFormQuery } = useSaveFormQuery();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

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
  }, [setForm, userData]);

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

  return { onFieldChange, handleNextStep, errors };
};
