import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';

export const useWithdrawalAction = () => {
  const handleWithrawal = () => {
    alert('탈퇴할 거임');
  };

  return { handleWithrawal };
};

export const useCTAButton = () => {
  const router = useRouter();

  const handleMoveMain = () => {
    router.push(ROUTES.MAIN);
  };

  return { handleMoveMain };
};

export const useInput = () => {};
