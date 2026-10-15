import { maru } from '@/apis/instance/instance';

export interface ScheduleRes {
  data: {
    applicationFormStart: string;
    applicationFormEnd: string;
    announcementOfFirstPass: string;
    meisterTalentEntranceTime: string;
    physicalExamination: string;
    announcementOfSecondPass: string;
    entranceRegistrationPeriodStart: string;
    entranceRegistrationPeriodEnd: string;
    maintenanceStart: string | null;
    maintenanceEnd: string | null;
  };
}

export const getCurrentSchedule = async () => {
  const { data } = await maru.get<ScheduleRes>('/schedules/current');

  return data;
};
