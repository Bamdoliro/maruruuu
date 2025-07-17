import { useUser } from '@/hooks';
import { useUploadFormMutation } from '@/services/form/mutations';
import { useExportFormQuery } from '@/services/form/queries';
import { useFinalFormStore, useFinalFormValueStore } from '@/stores/form/finalForm';
import { downloadFile } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

export const useCTAButton = (openPdfLoader: () => void, closePdfLoader: () => void) => {
  const { userData } = useUser();
  const { data: exportFormData } = useExportFormQuery();
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const final = useFinalFormValueStore();
  const { uploadFormMutate } = useUploadFormMutation(
    {
      fileName: final.fileName ?? '',
      mediaType: final.mediaType ?? '',
      fileSize: final.fileSize ?? 0,
    },
    final.file ?? null
  );

  const handleSubmitFinalForm = () => {
    uploadFormMutate();
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
  const [final, setFinal] = useFinalFormStore();

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
