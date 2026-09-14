import {
  useCorrectionFormMutation,
  useSubmitDraftFormMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { formAtom, formStepAtom, profileAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';
import type { Form } from '@/types/form/client';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setProfile = useSetAtom(profileAtom);
  const setFormStep = useSetAtom(formStepAtom);
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
              schoolPhoneNumber: null,
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
