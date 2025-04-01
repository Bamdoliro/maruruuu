export const useFile = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = fileUrl.split('/').pop()?.split('?')[0] || 'download';

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
};

export const useFileView = async (fileUrl: string) => {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  window.open(url);

  window.URL.revokeObjectURL(url);
};
