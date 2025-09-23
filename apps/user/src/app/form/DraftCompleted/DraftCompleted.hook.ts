import {
  useCorrectionFormMutation,
  useSubmitDraftFormMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStepStore } from '@/stores';
import { useSetProfileStore } from '@/stores/form/profile';
import type { Form } from '@/types/form/client';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setProfile = useSetProfileStore();
  const setFormStep = useSetFormStepStore();
  const { submitDraftFormMutate } = useSubmitDraftFormMutation();
  const { correctionFormMutate } = useCorrectionFormMutation();
  const { data: statusData } = useFormStatusQuery();

  const handleCheckAgainForm = () => {
    setFormStep('지원자정보');
  };

  const handleSubmitDraftForm = () => {
    const newForm: Form =
      form.education.graduationType === 'QUALIFICATION_EXAMINATION'
        ? {
            ...form,
            education: {
              ...form.education,
              schoolName: null,
              schoolLocation: null,
              schoolAddress: null,
              schoolCode: null,
              teacherName: null,
              teacherPhoneNumber: null,
              teacherMobilePhoneNumber: null,
            },
          }
        : { ...form };

    if (statusData?.status === 'REJECTED') {
      correctionFormMutate(newForm);
      setProfile({ fileName: '' });
    } else {
      submitDraftFormMutate(newForm);
      setProfile({ fileName: '' });
    }
  };

  return { handleCheckAgainForm, handleSubmitDraftForm };
};
