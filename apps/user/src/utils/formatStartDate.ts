const formatStartDate = (startDate: string) => {
  const date = new Date(startDate);

  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Intl.DateTimeFormat('ko-KR', options).format(date).replace(/\./g, '');
};

export default formatStartDate;
