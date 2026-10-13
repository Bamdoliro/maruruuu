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
});

export type Schedule = ReturnType<typeof selectSchedule>;

export const useScheduleQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHEDULE],
    queryFn: getCurrentSchedule,
    select: selectSchedule,
    staleTime: Infinity,
  });

  return { data, ...restQuery };
};

export const useSchedule = () => {
  const { data } = useScheduleQuery();

  if (!data) {
    throw new Error('useSchedule은 ScheduleGate 내부에서만 사용할 수 있습니다.');
  }

  return data;
};
