import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();

  const handleMoveMain = () => {
    router.push(ROUTES.MAIN);
  };

  const handleSubmitWithrawal = () => {
    alert('탈퇴할 거임');
  };

  return { handleMoveMain, handleSubmitWithrawal };
};

export const useInput = () => {};
