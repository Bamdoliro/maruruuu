import type { PostLoginReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { deleteLogout, postLogin } from './api';
import type { AxiosResponse } from 'axios';
import { ROUTES, TOKEN } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Cookie } from '@/apis/cookie/cookie';

export const useLoginMutation = ({ phoneNumber, password }: PostLoginReq) => {
  const router = useRouter();

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postLogin({ phoneNumber, password }),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      Cookie.setItem(TOKEN.ACCESS, accessToken);
      Cookie.setItem(TOKEN.REFRESH, refreshToken);
      router.replace(ROUTES.MAIN);
    },
    onError: () => {
      toast('아이디또는 비밀번호가 틀렸습니다.', { type: 'error' });
      localStorage.clear();
    },
  });

  return { loginMutate, ...restMutation };
};

export const useLogoutMutation = () => {
  const router = useRouter();

  const { mutate: logoutMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogout,
    onSuccess: () => {
      router.replace(ROUTES.MAIN);
      toast('로그아웃 되었습니다.', { type: 'success' });
      setTimeout(() => {
        window.location.reload();
      }, 500);
      localStorage.clear();
    },
    onError: () => {
      toast('잠시후 다시 시도해주세요.', { type: 'error' });
    },
  });

  return { logoutMutate, ...restMutation };
};
