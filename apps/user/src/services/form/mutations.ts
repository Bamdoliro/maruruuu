import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getExportForm,
  getExportReceipt,
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
import { KEY } from '@/constants/common/constants';
import { formStepAtom, formProfileAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import type { FileDocument } from '@/types/form/remote';
import { useToast } from '@maru/hooks';

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
  const setFormStep = useSetAtom(formStepAtom);
  const queryClient = useQueryClient();

  const { mutate: submitDraftFormMutate, ...restMutation } = useMutation({
    mutationFn: (formData: Form) => postSubmitDraftForm(formData),
    onSuccess: () => {
      setFormStep('초안제출완료');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
      queryClient.invalidateQueries({ queryKey: [KEY.SAVE_FORM] });
    },
    onError: handleError,
  });

  return { submitDraftFormMutate, ...restMutation };
};

export const useSubmitFinalFormMutation = () => {
  const setFormStep = useSetAtom(formStepAtom);
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const { mutate: submitFinalFormMutate, ...restMutation } = useMutation({
    mutationFn: () => patchSubmitFinalForm(),
    onSuccess: () => {
      setFormStep('최종제출완료');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
    },
    onError: handleError,
  });

  return { submitFinalFormMutate, ...restMutation };
};

export const useCorrectionFormMutation = () => {
  const { handleError } = useApiError();
  const setFormStep = useSetAtom(formStepAtom);
  const queryClient = useQueryClient();

  const { mutate: correctionFormMutate, ...restMutation } = useMutation({
    mutationFn: (formData: Form) => putFormCorrection(formData),
    onSuccess: () => {
      setFormStep('초안제출완료');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
      queryClient.invalidateQueries({ queryKey: [KEY.SAVE_FORM] });
    },
    onError: handleError,
  });

  return { correctionFormMutate, ...restMutation };
};

interface PutProfileImageVariables {
  file: File | null;
  url: string;
}

interface UploadProfileVariables {
  fileData: FileDocument;
  file: File | null;
}

export const usePutProfileImageMutation = () => {
  const { mutate: profileImageMutate, ...restMutation } = useMutation({
    mutationFn: ({ file, url }: PutProfileImageVariables) => putProfileUpload(file, url),
  });

  return { profileImageMutate, ...restMutation };
};

export const useUploadProfileMutation = () => {
  const setFormProfile = useSetAtom(formProfileAtom);
  const { profileImageMutate } = usePutProfileImageMutation();

  const { mutate: uploadProfileMutate, ...restMutation } = useMutation({
    mutationFn: ({ fileData }: UploadProfileVariables) =>
      postUploadProfileImage(fileData),
    onSuccess: (res, { file }) => {
      const { uploadUrl, downloadUrl } = res.data;
      setFormProfile({
        uploadUrl: uploadUrl,
        downloadUrl: downloadUrl,
      });
      profileImageMutate({ file, url: uploadUrl });
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
  const setFormProfile = useSetAtom(formProfileAtom);
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

export const useExportFormMutation = () => {
  const { toast } = useToast();

  const { mutate: exportFormMutate, ...restMutation } = useMutation({
    mutationFn: getExportForm,
    onError: () => {
      toast('원서를 불러오지 못했습니다.', 'ERROR');
    },
  });

  return { exportFormMutate, ...restMutation };
};

export const useExportReceiptMutation = () => {
  const { toast } = useToast();

  const { mutate: exportReceiptMutate, ...restMutation } = useMutation({
    mutationFn: getExportReceipt,
    onError: () => {
      toast('접수증을 불러오지 못했습니다.', 'ERROR');
    },
  });

  return { exportReceiptMutate, ...restMutation };
};
