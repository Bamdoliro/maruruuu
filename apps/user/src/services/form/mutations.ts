import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import {
  patchSubmitFinalForm,
  postSaveForm,
  postSubmitDraftFrom,
  postUploadForm,
  putUploadForm,
} from './api';
import { Form } from '@/types/form/client';
import { useSetFormStepStore } from '@/stores';
import { Dispatch, SetStateAction } from 'react';
import { FormDocument, FormPresignedUrlData } from '@/types/form/remote';

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

export const useSubmitFinalFormMutation = () => {
  const setFormStep = useSetFormStepStore();
  const { handleError } = useApiError();

  const { mutate: submitFinalFormMutate, ...restMutation } = useMutation({
    mutationFn: () => patchSubmitFinalForm(),
    onSuccess: () => setFormStep('최종제출완료'),
    onError: handleError,
  });

  return { submitFinalFormMutate, ...restMutation };
};

export const useUploadFormMutation = (
  setFormDocument: Dispatch<SetStateAction<FormDocument>>
) => {
  const { handleError } = useApiError();

  const { mutate: uploadFormMutate, ...restMutation } = useMutation({
    mutationFn: async (file: File) => {
      const presignedData = await postUploadForm();

      await putUploadForm(file, presignedData);

      return presignedData;
    },
    onSuccess: (presignedData: FormPresignedUrlData) => {
      setFormDocument((prev) => ({
        ...prev,
        formUrl: presignedData.downloadUrl,
        downloadUrl: presignedData.downloadUrl,
      }));
    },
    onError: handleError,
  });

  return { uploadFormMutate, ...restMutation };
};
