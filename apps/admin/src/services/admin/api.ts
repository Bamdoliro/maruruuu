import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import type { GetAdminRes } from '@/types/admin/remote';

export const getAdmin = async () => {
  const { data } = await maru.get<GetAdminRes>('/users', authorization());
  return data;
};
