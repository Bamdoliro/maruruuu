import { maru } from '@/apis/instance/instance';
import { GetFairListRes } from '@/types/fair/remote';

export const getFairList = async () => {
  const { data } = await maru.get<GetFairListRes>(`/fairs`);

  return data;
};
