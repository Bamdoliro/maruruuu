import type { Schedule } from './client';

export interface GetScheduleRes {
  data: Schedule;
}

export type PutScheduleReq = Schedule;
