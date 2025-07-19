import { maru } from '@/apis/instance/instance';
import type { FairApplication } from '@/types/fair/client';
import type { GetFairListRes } from '@/types/fair/remote';

export const getFairList = async (fairType?: 'STUDENT_AND_PARENT' | 'TEACHER') => {
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
