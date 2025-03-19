import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetFairListRes, GetFairDetailRes } from '@/types/fair/remote';

export const getFairList = async () => {
  const { data } = await maru.get<GetFairListRes>(`/fairs`);

  return data;
};

export const getFairDetail = async (id: number) => {
  const { data } = await maru.get<GetFairDetailRes>(`/fairs/${id}`, authorization());

  return data;
};
