import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteUser, postSignUp } from './api';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/common/constants';
import { useApiError } from '@/hooks';
import { PostSignUpReq } from '@/types/user/remote';

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

export const useSignUpMutation = ({ phoneNumber, name, password }: PostSignUpReq) => {
  const router = useRouter();
  const { handleError } = useApiError();

  const { mutate: signUpMutate, ...restMutation } = useMutation({
    mutationFn: () => postSignUp({ phoneNumber, name, password }),
    onSuccess: () => {
      toast('회원가입 성공', { type: 'success' });
      router.replace(ROUTES.LOGIN);
    },
    onError: handleError,
  });

  return { signUpMutate, restMutation };
};
