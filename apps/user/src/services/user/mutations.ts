import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteUser } from './api';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';

export const useWithdrawalMutation = (password: string) => {
  const router = useRouter();

  const { mutate: withdrawalMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteUser(password),
    onSuccess: () => {
      toast('');
      router.replace(ROUTES.MAIN);
    },
    onError: () => {},
  });

  return { withdrawalMutate, restMutation };
};
