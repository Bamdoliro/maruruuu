import { maru } from '@/apis/instance/instance';
import { FairApplication } from '@/types/fair/client';
import { GetFairListRes } from '@/types/fair/remote';

export const getFairList = async (fairType?: string) => {
  const { data } = await maru.get<GetFairListRes>(`/fairs?type=${fairType}`);

  return data;
};

export const postFairApplication = async (
  fairId: number,
  fairApplicationData: FairApplication
) => {
  const { data } = await maru.post(`/fairs/${fairId}`, fairApplicationData);

  return data;
};
