import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import type { PostLoginReq } from '@/types/auth/remote';

export const postLogin = async ({ phoneNumber, password }: PostLoginReq) => {
  const { data } = await maru.post('/auth', { phoneNumber, password });

  return data;
};

export const deleteLogout = async () => {
  const { data } = await maru.delete('/auth', authorization());

  return data;
};
