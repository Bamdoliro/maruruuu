import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import {
  getUploadProfile,
  patchSubmitFinalForm,
  postFormDocument,
  postSaveForm,
  postSubmitDraftForm,
  postUploadProfileImage,
  putFormCorrection,
  putProfileUpload,
  putUploadForm,
} from './api';
import type { Form } from '@/types/form/client';
import { useSetFormStepStore } from '@/stores';
import type { FileDocument } from '@/types/form/remote';
import { useSetFormProfileStore } from '@/stores/form/formProfile';

export const useSaveFormMutation = () => {
  const { handleError } = useApiError();

  const { mutate: saveFormMutate, ...restMutation } = useMutation({
    mutationFn: (form: Form) => postSaveForm(form),
    onError: handleError,
  });

  return { saveFormMutate, ...restMutation };
};

export const useSubmitDraftFormMutation = () => {
  const { handleError } = useApiError();
  const setFormStep = useSetFormStepStore();

  const { mutate: submitDraftFormMutate, ...restMutation } = useMutation({
    mutationFn: (formData: Form) => postSubmitDraftForm(formData),
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

export const useCorrectionFormMutation = () => {
  const { handleError } = useApiError();
  const setFormStep = useSetFormStepStore();

  const { mutate: correctionFormMutate, ...restMutation } = useMutation({
    mutationFn: (formData: Form) => putFormCorrection(formData),
    onSuccess: () => setFormStep('초안제출완료'),
    onError: handleError,
  });

  return { correctionFormMutate, ...restMutation };
};

export const usePutProfileImageMutation = (file: File | null) => {
  const { mutate: profileImageMutate, ...restMutation } = useMutation({
    mutationFn: (url: string) => putProfileUpload(file, url),
  });

  return { profileImageMutate, ...restMutation };
};

export const useUploadProfileMutation = (fileData: FileDocument, file: File | null) => {
  const setFormProfile = useSetFormProfileStore();
  const { profileImageMutate } = usePutProfileImageMutation(file);

  const { mutate: uploadProfileMutate, ...restMutation } = useMutation({
    mutationFn: () => postUploadProfileImage(fileData),
    onSuccess: (res) => {
      const { uploadUrl, downloadUrl } = res.data;
      setFormProfile({
        uploadUrl: uploadUrl,
        downloadUrl: downloadUrl,
      });
      profileImageMutate(uploadUrl);
    },
  });

  return { uploadProfileMutate, ...restMutation };
};

export const useGetRefreshProfileMutation = () => {
  const { mutate: getRefreshProfileMutate, ...restMutation } = useMutation({
    mutationFn: (downloadUrl: string) => getUploadProfile(downloadUrl),
  });

  return { getRefreshProfileMutate, ...restMutation };
};

export const useRefreshProfileMutation = (fileData: FileDocument) => {
  const setFormProfile = useSetFormProfileStore();
  const { getRefreshProfileMutate } = useGetRefreshProfileMutation();

  const { mutate: refreshProfileMutate, ...restMutation } = useMutation({
    mutationFn: () => postUploadProfileImage(fileData),
    onSuccess: (res) => {
      const { uploadUrl, downloadUrl } = res.data;
      setFormProfile({
        uploadUrl: uploadUrl,
        downloadUrl: downloadUrl,
      });
      getRefreshProfileMutate(downloadUrl);
    },
  });

  return { refreshProfileMutate, ...restMutation };
};

export const usePutFormMutation = (file: File | null) => {
  const { submitFinalFormMutate } = useSubmitFinalFormMutation();

  const { mutate: formMutate, ...restMutation } = useMutation({
    mutationFn: (url: string) => putUploadForm(file, url),
    onSuccess: () => {
      submitFinalFormMutate();
    },
  });

  return { formMutate, ...restMutation };
};

export const useUploadFormMutation = (fileData: FileDocument, file: File | null) => {
  const { formMutate } = usePutFormMutation(file);

  const { mutate: uploadFormMutate, ...restMutation } = useMutation({
    mutationFn: () => postFormDocument(fileData),
    onSuccess: (res) => {
      const { uploadUrl } = res.data;
      formMutate(uploadUrl);
    },
  });

  return { uploadFormMutate, ...restMutation };
};
