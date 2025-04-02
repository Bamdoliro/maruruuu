import { useApiError } from '@/hooks';
import type { EntrollmentDocument } from '@/types/enrollment/remote';
import { useMutation } from '@tanstack/react-query';
import type { Dispatch, SetStateAction } from 'react';
import { patchEnter, postEntrollmentDocument, putEntrollmentDocument } from './api';
import type { EntrollmentDocumentPresignedUrlData } from '@/types/enrollment/client';
import { useSetEntrollmentDocumentStore } from '@/stores';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';

export const useUploadEntrollmentDocumentMutation = (
  setEntrollmentDocument: Dispatch<SetStateAction<EntrollmentDocument>>
) => {
  const { handleError } = useApiError();

  const { mutate: uploadEntrollmentMutate, ...restMutation } = useMutation({
    mutationFn: async (file: File) => {
      const presignedData = await postEntrollmentDocument();

      await putEntrollmentDocument(file, presignedData);

      return presignedData;
    },
    onSuccess: (presignedData: EntrollmentDocumentPresignedUrlData) => {
      setEntrollmentDocument((prev) => ({
        ...prev,
        formUrl: presignedData.downloadUrl,
        downloadUrl: presignedData.downloadUrl,
      }));
    },
    onError: handleError,
  });

  return { uploadEntrollmentMutate, ...restMutation };
};

export const useChangeFormEnterStatusMutation = () => {
  const { handleError } = useApiError();
  const setEntrollmentDocument = useSetEntrollmentDocumentStore();
  const router = useRouter();

  const { mutate: changeFormEnterStatusMutate, ...restMutation } = useMutation({
    mutationFn: () => patchEnter(),
    onSuccess: () => {
      toast('서류가 제출 되었습니다.', { type: 'success' });
      router.push(ROUTES.MAIN);
      setEntrollmentDocument({ fileName: '', formUrl: '' });
    },
    onError: handleError,
  });

  return { changeFormEnterStatusMutate, ...restMutation };
};
