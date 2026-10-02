import { ROUTES, SCHEDULE } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';

export const useSchoolRecruitDate = () => {
  const router = useRouter();
  const applicationStart = SCHEDULE.원서_접수.format('YYYY년 MM월 DD일 (ddd) HH:mm');
  const applicationEnd = SCHEDULE.원서_접수_마감.format('YYYY년 MM월 DD일 (ddd) HH:mm');

  const handleMoveFormPage = () => {
    router.push(ROUTES.FORM);
  };

  return { applicationStart, applicationEnd, handleMoveFormPage };
};
