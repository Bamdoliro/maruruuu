import { Storage } from '@/apis/storage/storage';
import { useSubmitDraftFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormStepStore } from '@/stores';
import { useMemo } from 'react';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setFormStep = useSetFormStepStore();
  const { submitDraftFormMutate } = useSubmitDraftFormMutation(form);

  const handleCheckAgainForm = () => {
    setFormStep('지원자정보');
  };

  const handleSubmitDraftForm = () => {
    submitDraftFormMutate();
  };

  return { handleCheckAgainForm, handleSubmitDraftForm };
};

const FIELD_RULES: Record<string, (value: string) => boolean> = {
  name: (v) => v.length >= 2,
  phoneNumber: (v) => v.length === 11,
  address: (v) => v.length <= 100,
  detailAddress: (v) => v.length <= 100,
  zoneCode: (v) => v.length === 5,
  schoolName: (v) => v.length <= 30,
  schoolLocation: (v) => v.length >= 2,
  schoolAddress: (v) => v.length >= 2,
  teacherName: (v) => v.length >= 2,
  graduationYear: (v) => v.length === 4,
  schoolCode: (v) => v.length === 7,
  schoolPhoneNumber: (v) => v.length >= 10,
  teacherMobilePhoneNumber: (v) => v.length <= 11,
};

const useFieldsCount = (data: Record<string, any>, extraInitialCount = 0) => {
  return Object.entries(data).reduce(
    (acc, [key, value]) => acc + (value && FIELD_RULES[key]?.(value) ? 1 : 0),
    extraInitialCount
  );
};

export const useCheckFilledForm = () => {
  const form = useFormValueStore();

  const applicantFilledCount = useFieldsCount(
    form.applicant,
    Storage.getItem('isUploadPicture') ? 1 : 0
  );
  const parentFilledCount = useFieldsCount(form.parent);
  const educationFilledCount = useMemo(() => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return (form.education.graduationYear ? 1 : 0) + 1;
    }
    return useFieldsCount(form.education);
  }, [form.education]);

  const typeFilledCount = form.type ? 1 : 0;
  const documentFilledCount = Object.values(form.document).filter(Boolean).length;

  const isFilledForm = useMemo(
    () =>
      applicantFilledCount === 5 &&
      parentFilledCount === 6 &&
      educationFilledCount ===
        (form.education.graduationType === 'QUALIFICATION_EXAMINATION' ? 2 : 9) &&
      typeFilledCount === 1 &&
      documentFilledCount === 2,
    [
      applicantFilledCount,
      parentFilledCount,
      educationFilledCount,
      typeFilledCount,
      documentFilledCount,
    ]
  );

  return {
    applicantFilledCount,
    parentFilledCount,
    educationFilledCount,
    typeFilledCount,
    documentFilledCount,
    isFilledForm,
  };
};
