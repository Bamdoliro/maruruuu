import { useUser } from '@/hooks';
import { useExportFormQuery } from '@/services/form/queries';
import { downloadFile } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = (openPdfLoader: () => void, closePdfLoader: () => void) => {
  const { userData } = useUser();
  const { data: exportFormData } = useExportFormQuery();
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleSubmitFinalForm = () => {};

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
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

  const handleFormDocumentChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
  };

  return { handleFormDocumentChange, isUploadSuccessful };
};
