import { useLoginAdminMutation } from '@/services/auth/mutations';
import { PostLoginAuthReq } from '@/types/auth/remote';
import { ChangeEvent, useState } from 'react';

export const useLoginAction = (loginAdminData: PostLoginAuthReq) => {
  const { loginAdminMutate } = useLoginAdminMutation(loginAdminData);

  const handleLogin = () => {
    loginAdminMutate();
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
