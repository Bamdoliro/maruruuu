import { ROUTES } from '@/constants/common/constants';
import { useSetFormStepStore } from '@/stores';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const setFormStep = useSetFormStepStore();

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  const handleMoveFinalSubmit = () => {
    setFormStep('최종제출');
  };

  return { handleMoveMainPage, handleMoveFinalSubmit };
};
