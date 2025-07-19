import {
  useCorrectionFormMutation,
  useSubmitDraftFormMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStepStore } from '@/stores';
import { useSetProfileStore } from '@/stores/form/profile';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const setProfile = useSetProfileStore();
  const setFormStep = useSetFormStepStore();
  const { submitDraftFormMutate } = useSubmitDraftFormMutation(form);
  const { correctionFormMutate } = useCorrectionFormMutation();
  const { data: statusData } = useFormStatusQuery();

  const handleCheckAgainForm = () => {
    setFormStep('지원자정보');
  };

  const handleSubmitDraftForm = () => {
    if (statusData?.status === 'REJECTED') {
      correctionFormMutate(form);
      setProfile({ fileName: '' });
    } else {
      submitDraftFormMutate();
      setProfile({ fileName: '' });
    }
  };

  return { handleCheckAgainForm, handleSubmitDraftForm };
};
