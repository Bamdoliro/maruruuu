const convertToApiDateTimeFormat = (dateTimeStr: string): string => {
  if (!/^\d{12}$/.test(dateTimeStr)) return '';
  const y = dateTimeStr.slice(0, 4);
  const m = dateTimeStr.slice(4, 6);
  const d = dateTimeStr.slice(6, 8);
  const h = dateTimeStr.slice(8, 10);
  const min = dateTimeStr.slice(10, 12);
  return `${y}-${m}-${d}T${h}:${min}:00`;
};

export default convertToApiDateTimeFormat;
