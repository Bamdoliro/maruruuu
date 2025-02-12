const formatFileName = (fileName: string) => {
  return fileName.length > 20 ? fileName.slice(37) : fileName;
};

export default formatFileName;
