import { ROUTES } from '@/constants/common/constants';
import { SCHEDULE } from '@/constants/form/constants';
import { formatDay } from '@/utils';
import { useInterval } from '@maru/hooks';
import type { ButtonStyleType } from '@maru/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.locale('ko');

const SCHEDULE_STATUS = new Map([
  [SCHEDULE.원서_접수.toString(), '원서 접수 시작까지'],
  [SCHEDULE.이차_면접.toString(), '2차 전형 시작까지'],
  [SCHEDULE.최종_합격_발표.toString(), '최종합격자 발표'],
  [SCHEDULE.일차_합격_발표.toString(), '1차 합격자 발표'],
  [SCHEDULE.입학_등록.toString(), '입학 등록 기간'],
]);

const UPDATE_INTERVAL = 1000;

const useDday = () => {
  const getCurrentTime = () => {
    const now = dayjs();

    if (now.isBefore(SCHEDULE.원서_접수)) return SCHEDULE.원서_접수;
    if (now.isBefore(SCHEDULE.원서_접수_마감)) return SCHEDULE.원서_접수_마감;
    if (now.isBefore(SCHEDULE.일차_합격_발표.add(1, 'day')))
      return SCHEDULE.일차_합격_발표;
    if (now.isBefore(SCHEDULE.이차_면접)) return SCHEDULE.이차_면접;
    if (now.isBefore(SCHEDULE.이차_면접_종료)) return SCHEDULE.이차_면접_종료;
    if (now.isBefore(SCHEDULE.최종_합격_발표.add(1, 'day')))
      return SCHEDULE.최종_합격_발표;
    if (now.isBetween(SCHEDULE.입학_등록, SCHEDULE.입학_등록_마감))
      return SCHEDULE.입학_등록;

    return now;
  };

  const currentTime = getCurrentTime();
  const [remainDays, setRemainDays] = useState(0);

  useEffect(() => {
    setRemainDays(currentTime.diff(dayjs().startOf('day'), 'days', true));
  }, [currentTime]);

  useInterval(() => {
    setRemainDays(currentTime.diff(dayjs(), 'days', true));
  }, UPDATE_INTERVAL);

  return {
    currentTime,
    remainDays,
  };
};

export const useRemainDate = () => {
  const { currentTime, remainDays } = useDday();
  const now = dayjs();
  const timeDiff = dayjs.utc(currentTime.diff(now)).format('HH:mm:ss');

  const status = SCHEDULE_STATUS.get(currentTime.toString());
  const remainTime = remainDays >= 1 || remainDays < 0 ? formatDay(remainDays) : timeDiff;
  const targetDate = currentTime.format('YYYY년 MM월 DD일 (ddd) HH:mm');
  const isSecondRoundDay = now.isBetween(SCHEDULE.이차_면접, SCHEDULE.이차_면접_종료);

  return {
    status,
    remainTime,
    targetDate,
    isSecondRoundDay,
  };
};

export const useButtonStatus = () => {
  const { currentTime, remainDays } = useDday();
  const router = useRouter();

  const isSubmitPeriod = dayjs().isBetween(SCHEDULE.원서_접수, SCHEDULE.원서_접수_마감);

  const isPeriodOfViewing =
    (-2 < remainDays && remainDays <= 0) ||
    dayjs().isBetween(SCHEDULE.입학_등록, SCHEDULE.입학_등록_마감);

  const buttonStyleType: ButtonStyleType =
    isSubmitPeriod || isPeriodOfViewing ? 'PRIMARY' : 'DISABLED';

  const handleMovePage = () => {
    if (isPeriodOfViewing) {
      if (currentTime.isSame(SCHEDULE.일차_합격_발표)) {
        router.push(ROUTES.FIRST_RESULT);
      } else if (currentTime.isSame(SCHEDULE.최종_합격_발표)) {
        router.push(ROUTES.FINAL_RESULT);
      } else if (dayjs().isBetween(SCHEDULE.입학_등록, SCHEDULE.입학_등록_마감)) {
        router.push(ROUTES.ADMISSION_REGISTRATION);
      }
    }
  };

  const buttonText = dayjs().isBefore(SCHEDULE.원서_접수_마감)
    ? '원서 접수하기'
    : dayjs().isBetween(SCHEDULE.입학_등록, SCHEDULE.입학_등록_마감)
    ? '입학 등록하기'
    : '결과 확인하기';

  return {
    buttonStyleType,
    isSubmitPeriod,
    handleMovePage,
    buttonText,
  };
};
