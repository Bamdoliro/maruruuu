const useDownloadFile = (data: Blob | string | undefined, fileName: string) => {
  if (!data) return;

  const fileUrl = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(fileUrl);
};

export default useDownloadFile;
