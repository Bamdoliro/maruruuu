import { useApiError } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import {
  getUploadProfile,
  patchSubmitFinalForm,
  postFormDocument,
  postSaveForm,
  postSubmitDraftFrom,
  postUploadProfileImage,
  putFormCorrection,
  putProfileUpoload,
  putUploadForm,
} from './api';
import type { Form } from '@/types/form/client';
import { useSetFormStepStore } from '@/stores';
import { Storage } from '@/apis/storage/storage';
import type { FormDocument, FormPresignedUrlData } from '@/types/form/remote';
import type { Dispatch, SetStateAction } from 'react';

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
      const fileData = {
        fileName: file.name,
        mediaType: file.type,
        fileSize: file.size,
      };

      const presignedData = await postFormDocument(fileData);
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

export const useUploadProfileImageMutation = () => {
  const { handleError } = useApiError();

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const fileData = {
        fileName: file.name,
        mediaType: file.type,
        fileSize: file.size,
      };

      Storage.setItem('fileName', fileData.fileName);
      Storage.setItem('mediaType', fileData.mediaType);
      Storage.setItem('fileSize', fileData.fileSize.toString());

      const presignedData = await postUploadProfileImage(fileData);
      await putProfileUpoload(file, presignedData);

      if (presignedData.downloadUrl) {
        const downloadUrl = await getUploadProfile(presignedData.downloadUrl);

        Storage.setItem('downloadUrl', downloadUrl);
        return downloadUrl;
      } else {
        return null;
      }
    },
    onError: handleError,
  });

  return mutation;
};

export const useRefreshProfileImageMutation = () => {
  const { handleError } = useApiError();

  const mutation = useMutation({
    mutationFn: async () => {
      const fileName = Storage.getItem('fileName');
      const mediaType = Storage.getItem('mediaType');
      const fileSize = Storage.getItem('fileSize');

      const fileData = {
        fileName: fileName ?? '',
        mediaType: mediaType ?? '',
        fileSize: Number(fileSize ?? '0'),
      };

      const presignedData = await postUploadProfileImage(fileData);
      const newDownloadUrl = await getUploadProfile(presignedData.downloadUrl);
      return newDownloadUrl;
    },
    onError: handleError,
  });

  return mutation;
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
