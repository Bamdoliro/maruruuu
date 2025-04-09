import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();

  const handleClose = () => {
    router.replace(ROUTES.MAIN);
  };

  const handleConfirm = () => {
    router.replace(ROUTES.LOGIN);
  };

  return { handleClose, handleConfirm };
};
