import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteUser } from './api';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';
import { useApiError } from '@/hooks';

export const useWithdrawalMutation = (password: string) => {
  const router = useRouter();
  const { handleError } = useApiError();

  const { mutate: withdrawalMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteUser(password),
    onSuccess: () => {
      toast('회원탈퇴가 성공되었습니다.', { type: 'success' });
      localStorage.clear();
      router.replace(ROUTES.MAIN);
    },
    onError: handleError,
  });

  return { withdrawalMutate, restMutation };
};
