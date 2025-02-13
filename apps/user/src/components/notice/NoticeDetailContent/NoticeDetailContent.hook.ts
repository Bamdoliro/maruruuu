import formatFileName from '@/utils/formatFileName';

export const useNoticeFile = () => {
  const handleFileDownload = async (fileUrl: string, fileName: string) => {
    const res = await fetch(fileUrl);
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = formatFileName(fileName || '');

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleOpenFileWindow = async (fileUrl: string) => {
    const res = await fetch(fileUrl);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    window.open(blobUrl);
    window.URL.revokeObjectURL(blobUrl);
  };

  return { handleFileDownload, handleOpenFileWindow };
};
