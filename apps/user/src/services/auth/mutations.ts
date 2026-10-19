import type { PostLoginReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { deleteLogout, postLogin } from './api';
import { ROUTES } from '@/constants/common/constants';
import { clearStaleSession } from '@/apis/instance/session';
import { reserveLoginToast } from '@/utils';
import { useToast } from '@maru/hooks';

export const useLoginMutation = (
  device: 'COMPUTER' | 'MOBILE',
  { phoneNumber, password }: PostLoginReq,
) => {
  const { toast } = useToast();

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postLogin({ phoneNumber, password }),
    onSuccess: () => {
      // 이전 계정의 원서 상태(Jotai)와 쿼리 캐시가 남지 않도록 페이지를 새로 연다.
      reserveLoginToast(device);
      if (device === 'COMPUTER') {
        window.location.replace(ROUTES.MAIN);
      } else if (device === 'MOBILE') {
        window.location.reload();
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
  const { mutate: logoutMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogout,
    onSettled: async (_, error) => {
      if (error) await clearStaleSession();
      window.location.href = ROUTES.MAIN;
    },
  });

  return { logoutMutate, ...restMutation };
};
