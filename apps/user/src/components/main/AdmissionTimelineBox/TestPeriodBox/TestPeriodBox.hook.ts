import { ROUTES } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import { useRouter } from 'next/navigation';

export const useSchoolRecruitDate = () => {
  const schedule = useSchedule();
  const router = useRouter();
  const applicationStart = schedule.원서_접수.format('YYYY년 MM월 DD일 (ddd) HH:mm');
  const applicationEnd = schedule.원서_접수_마감.format('YYYY년 MM월 DD일 (ddd) HH:mm');

  const handleMoveFormPage = () => {
    router.push(ROUTES.FORM);
  };

  return { applicationStart, applicationEnd, handleMoveFormPage };
};
