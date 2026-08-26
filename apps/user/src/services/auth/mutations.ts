import type { PostLoginReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { deleteLogout, postLogin } from './api';
import { ROUTES } from '@/constants/common/constants';
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

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postLogin({ phoneNumber, password }),
    onSuccess: () => {
      setIsLoggedIn(true);
      if (device === 'COMPUTER') {
        toast('로그인 되었습니다.', 'SUCCESS');
        router.replace(ROUTES.MAIN);
      } else if (device === 'MOBILE') {
        toast('로그인 되었습니다.', 'SUCCESS', 'MOBILE');
        setStep('MAIN');
      }
    },
    onError: () => {
      if (device === 'COMPUTER') {
        toast('전화번호나 비밀번호를 다시 확인해주세요.', 'ERROR');
      } else if (device === 'MOBILE') {
        toast('전화번호나 비밀번호를 다시 확인해주세요.', 'ERROR', 'MOBILE');
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
