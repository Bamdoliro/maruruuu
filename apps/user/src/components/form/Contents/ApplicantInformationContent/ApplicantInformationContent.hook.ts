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
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
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
        profile: saveFormQuery?.applicant.profile || prev.applicant.profile,
      },
    }));
  }, [
    saveFormQuery?.applicant.name,
    saveFormQuery?.applicant.phoneNumber,
    saveFormQuery?.applicant.profile,
    setForm,
    userData.name,
    userData.phoneNumber,
  ]);

  useEffect(() => {
    if (profileUrl?.downloadUrl && profileUrl.downloadUrl !== form.applicant.profile) {
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          profile: profileUrl.downloadUrl,
        },
      }));
    }
  }, [profileUrl?.downloadUrl, form.applicant.profile, setForm]);

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
    console.log('hasUploadedImage:', hasUploadedImage);
    const hasValidProfile =
      hasUploadedImage && (profileUrl?.downloadUrl || profileUrl?.uploadUrl);
    const profileValue = hasValidProfile
      ? profileUrl?.downloadUrl || profileUrl?.uploadUrl || 'uploaded'
      : '';
    console.log('profileValue:', profileValue);

    const currentApplicantData = {
      ...form.applicant,
      profile: profileValue,
    };

    if (hasValidProfile && form.applicant.profile !== profileValue) {
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          profile: profileValue,
        },
      }));
    }

    try {
      ApplicantSchema.parse(currentApplicantData);
      FormStep({
        schema: ApplicantSchema,
        formData: currentApplicantData,
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

  const handleUploadStateChange = (hasImage: boolean) => {
    console.log('handleUploadStateChange called with:', hasImage);
    setHasUploadedImage(hasImage);
  };

  return {
    onFieldChange,
    handleNextStep,
    handlePreviousStep,
    errors,
    handleUploadStateChange,
  };
};
