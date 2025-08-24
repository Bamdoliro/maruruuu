import type { Certificate } from '@/types/form/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const SCHEDULE = {
  원서_접수: dayjs(process.env.NEXT_PUBLIC_FORM_START),
  원서_접수_마감: dayjs(process.env.NEXT_PUBLIC_FORM_END),
  일차_합격_발표: dayjs(process.env.NEXT_PUBLIC_FIRST_RESULT),
  이차_면접: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_START),
  이차_면접_종료: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_END),
  최종_합격_발표: dayjs(process.env.NEXT_PUBLIC_FINAL_RESULT),
  입학_등록: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_START),
  입학_등록_마감: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_END),
};

export const SCORE = {
  REGULAR_TYPE: 80,
  SPECIAL_TYPE: 48,
  ATTENDANCE: 14,
  VOLUNTEER: 14,
  MIN_ATTENDANCE: 0,
  MAX_ATTENDANCE: 18,
  MIN_VOLUNTEER: 0,
  MAX_VOLUNTEER: 18,
};

export const COUNT = {
  MAX_ABSENCE: 18,
  MIN_ABSENCE_FOR_ZERO: 16,
  MIN_VOLUNTEER: 15,
  MAX_VOLUNTEER: 30,
};

export const WEIGHT = {
  REGULAR_21_22: 4.8,
  REGULAR_31: 7.2 * 2,
  SPECIAL_21_22: 2.88,
  SPECIAL_31: 4.32 * 2,
};

export const CERTIFICATE_LIST: {
  name: string;
  organization: string;
  score: string;
  value: Certificate;
}[] = [
  {
    name: '정보처리기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_INFORMATION_PROCESSING',
  },
  {
    name: '정보기기운용기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION',
  },
  {
    name: '전자계산기기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_COMPUTER',
  },
];

export const LEVEL_LIST: { name: string; value: Certificate }[] = [
  { name: '1급(3점)', value: 'COMPUTER_SPECIALIST_LEVEL_1' },
  { name: '2급(2점)', value: 'COMPUTER_SPECIALIST_LEVEL_2' },
  { name: '3급(1점)', value: 'COMPUTER_SPECIALIST_LEVEL_3' },
];

export const ATTENDANCE_TYPE = [
  'absenceCount',
  'latenessCount',
  'earlyLeaveCount',
  'classAbsenceCount',
];

export const ATTENDANCE_GRADE = ['attendance1', 'attendance2', 'attendance3'];
