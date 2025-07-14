import { Cookie } from '@/apis/cookie/cookie';
import { Storage } from '@/apis/storage/storage';
import { ROUTES, TOKEN } from '@/constants/common/constant';
import { useApiError } from '@/hooks';
import type { PostLoginAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteLogoutAdmin, postLoginAdmin } from './api';
import type { AxiosResponse } from 'axios';

const saveTokens = (accessToken: string, refreshToken: string) => {
  Storage.setItem(TOKEN.ACCESS, accessToken);
  Cookie.setItem(TOKEN.REFRESH, refreshToken);
};

const removeTokens = () => {
  Storage.removeItem(TOKEN.ACCESS);
  Cookie.removeItem(TOKEN.REFRESH);
};

export const useLoginAdminMutation = ({ phoneNumber, password }: PostLoginAuthReq) => {
  const router = useRouter();
  const { handleError } = useApiError();

  const { mutate: loginAdminMutate, ...restMutation } = useMutation({
    mutationFn: () => postLoginAdmin({ phoneNumber, password }),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      saveTokens(accessToken, refreshToken);
      router.replace(ROUTES.FORM);
    },
    onError: handleError,
  });

  return { loginAdminMutate, ...restMutation };
};

export const useLogoutAdminMutation = () => {
  const router = useRouter();

  const { mutate: logoutAdminMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogoutAdmin,
    onSuccess: () => {
      toast('로그아웃 되었습니다.', { type: 'success' });
      removeTokens();
      router.replace(ROUTES.MAIN);
    },
    onError: () => {
      toast('잠시후 다시 시도해주세요.', { type: 'error' });
    },
  });
  return { logoutAdminMutate, ...restMutation };
};
