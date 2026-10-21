import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { KEY } from '@/constants/common/constants';
import { getCurrentSchedule } from './api';
import type { ScheduleRes } from './api';

const selectSchedule = ({ data }: ScheduleRes) => ({
  원서_접수: dayjs(data.applicationFormStart),
  원서_접수_마감: dayjs(data.applicationFormEnd),
  일차_합격_발표: dayjs(data.announcementOfFirstPass),
  이차_면접: dayjs(data.meisterTalentEntranceTime),
  이차_면접_종료: dayjs(data.physicalExamination),
  최종_합격_발표: dayjs(data.announcementOfSecondPass),
  입학_등록: dayjs(data.entranceRegistrationPeriodStart),
  입학_등록_마감: dayjs(data.entranceRegistrationPeriodEnd),
  점검_시작: dayjs(data.maintenanceStart),
  점검_끝: dayjs(data.maintenanceEnd),
});

export type Schedule = ReturnType<typeof selectSchedule>;

export class ScheduleUnavailableError extends Error {
  constructor() {
    super('입학 일정을 불러올 수 없습니다.');
    this.name = 'ScheduleUnavailableError';
  }
}

export const useScheduleQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHEDULE],
    queryFn: getCurrentSchedule,
    select: selectSchedule,
    staleTime: Infinity,
    retry: false,
    retryOnMount: false,
    refetchOnReconnect: false,
  });

  return { data, ...restQuery };
};

export const useSchedule = () => {
  const { data } = useScheduleQuery();

  if (!data) {
    throw new ScheduleUnavailableError();
  }

  return data;
};
