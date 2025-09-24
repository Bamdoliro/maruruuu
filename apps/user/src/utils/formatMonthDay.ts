import type { Dayjs } from 'dayjs';

const formatMonthDay = (date: Dayjs): string => {
  return date.format('MM월 DD일 (dd) HH:mm');
};

export default formatMonthDay;
