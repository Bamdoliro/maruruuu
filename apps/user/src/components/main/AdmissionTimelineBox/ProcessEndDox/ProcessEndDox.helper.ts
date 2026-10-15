import dayjs from 'dayjs';
import type { Schedule } from '@/services/schedule/queries';

export const processEnd = (schedule: Schedule) => {
  const today = dayjs().format('YYYY년 MM월 DD일 (ddd) HH:mm');
  const startDate = schedule.입학_등록_마감.format('YYYY년 MM월 DD일 (ddd) HH:mm');

  const now = dayjs().startOf('day');
  const registrationEnd = schedule.입학_등록_마감.startOf('day');

  const diff = now.diff(registrationEnd, 'day');
  const overDay = `D+${diff}`;

  return { today, startDate, overDay };
};
