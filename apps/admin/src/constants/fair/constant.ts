import { FairStatus } from '@/types/fair/client';

export const FAIR_STATUS: Record<FairStatus, string> = {
  APPLICATION_ENDED: '신청 종료',
  CLOSED: '마감',
  APPLICATION_IN_PROGRESS: '신청 가능',
  APPLICATION_NOT_STARTED: '신청 시작 전',
  APPLICATION_EARLY_CLOSED: '조기 마감',
} as const;
