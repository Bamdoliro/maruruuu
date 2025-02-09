import { SCHEDULE } from '@/constants/form/constants';

export const schoolRecruitDate = () => {
  const applicationStart = SCHEDULE.원서_접수.format('YYYY년 MM월 DD일 (ddd) HH:mm');
  const applicationEnd = SCHEDULE.원서_접수_마감.format('YYYY년 MM월 DD일 (ddd) HH:mm');

  return { applicationStart, applicationEnd };
};
