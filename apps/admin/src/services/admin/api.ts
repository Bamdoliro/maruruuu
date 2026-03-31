import { maru } from '@/apis/instance/instance';
import type { GetAdminRes } from '@/types/admin/remote';

export const getAdmin = async () => {
  const { data } = await maru.get<GetAdminRes>('/users');
  return data;
};
