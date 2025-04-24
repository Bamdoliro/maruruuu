import { ROUTES } from '@/constants/common/constant';
import { useLoginAdminMutation } from '@/services/auth/mutations';
import type { PostLoginAuthReq } from '@/types/auth/remote';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ChangeEvent } from 'react';

export const useLoginAction = (loginAdminData: PostLoginAuthReq) => {
  const router = useRouter();
  const { loginAdminMutate } = useLoginAdminMutation(loginAdminData);

  const handleLogin = () => {
    loginAdminMutate();
    router.push(ROUTES.FORM);
  };

  return { handleLogin };
};

export const useInput = () => {
  const [loginAdminData, setLoginAdminData] = useState<PostLoginAuthReq>({
    phoneNumber: '',
    password: '',
  });

  const handleLoginAdminDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginAdminData({ ...loginAdminData, [name]: value });
  };

  return {
    loginAdminData,
    handleLoginAdminDataChange,
  };
};
