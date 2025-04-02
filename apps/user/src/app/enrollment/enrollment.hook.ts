import {
  useChangeFormEnterStatusMutation,
  useUploadEntrollmentDocumentMutation,
} from '@/services/enrollment/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { useSetEntrollmentDocumentStore } from '@/stores';
import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useChangeStatusButton = () => {
  const { changeFormEnterStatusMutate } = useChangeFormEnterStatusMutation();

  const handleChangeStatusButtonClick = () => {
    changeFormEnterStatusMutate();
  };

  return { handleChangeStatusButtonClick };
};

export const useFileUpload = (openLoader: () => void, closeLoader: () => void) => {
  const setEntrollmentDocument = useSetEntrollmentDocumentStore();
  const { uploadEntrollmentMutate, isPending } =
    useUploadEntrollmentDocumentMutation(setEntrollmentDocument);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const handleFileChange = async (file: File) => {
    openLoader();
    try {
      await uploadEntrollmentMutate(file);
      setIsUploadSuccessful(true);
    } catch (e) {
      setIsUploadSuccessful(false);
    } finally {
      closeLoader();
    }
  };

  const handleDocumentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];

    setEntrollmentDocument((prev) => ({ ...prev, fileName: file.name }));

    handleFileChange(file);
  };

  return { handleDocumentChange, isUploadSuccessful, isPending };
};

export const useFormStatusCheck = () => {
  const { data: formStatusData } = useFormStatusQuery();

  const isFormPassed = formStatusData?.status === 'PASSED';

  return { isFormPassed };
};
