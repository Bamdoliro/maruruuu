import dayjs, { type Dayjs } from 'dayjs';

const formatFormYear = (date: string | Dayjs): string => {
  const d = typeof date === 'string' ? dayjs(date) : date;
  return String(d.year() + 1);
};

export default formatFormYear;
