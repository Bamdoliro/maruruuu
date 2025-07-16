import type { PostLoginReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { deleteLogout, postLogin } from './api';
import type { AxiosResponse } from 'axios';
import { ROUTES, TOKEN } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { Storage } from '@/apis/storage/storage';

export const useLoginMutation = ({ phoneNumber, password }: PostLoginReq) => {
  const router = useRouter();

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postLogin({ phoneNumber, password }),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      router.replace(ROUTES.MAIN);
    },
    onError: () => {
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
      setTimeout(() => {
        window.location.reload();
      }, 500);
      localStorage.clear();
    },
    onError: () => {},
  });

  return { logoutMutate, ...restMutation };
};
