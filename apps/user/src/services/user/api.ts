import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import { GetUserRes } from '@/types/user/remote';

export const getUser = async () => {
  const { data } = await maru.get<GetUserRes>('/users', authorization());

  return data;
};

export const deleteUser = async (password: string) => {
  const { data } = await maru.delete('/users', { data: password, ...authorization() });

  return data;
};
