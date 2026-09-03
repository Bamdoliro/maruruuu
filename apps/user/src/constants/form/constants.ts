import type { Certificate } from '@/types/form/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const INFORMATION_SUBJECT = '정보';

export const INFORMATION_FIRST_GRADE_KEYS = [
  'achievementLevel11',
  'achievementLevel12',
] as const;

export const SCORE = {
  REGULAR_TYPE: 77.5,
  SPECIAL_TYPE: 45.5,
  GED_REGULAR_TYPE: 80,
  GED_SPECIAL_TYPE: 48,
  ATTENDANCE: 14,
  MIN_ATTENDANCE: 0,
  MAX_ATTENDANCE: 18,
  MIN_VOLUNTEER: 0,
  MAX_VOLUNTEER: 18,
  MAX_BONUS: 4,
  MENTORING_PROGRAM: 1,
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
  GED_REGULAR: 12 * 2,
  GED_SPECIAL: 7.2 * 2,
  INFORMATION: 0.5,
};

export const CERTIFICATE_LIST: {
  name: string;
  organization: string;
  score: string;
  value: Certificate;
}[] = [
  {
    name: '프로그래밍기능사',
    organization: '한국산업인력공단',
    score: '3점',
    value: 'CRAFTSMAN_INFORMATION_PROCESSING',
  },
  {
    name: '정보기기운용기능사',
    organization: '한국산업인력공단',
    score: '3점',
    value: 'CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION',
  },
  {
    name: '임베디드기능사',
    organization: '한국산업인력공단',
    score: '3점',
    value: 'CRAFTSMAN_COMPUTER',
  },
];

export const CERTIFICATE_SCORE: Record<Certificate, number> = {
  CRAFTSMAN_INFORMATION_PROCESSING: 3,
  CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION: 3,
  CRAFTSMAN_COMPUTER: 3,
  COMPUTER_SPECIALIST_LEVEL_1: 3,
  COMPUTER_SPECIALIST_LEVEL_2: 2,
  COMPUTER_SPECIALIST_LEVEL_3: 1,
};

export const LEVEL_LIST: { name: string; value: Certificate }[] = [
  { name: '1급(3점)', value: 'COMPUTER_SPECIALIST_LEVEL_1' },
  { name: '2급(2점)', value: 'COMPUTER_SPECIALIST_LEVEL_2' },
  { name: '3급(1점)', value: 'COMPUTER_SPECIALIST_LEVEL_3' },
];

export const MENTORING_PROGRAM = {
  name: '본교 재학생들과 함께하는 멘토·멘티 프로그램',
  organization: '부산소프트웨어마이스터고등학교',
  score: '1점',
};

export const ATTENDANCE_TYPE = [
  'absenceCount',
  'latenessCount',
  'earlyLeaveCount',
  'classAbsenceCount',
];

export const ATTENDANCE_GRADE = ['attendance1', 'attendance2', 'attendance3'];
