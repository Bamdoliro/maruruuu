import {
  useCorrectionFormMutation,
  useSubmitDraftFormMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStepStore } from '@/stores';

export const useCTAButton = () => {
  const form = useFormValueStore();
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
    } else {
      submitDraftFormMutate();
    }
  };

  return { handleCheckAgainForm, handleSubmitDraftForm };
};
