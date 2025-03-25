import { useUser } from '@/hooks';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormStepStore, useSetFormStore } from '@/stores';
import { formatDate } from '@/utils';
import { ChangeEventHandler, useEffect } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const handleNextStep = () => {
    setFormStep('보호자정보');
    saveFormMutate(form);
  };

  return { handleNextStep };
};

export const useInput = () => {
  const setForm = useSetFormStore();
  const { userData } = useUser();

  const formatter: Record<string, (value: string) => string> = {
    birthday: (value) => formatDate(value.replace(/\D/g, '')),
    phoneNumber: (value) => value.replace(/\D/g, ''),
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
      },
    }));
  }, [setForm, userData]);

  const handleApplicantInformationChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        [name]: formatter[name] ? formatter[name](value) : value,
      },
    }));
  };

  return { handleApplicantInformationChange };
};
