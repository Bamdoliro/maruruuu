export interface ScheduleDateTimes {
  applicationFormStart: string;
  applicationFormEnd: string;
  selectFirstPassAt: string;
  announcementOfFirstPass: string;
  meisterTalentEntranceTime: string;
  meisterTalentExclusionEntranceTime: string;
  codingTest: string;
  ncs: string;
  depthInterview: string;
  physicalExamination: string;
  announcementOfSecondPass: string;
  entranceRegistrationPeriodStart: string;
  entranceRegistrationPeriodEnd: string;
  admissionAndPledgeStart: string;
  admissionAndPledgeEnd: string;
  maintenanceStart: string | null;
  maintenanceEnd: string | null;
}

export type ScheduleKey = keyof ScheduleDateTimes;

export interface Schedule extends ScheduleDateTimes {
  admissionYear: number;
  version: number;
}
