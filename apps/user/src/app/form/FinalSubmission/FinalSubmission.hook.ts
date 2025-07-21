import { useUser, useDownloadFile, useToast } from '@/hooks';
import { useUploadFormMutation } from '@/services/form/mutations';
import { useExportFormQuery } from '@/services/form/queries';
import { useFinalFormStore, useFinalFormValueStore } from '@/stores/form/finalForm';
import { useCallback, useEffect, useState } from 'react';

export const useCTAButton = (openPdfLoader: () => void, closePdfLoader: () => void) => {
  const { userData } = useUser();
  const { toast } = useToast();
  const { data: exportFormData, isLoading: exportFormDataLoading } = useExportFormQuery();
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const downloadFile = useDownloadFile();
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
    if (exportFormDataLoading) {
      openPdfLoader();
    } else if (exportFormData && !hasDownloaded) {
      const blob = new Blob([exportFormData]);
      const blobUrl = window.URL.createObjectURL(blob);
      setPdfBlobUrl(blobUrl);
      downloadPdf();
      closePdfLoader();
    } else if (!exportFormData && !exportFormDataLoading) {
      toast('원서 데이터를 불러오지 못했습니다.', 'ERROR');
      closePdfLoader();
    }
  }, [exportFormData, exportFormDataLoading, hasDownloaded, openPdfLoader, downloadPdf, closePdfLoader, toast]);


  const handleExportForm = useCallback(() => {
    if (exportFormDataLoading) {
      openPdfLoader();
    } else if (pdfBlobUrl) {
      downloadPdf();
    } else if (exportFormData) {
      const blob = new Blob([exportFormData]);
      const blobUrl = window.URL.createObjectURL(blob);

      setPdfBlobUrl(blobUrl);
      downloadPdf();
    } else if (!exportFormData && !exportFormDataLoading) {
      toast('원서 데이터를 불러오지 못했습니다.', 'ERROR');
      closePdfLoader();
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
