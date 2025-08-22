import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const formatResultDateTime = (date: Dayjs): string => {
  return date.format('YYYY년 M월 D일 (dd) HH:mm');
};

export default formatResultDateTime;
