import { Cookie } from '@/apis/cookie/cookie';
import { Storage } from '@/apis/storage/storage';
import { ROUTES, TOKEN } from '@/constants/common/constant';
import { useApiError } from '@/hooks';
import type { PostLoginAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@maru/hooks';
import { deleteLogoutAdmin, postLoginAdmin } from './api';
import type { AxiosResponse } from 'axios';
import checkIsAdmin from '@/utils/functions/checkIsAdmin';

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
  const { toast } = useToast();

  const { mutate: loginAdminMutate, ...restMutation } = useMutation({
    mutationFn: () => postLoginAdmin({ phoneNumber, password }),
    onSuccess: async (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      saveTokens(accessToken, refreshToken);
      try {
        const authority = await checkIsAdmin();
        if (authority) {
          router.replace(ROUTES.FORM);
        } else {
          toast('어드민 권한이 없습니다.', 'ERROR');
          removeTokens();
          router.replace(ROUTES.MAIN);
        }
      } catch (e) {
        toast('관리자 정보 조회 실패', 'ERROR');
        removeTokens();
        router.replace(ROUTES.MAIN);
      }
    },
    onError: handleError,
  });

  return { loginAdminMutate, ...restMutation };
};

export const useLogoutAdminMutation = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: logoutAdminMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogoutAdmin,
    onSuccess: () => {
      toast('로그아웃 되었습니다.', 'SUCCESS');
      removeTokens();
      router.replace(ROUTES.MAIN);
    },
    onError: () => {
      toast('잠시후 다시 시도해주세요.', 'ERROR');
    },
  });
  return { logoutAdminMutate, ...restMutation };
};
