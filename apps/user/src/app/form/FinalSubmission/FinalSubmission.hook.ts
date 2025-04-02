import { useUser } from '@/hooks';
import {
  useSubmitFinalFormMutation,
  useUploadFormMutation,
} from '@/services/form/mutations';
import { useExportFormQuery } from '@/services/form/queries';
import { useSetFormDocumentStore } from '@/stores';
import { downloadFile } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';

export const useCTAButton = (openPdfLoader: () => void, closePdfLoader: () => void) => {
  const { userData } = useUser();
  const { data: exportFormData } = useExportFormQuery();
  const { submitFinalFormMutate } = useSubmitFinalFormMutation();
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleSubmitFinalForm = () => {
    submitFinalFormMutate();
  };

  const downloadPdf = useCallback(() => {
    if (!pdfBlobUrl) return;

    downloadFile(
      pdfBlobUrl,
      `${userData.name} 부산소프트웨어마이스터고등학교 원서접수.pdf`
    );
    setPdfBlobUrl('');
    setHasDownloaded(true);
  }, [pdfBlobUrl, userData.name]);

  useEffect(() => {
    if (exportFormData && !hasDownloaded) {
      const blob = new Blob([exportFormData]);
      const blobUrl = window.URL.createObjectURL(blob);

      setPdfBlobUrl(blobUrl);
      downloadPdf();
      closePdfLoader();
    } else if (!exportFormData) {
      openPdfLoader();
    }
  }, [exportFormData, hasDownloaded, closePdfLoader, openPdfLoader, downloadPdf]);

  const handleExportForm = useCallback(() => {
    if (pdfBlobUrl) {
      downloadPdf();
    } else if (exportFormData) {
      const blob = new Blob([exportFormData]);
      const blobUrl = window.URL.createObjectURL(blob);

      setPdfBlobUrl(blobUrl);
      downloadPdf();
    } else {
      openPdfLoader();
    }
  }, [downloadPdf, openPdfLoader, exportFormData, pdfBlobUrl]);

  return { handleSubmitFinalForm, handleExportForm };
};

export const useInput = () => {
  const setFormDocument = useSetFormDocumentStore();
  const { uploadFormMutate } = useUploadFormMutation(setFormDocument);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const handleFormDocumentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    const file = files[0];

    uploadFormMutate(file, {
      onSuccess: () => {
        setFormDocument((prev) => ({ ...prev, fileName: file.name }));
        setIsUploadSuccessful(true);
      },
      onError: () => {
        setIsUploadSuccessful(false);
        toast('파일 업로드에 실패했습니다. 다시 시도해주세요.', { type: 'error' });
      },
    });
  };

  return { handleFormDocumentChange, isUploadSuccessful };
};
