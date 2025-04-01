const useDownloadFile = (data: string | undefined, fileName: string) => {
  if (!data) return;

  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export default useDownloadFile;
