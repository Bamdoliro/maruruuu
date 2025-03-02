import { Certificate, Form, Subject } from '@/types/form/client';

export const STEP_LIST = ['성적 입력', '출결상황', '봉사시간', '자격증'] as const;

export const FORM: Form = {
  applicant: {
    name: '',
    phoneNumber: '',
    birthday: '',
    gender: 'MALE',
  },
  parent: {
    name: '',
    phoneNumber: '',
    zoneCode: '',
    address: '',
    detailAddress: '',
    relation: '',
  },
  education: {
    graduationType: 'EXPECTED',
    graduationYear: '',
    schoolName: '',
    schoolLocation: '',
    schoolAddress: '',
    schoolCode: '',
    teacherName: '',
    teacherPhoneNumber: '',
    teacherMobilePhoneNumber: '',
  },
  grade: {
    subjectList: [],
    attendance1: {
      absenceCount: 0,
      latenessCount: 0,
      earlyLeaveCount: 0,
      classAbsenceCount: 0,
    },
    attendance2: {
      absenceCount: 0,
      latenessCount: 0,
      earlyLeaveCount: 0,
      classAbsenceCount: 0,
    },
    attendance3: {
      absenceCount: 0,
      latenessCount: 0,
      earlyLeaveCount: 0,
      classAbsenceCount: 0,
    },
    volunteerTime1: 0,
    volunteerTime2: 0,
    volunteerTime3: 0,
    certificateList: [],
  },
  document: {
    coverLetter: '',
    statementOfPurpose: '',
  },
  type: 'REGULAR',
};

export const SUBJECT_LIST: Subject[] = [
  '국어',
  '사회',
  '역사',
  '도덕',
  '수학',
  '과학',
  '기술가정',
  '영어',
  '체육',
  '음악',
  '미술',
  '정보',
].map((subject, index) => ({
  id: index,
  subjectName: subject,
  achievementLevel21: '-',
  achievementLevel22: '-',
  achievementLevel31: '-',
  score: null,
}));

export const GED_SUBJECT_LIST: Subject[] = ['국어', '수학', '사회', '과학', '영어'].map(
  (subject, index) => ({
    id: index,
    subjectName: subject,
    achievementLevel21: null,
    achievementLevel22: null,
    achievementLevel31: null,
    score: 0,
  })
);

export const SELECT_GED_SUBJECT_LIST: Subject[] = [
  '도덕',
  '기술',
  '가정',
  '체육',
  '음악',
  '미술',
].map((subject, index) => ({
  id: index,
  subjectName: subject,
  achievementLevel21: null,
  achievementLevel22: null,
  achievementLevel31: null,
  score: 0,
}));

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
