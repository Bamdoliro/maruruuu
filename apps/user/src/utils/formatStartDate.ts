import dayjs from 'dayjs';

const formatStartDate = (startDate: string) => {
  const date = dayjs(startDate);

  if (!date.isValid()) {
    return '';
  }

  return date.format('MM월 DD일 (dd) HH:mm');
};

export default formatStartDate;
