import { ROUTES } from '@/constants/common/constants';
import { useLogoutMutation } from '@/services/auth/mutations';
import { useRouter } from 'next/navigation';

export const useCTAButton = () => {
  const router = useRouter();
  const { logoutMutate } = useLogoutMutation();

  const handleMoveForm = () => {
    router.push(ROUTES.FORM);
  };

  const handleMoveManagement = () => {
    router.push(ROUTES.FORM_MANAGEMENT);
  };

  const handleMoveSimulation = () => {
    router.push(ROUTES.SIMULATION);
  };

  const handleMoveInquiry = () => {
    router.push('https://forms.gle/Y8n7wGuYbhz5wuFy8');
  };

  const handleLogout = () => {
    logoutMutate();
  };

  const handleMoveChangePassword = () => {
    router.push(ROUTES.PASSWORD);
  };

  const handleMoveWithdrawal = () => {
    router.push(ROUTES.WITHDRAWAL);
  };

  return {
    handleMoveForm,
    handleMoveManagement,
    handleMoveSimulation,
    handleMoveInquiry,
    handleLogout,
    handleMoveChangePassword,
    handleMoveWithdrawal,
  };
};
