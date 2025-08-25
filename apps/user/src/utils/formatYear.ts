import dayjs, { type Dayjs } from 'dayjs';

const formatYear = (date: string | Dayjs): string => {
  const d = typeof date === 'string' ? dayjs(date) : date;
  return String(d.year());
};

export default formatYear;
