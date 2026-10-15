import { ROUTES } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import type { Schedule } from '@/services/schedule/queries';
import { formatDay } from '@/utils';
import { useInterval } from '@maru/hooks';
import type { ButtonStyleType } from '@maru/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

dayjs.locale('ko');
dayjs.extend(isBetween);
dayjs.extend(utc);

const getScheduleStatus = (schedule: Schedule) =>
  new Map([
    [schedule.원서_접수.toString(), '원서 접수 시작까지'],
    [schedule.이차_면접.toString(), '2차 전형 시작까지'],
    [schedule.최종_합격_발표.toString(), '최종합격자 발표'],
    [schedule.일차_합격_발표.toString(), '1차 합격자 발표'],
    [schedule.입학_등록.toString(), '입학 등록 시작까지'],
    [schedule.입학_등록_마감.toString(), '입학 등록 마감까지'],
  ]);

const UPDATE_INTERVAL = 1000;

const useDday = () => {
  const schedule = useSchedule();
  const getCurrentTime = () => {
    const now = dayjs();

    if (now.isBefore(schedule.원서_접수)) return schedule.원서_접수;
    if (now.isBefore(schedule.원서_접수_마감)) return schedule.원서_접수_마감;
    if (now.isBefore(schedule.일차_합격_발표.add(1, 'day')))
      return schedule.일차_합격_발표;
    if (now.isBefore(schedule.이차_면접)) return schedule.이차_면접;
    if (now.isBefore(schedule.이차_면접_종료)) return schedule.이차_면접_종료;
    if (now.isBefore(schedule.최종_합격_발표.add(1, 'day')))
      return schedule.최종_합격_발표;
    if (now.isBefore(schedule.입학_등록)) return schedule.입학_등록;
    if (now.isBefore(schedule.입학_등록_마감)) return schedule.입학_등록_마감;

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
  const schedule = useSchedule();
  const { currentTime, remainDays } = useDday();
  const now = dayjs();
  const timeDiff = dayjs.utc(currentTime.diff(now)).format('HH:mm:ss');

  const status =
    getScheduleStatus(schedule).get(currentTime.toString()) || '입학 전형 종료';

  const isEnrollmentDeadline = currentTime.isSame(schedule.입학_등록_마감);
  const remainTime =
    remainDays >= 1 || remainDays < 0 || isEnrollmentDeadline
      ? formatDay(remainDays)
      : timeDiff;

  const isInEnrollmentPeriod = now.isBetween(schedule.입학_등록, schedule.입학_등록_마감);
  const displayDate = isInEnrollmentPeriod ? schedule.입학_등록_마감 : currentTime;
  const targetDate = displayDate.locale('ko').format('YYYY년 MM월 DD일 (ddd) HH:mm');

  const isSecondRoundDay = now.isBetween(schedule.이차_면접, schedule.이차_면접_종료);
  const isAfterFormPeriod = dayjs().isBetween(
    schedule.원서_접수_마감,
    schedule.입학_등록,
  );

  return {
    status,
    remainTime,
    targetDate,
    isSecondRoundDay,
    isAfterFormPeriod,
  };
};

export const useButtonStatus = () => {
  const schedule = useSchedule();
  const { currentTime, remainDays } = useDday();
  const router = useRouter();

  const isSubmitPeriod = dayjs().isBetween(schedule.원서_접수, schedule.원서_접수_마감);

  const isPeriodOfViewing =
    (-2 < remainDays && remainDays <= 0) ||
    dayjs().isBetween(schedule.입학_등록, schedule.입학_등록_마감);

  const buttonStyleType: ButtonStyleType =
    isSubmitPeriod || isPeriodOfViewing ? 'PRIMARY' : 'DISABLED';

  const handleMovePage = () => {
    if (isPeriodOfViewing) {
      if (currentTime.isSame(schedule.일차_합격_발표)) {
        router.push(ROUTES.FIRST_RESULT);
      } else if (currentTime.isSame(schedule.최종_합격_발표)) {
        router.push(ROUTES.FINAL_RESULT);
      } else if (dayjs().isBetween(schedule.입학_등록, schedule.입학_등록_마감)) {
        router.push(ROUTES.ADMISSION_REGISTRATION);
      }
    }
  };

  const buttonText = dayjs().isBefore(schedule.원서_접수_마감)
    ? '원서 접수하기'
    : dayjs().isBetween(schedule.입학_등록, schedule.입학_등록_마감)
      ? '입학 등록하기'
      : '결과 확인하기';

  return {
    buttonStyleType,
    isSubmitPeriod,
    handleMovePage,
    buttonText,
  };
};
