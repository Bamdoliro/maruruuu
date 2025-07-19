import dayjs from 'dayjs';

const formatApplicationDate = (applicationDate: string) => {
  const date = dayjs(applicationDate);

  if (!date.isValid()) {
    return '';
  }

  return date.format('YYYY.MM.DD');
};

export default formatApplicationDate;
