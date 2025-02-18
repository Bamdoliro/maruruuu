import { maru } from '@/apis/instance/instance';
import { PostLoginReq } from '@/types/auth/remote';

export const postLogin = async ({ phoneNumber, password }: PostLoginReq) => {
  const { data } = await maru.post('/auth', { phoneNumber, password });

  return data;
};
