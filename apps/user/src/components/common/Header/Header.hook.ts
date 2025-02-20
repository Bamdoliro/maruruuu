import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();

  const handleMoveLoginPage = () => {
    router.push(ROUTES.LOGIN);
  };

  const handleMoveSignupPage = () => {
    router.push(ROUTES.SIGNUP);
  };

  return { handleMoveLoginPage, handleMoveSignupPage };
};
