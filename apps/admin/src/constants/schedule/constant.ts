import type { ScheduleKey } from '@/types/schedule/client';

interface ScheduleField {
  key: ScheduleKey;
  label: string;
  optional?: boolean;
}

interface ScheduleOrderRule {
  before: ScheduleKey;
  after: ScheduleKey;
  allowEqual?: boolean;
}

export const SCHEDULE_FIELDS: ScheduleField[] = [
  { key: 'applicationFormStart', label: '원서 접수 시작' },
  { key: 'applicationFormEnd', label: '원서 접수 마감' },
  { key: 'selectFirstPassAt', label: '1차 합격자 선발' },
  { key: 'announcementOfFirstPass', label: '1차 합격 발표' },
  { key: 'meisterTalentEntranceTime', label: '마이스터인재전형 입실' },
  { key: 'meisterTalentExclusionEntranceTime', label: '마이스터인재전형 외 입실' },
  { key: 'codingTest', label: '코딩 테스트' },
  { key: 'ncs', label: 'NCS' },
  { key: 'depthInterview', label: '심층 면접' },
  { key: 'physicalExamination', label: '신체검사' },
  { key: 'announcementOfSecondPass', label: '최종 합격 발표' },
  { key: 'entranceRegistrationPeriodStart', label: '입학 등록 시작' },
  { key: 'entranceRegistrationPeriodEnd', label: '입학 등록 마감' },
  { key: 'admissionAndPledgeStart', label: '입학 및 서약서 제출 시작' },
  { key: 'admissionAndPledgeEnd', label: '입학 및 서약서 제출 마감' },
  { key: 'maintenanceStart', label: '점검 시작', optional: true },
  { key: 'maintenanceEnd', label: '점검 종료', optional: true },
];

export const SCHEDULE_ORDER_RULES: ScheduleOrderRule[] = [
  { before: 'applicationFormStart', after: 'applicationFormEnd' },
  { before: 'applicationFormEnd', after: 'selectFirstPassAt' },
  { before: 'selectFirstPassAt', after: 'announcementOfFirstPass', allowEqual: true },
  { before: 'announcementOfFirstPass', after: 'meisterTalentEntranceTime' },
  { before: 'announcementOfFirstPass', after: 'meisterTalentExclusionEntranceTime' },
  { before: 'meisterTalentEntranceTime', after: 'codingTest', allowEqual: true },
  { before: 'meisterTalentExclusionEntranceTime', after: 'ncs', allowEqual: true },
  { before: 'codingTest', after: 'ncs' },
  { before: 'ncs', after: 'depthInterview' },
  { before: 'depthInterview', after: 'physicalExamination' },
  { before: 'physicalExamination', after: 'announcementOfSecondPass' },
  { before: 'announcementOfSecondPass', after: 'entranceRegistrationPeriodStart' },
  { before: 'entranceRegistrationPeriodStart', after: 'entranceRegistrationPeriodEnd' },
  {
    before: 'entranceRegistrationPeriodStart',
    after: 'admissionAndPledgeStart',
    allowEqual: true,
  },
  { before: 'admissionAndPledgeStart', after: 'admissionAndPledgeEnd' },
  {
    before: 'admissionAndPledgeEnd',
    after: 'entranceRegistrationPeriodEnd',
    allowEqual: true,
  },
  { before: 'maintenanceStart', after: 'maintenanceEnd' },
];
