import { maruAdmin } from '@/apis/instance/instance';
import type { GetScheduleRes, PutScheduleReq } from '@/types/schedule/remote';

export const getCurrentSchedule = async () => {
  const { data } = await maruAdmin.get<GetScheduleRes>('/schedules/current');

  return data;
};

export const putCurrentSchedule = async (params: PutScheduleReq) => {
  const { data } = await maruAdmin.put('/schedules/current', params);

  return data;
};
