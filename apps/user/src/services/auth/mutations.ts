import type { PostLoginReq } from '@/types/auth/remote';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { deleteLogout, postLogin } from './api';
import { ROUTES, USER_SCOPED_KEYS } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { useApiError } from '@/hooks';
import { stepAtom } from '@/stores';
import { useSetAtom } from 'jotai';
import { useAuthState, useToast } from '@maru/hooks';

export const useLoginMutation = (
  device: string,
  { phoneNumber, password }: PostLoginReq,
) => {
  const router = useRouter();
  const { toast } = useToast();
  const setStep = useSetAtom(stepAtom);
  const { setIsLoggedIn } = useAuthState();
  const queryClient = useQueryClient();

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postLogin({ phoneNumber, password }),
    onSuccess: () => {
      USER_SCOPED_KEYS.forEach((key) => queryClient.removeQueries({ queryKey: [key] }));
      setIsLoggedIn(true);
      if (device === 'COMPUTER') {
        toast('로그인 되었습니다.', 'SUCCESS');
        router.replace(ROUTES.MAIN);
      } else if (device === 'MOBILE') {
        toast('로그인 되었습니다.', 'SUCCESS', 'MOBILE');
        setStep('MAIN');
      }
    },
    onError: (error) => {
      const message =
        isAxiosError(error) && error.response?.status === 429
          ? '로그인 시도 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.'
          : '전화번호나 비밀번호를 다시 확인해주세요.';

      if (device === 'COMPUTER') {
        toast(message, 'ERROR');
      } else if (device === 'MOBILE') {
        toast(message, 'ERROR', 'MOBILE');
      }
    },
  });

  return { loginMutate, ...restMutation };
};

export const useLogoutMutation = () => {
  const { handleError } = useApiError();
  const { setIsLoggedIn } = useAuthState();

  const { mutate: logoutMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogout,
    onSuccess: () => {
      setIsLoggedIn(false);
      window.location.href = ROUTES.MAIN;
    },
    onError: handleError,
  });

  return { logoutMutate, ...restMutation };
};
