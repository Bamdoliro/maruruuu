import { useUser, useDownloadFile } from '@/hooks';
import { useExportFormMutation, useUploadFormMutation } from '@/services/form/mutations';
import { finalFormAtom } from '@/stores';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useRef } from 'react';

export const useCTAButton = (openPdfLoader: () => void, closePdfLoader: () => void) => {
  const { userData } = useUser();
  const downloadFile = useDownloadFile();
  const { exportFormMutate, isPending: isExportFormPending } = useExportFormMutation();
  const final = useAtomValue(finalFormAtom);
  const hasAutoExported = useRef(false);
  const userNameRef = useRef(userData.name);
  userNameRef.current = userData.name;
  const { uploadFormMutate } = useUploadFormMutation(
    {
      fileName: final.fileName ?? '',
      mediaType: final.mediaType ?? '',
      fileSize: final.fileSize ?? 0,
    },
    final.file ?? null,
  );

  const handleSubmitFinalForm = () => {
    uploadFormMutate();
  };

  const handleExportForm = () => {
    if (isExportFormPending) return;

    openPdfLoader();
    exportFormMutate(undefined, {
      onSuccess: (data) =>
        downloadFile(
          data,
          `${userNameRef.current} 부산소프트웨어마이스터고등학교 원서접수.pdf`,
        ),
      onSettled: closePdfLoader,
    });
  };

  useEffect(() => {
    if (hasAutoExported.current) return;

    hasAutoExported.current = true;
    handleExportForm();
  });

  return { handleSubmitFinalForm, handleExportForm };
};

export const useInput = () => {
  const [final, setFinal] = useAtom(finalFormAtom);

  const handleFormDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFinal({
      fileName: file.name,
      mediaType: file.type,
      fileSize: file.size,
      file: file,
    });
  };

  return { handleFormDocumentChange, final };
};
