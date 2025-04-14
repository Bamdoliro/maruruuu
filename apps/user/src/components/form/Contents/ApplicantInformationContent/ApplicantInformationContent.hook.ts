import { Storage } from '@/apis/storage/storage';
import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useCorrectValueStore, useFormValueStore, useSetFormStore } from '@/stores';
import { formatDate, useFormStep } from '@/utils';
import { useEffect, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { z } from 'zod';

export const useApplicantForm = () => {
  const form = useFormValueStore();
  const setForm = useSetFormStore();
  const { userData } = useUser();
  const { data: saveFormQuery } = useSaveFormQuery();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const correct = useCorrectValueStore();
  const { run: FormStep } = useFormStep();

  const fileName = Storage.getItem('fileName');
  const mediaType = Storage.getItem('mediaType');
  const fileSize = Storage.getItem('fileSize');

  const notUploadFile = !fileName || !mediaType || !fileSize;

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
    if (!fileName || !mediaType || !fileSize) {
      return;
    }

    if (correct === true) {
      FormStep({
        schema: ApplicantSchema,
        formData: form.applicant,
        nextStep: '초안작성완료',
        setErrors,
      });
    }

    try {
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

  return { onFieldChange, handleNextStep, errors, notUploadFile };
};
