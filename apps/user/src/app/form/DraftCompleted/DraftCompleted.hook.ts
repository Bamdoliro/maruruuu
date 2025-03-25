import { Storage } from '@/apis/storage/storage';
import { useSubmitDraftFormMutation } from '@/services/form/mutations';
import { useFormValueStore, useSetFormStepStore } from '@/stores';
import { Form } from '@/types/form/client';
import { useEffect, useState } from 'react';

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

const useApplicantFieldsCount = (applicant: Form['applicant']) => {
  return Object.entries(applicant).reduce(
    (acc, [key, value]) => {
      if (!value) return acc;

      if (key === 'name' && value.length >= 2) return acc + 1;
      if (key === 'phoneNumber' && value.length === 11) return acc + 1;

      return acc + 1;
    },
    Storage.getItem('isUploadPicture') ? 1 : 0
  );
};

const useParentFieldsCount = (parent: Form['parent']) =>
  Object.entries(parent).reduce((acc, [key, value]) => {
    if (!value) return acc;

    if (key === 'name' && value.length >= 2) return acc + 1;
    if (key === 'phoneNumber' && value.length === 11) return acc + 1;
    if ((key === 'address' || key === 'detailAddress') && value.length <= 100)
      return acc + 1;
    if (key === 'zoneCode' && value.length === 5) return acc + 1;

    return acc + 1;
  }, 0);

const useEducationFieldsCount = (education: Form['education']) => {
  return Object.entries(education).reduce((acc, [key, value]) => {
    if (education.graduationType === 'QUALIFICATION_EXAMINATION') {
      if (key === 'graduationType' || key === 'graduationYear') {
        return acc + 1;
      }
      return acc;
    }

    if (!value) return acc;

    if (key === 'schoolName' && value.length <= 30) return acc + 1;
    if (
      (key === 'schoolLocation' || key === 'schoolAddress' || key === 'teacherName') &&
      value.length >= 2
    )
      return acc + 1;
    if (key === 'graduationYear' && value.length === 4) return acc + 1;
    if (key === 'schoolCode' && value.length === 7) return acc + 1;
    if (key === 'schoolPhoneNumber' && value.length >= 10) return acc + 1;
    if (key === 'teacherMobilePhoneNumber' && value.length <= 11) return acc + 1;

    return acc + 1;
  }, 0);
};

export const useCheckFilledForm = () => {
  const form = useFormValueStore();

  const [formStepCount, setFormStepCount] = useState({
    isFilledForm: true,
    applicantFilledCount: 0,
    parentFilledCount: 0,
    educationFilledCount: 0,
    typeFilledCount: 0,
    documentFilledCount: 0,
  });

  const filledApplicantFieldsCount = useApplicantFieldsCount(form.applicant);
  const filledParentFieldsCount = useParentFieldsCount(form.parent);
  const filledEducationFieldsCount = useEducationFieldsCount(form.education);
  const filledTypeFieldCount = form.type ? 1 : 0;
  const filledDocumentFieldsCount = Object.values(form.document).filter(
    (value) => !!value
  ).length;

  useEffect(() => {
    const isFormFilled =
      filledApplicantFieldsCount === 5 &&
      filledParentFieldsCount === 6 &&
      filledEducationFieldsCount ===
        (form.education.graduationType === 'QUALIFICATION_EXAMINATION' ? 2 : 9) &&
      filledTypeFieldCount === 1 &&
      filledDocumentFieldsCount === 2;

    setFormStepCount((prev) => ({
      ...prev,
      isFilledForm: isFormFilled,
      applicantFilledCount: filledApplicantFieldsCount,
      parentFilledCount: filledParentFieldsCount,
      educationFilledCount: filledEducationFieldsCount,
      typeFilledCount: filledTypeFieldCount,
      documentFilledCount: filledDocumentFieldsCount,
    }));
  }, [
    filledApplicantFieldsCount,
    filledDocumentFieldsCount,
    filledEducationFieldsCount,
    filledParentFieldsCount,
    filledTypeFieldCount,
    form.applicant,
    form.document,
    form.education,
    form.parent,
    form.type,
  ]);

  const {
    applicantFilledCount,
    parentFilledCount,
    educationFilledCount,
    typeFilledCount,
    documentFilledCount,
    isFilledForm,
  } = formStepCount;

  return {
    applicantFilledCount,
    parentFilledCount,
    educationFilledCount,
    typeFilledCount,
    documentFilledCount,
    isFilledForm,
  };
};
