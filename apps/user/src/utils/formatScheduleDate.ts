import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const formatScheduleDate = (
  dates: (string | Dayjs)[],
  type?: 'FORM' | 'INTERVIEW' | 'REGISTRATION'
): string => {
  const formatDate = (date: Dayjs, withTime = true) => {
    const y = date.year();
    const m = date.month() + 1;
    const d = date.date();
    const hh = String(date.hour()).padStart(2, '0');
    const mm = String(date.minute()).padStart(2, '0');
    return withTime ? `${y}년 ${m}월 ${d}일 ${hh}:${mm}` : `${y}년 ${m}월 ${d}일`;
  };

  const toDayjs = (d: string | Dayjs) => (typeof d === 'string' ? dayjs(d) : d);

  if (dates.length === 1) {
    return formatDate(toDayjs(dates[0]), true);
  }

  if (dates.length === 2) {
    const start = toDayjs(dates[0]);
    const end = toDayjs(dates[1]);

    if (type === 'FORM') {
      return `${start.year()}년 ${
        start.month() + 1
      }월 ${start.date()}일 ~ ${end.date()}일 ${end.format('HH:mm')}`;
    }

    if (type === 'INTERVIEW') {
      return `${start.year()}년 ${start.month() + 1}월 ${start.date()}일 ${start.format(
        'HH:mm'
      )} ~ ${end.format('HH:mm')}`;
    }

    if (type === 'REGISTRATION') {
      return `${start.year()}년 ${
        start.month() + 1
      }월 ${start.date()}일 ~ ${end.date()}일`;
    }
  }

  return '';
};

export default formatScheduleDate;
