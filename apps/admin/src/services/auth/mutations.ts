import { ROUTES } from '@/constants/common/constant';
import { useApiError } from '@/hooks';
import type { PostLoginAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '@maru/hooks';
import { deleteLogoutAdmin, postLoginAdmin } from './api';
import { maru } from '@/apis/instance/instance';
import type { GetAdminRes } from '@/types/admin/remote';

export const useLoginAdminMutation = ({ phoneNumber, password }: PostLoginAuthReq) => {
  const router = useRouter();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: loginAdminMutate, ...restMutation } = useMutation({
    mutationFn: () => postLoginAdmin({ phoneNumber, password }),
    onSuccess: async () => {
      try {
        const adminRes = await maru.get<GetAdminRes>('/users');
        if (adminRes.data.data?.authority !== 'ADMIN') {
          toast('어드민 권한이 없습니다.', 'ERROR');
          router.replace(ROUTES.MAIN);
          return;
        }
        localStorage.setItem('isLoggedIn', 'true');
        router.replace(ROUTES.FORM);
      } catch {
        toast('관리자 정보 조회 실패', 'ERROR');
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
      localStorage.removeItem('isLoggedIn');
      router.replace(ROUTES.MAIN);
    },
    onError: () => {
      toast('잠시후 다시 시도해주세요.', 'ERROR');
    },
  });
  return { logoutAdminMutate, ...restMutation };
};
