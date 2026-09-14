import { ROUTES } from '@/constants/common/constants';
import { formStepAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const setFormStep = useSetAtom(formStepAtom);

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  const handleMoveFinalSubmit = () => {
    setFormStep('최종제출');
  };

  return { handleMoveMainPage, handleMoveFinalSubmit };
};
