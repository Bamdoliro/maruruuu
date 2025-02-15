import { PostLoginAuthReq } from '@/types/auth/remote';
import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';

export const postLoginAdmin = async ({ phoneNumber, password }: PostLoginAuthReq) => {
  const { data } = await maru.post('/auth', { phoneNumber, password });
  return data;
};

export const deleteLogoutAdmin = async () => {
  await maru.delete('/auth', authorization());
};
