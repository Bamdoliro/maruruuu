import type { Dayjs } from 'dayjs';

const formatMonthDayTime = (date: Dayjs): string => {
  return date.minute() === 0
    ? date.format('M월 D일 H시')
    : date.format('M월 D일 H시 m분');
};

export default formatMonthDayTime;
