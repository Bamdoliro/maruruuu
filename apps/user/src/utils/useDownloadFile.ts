const downloadFile = (data: string | Blob | undefined, fileName: string) => {
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
};

export default downloadFile;
