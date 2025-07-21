import { useToast } from '@/hooks';

const useDownloadFile = () => {
  const { toast } = useToast();

  const downloadFile = (data: string | Blob | undefined, fileName: string) => {
    try {
      if (!data) return;

      let url: string;

      if (data instanceof Blob) {
        url = window.URL.createObjectURL(data);
      } else {
        url = data;
      }

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (data instanceof Blob) {
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast('파일 다운로드에 실패하였습니다.', 'ERROR');
    }
  };
  return downloadFile;
};

export default useDownloadFile;
