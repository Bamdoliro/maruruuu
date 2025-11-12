import type { Dayjs } from 'dayjs';

const formatMonthDay = (date: Dayjs): string => {
  return date.format('M월 D일');
};

export default formatMonthDay;
