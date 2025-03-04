import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { postSaveForm } from './api';
import { Form } from '@/types/form/client';

export const useSaveFormMutation = () => {
  const { handleError } = useApiError();

  const { mutate: saveFormMutate, ...restMutation } = useMutation({
    mutationFn: (form: Form) => postSaveForm(form),
    onError: handleError,
  });

  return { saveFormMutate, ...restMutation };
};
