import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { postSaveForm, postSubmitDraftFrom } from './api';
import { Form } from '@/types/form/client';
import { useSetFormStepStore } from '@/stores';

export const useSaveFormMutation = () => {
  const { handleError } = useApiError();

  const { mutate: saveFormMutate, ...restMutation } = useMutation({
    mutationFn: (form: Form) => postSaveForm(form),
    onError: handleError,
  });

  return { saveFormMutate, ...restMutation };
};

export const useSubmitDraftFormMutation = (formData: Form) => {
  const { handleError } = useApiError();
  const setFormStep = useSetFormStepStore();

  const { mutate: submitDraftFormMutate, ...restMutation } = useMutation({
    mutationFn: () => postSubmitDraftFrom(formData),
    onSuccess: () => setFormStep('초안제출완료'),
    onError: handleError,
  });

  return { submitDraftFormMutate, ...restMutation };
};
