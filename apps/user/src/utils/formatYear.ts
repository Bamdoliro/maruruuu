import dayjs, { type Dayjs } from 'dayjs';

const formatYear = (date: string | Dayjs, addYear?: boolean): string => {
  const d = typeof date === 'string' ? dayjs(date) : date;
  return String(d.year() + (addYear ? 1 : 0));
};

export default formatYear;
