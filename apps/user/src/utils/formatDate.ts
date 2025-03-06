const formatDate = (value: string) => {
  const date = value.replace(/\D/g, '');

  let year = date.slice(0, 4);
  if (parseInt(year) > 2025) {
    year = '';
  }

  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  const formatDate = [year, month, day].filter(Boolean).join('-');

  return formatDate;
};

export default formatDate;
