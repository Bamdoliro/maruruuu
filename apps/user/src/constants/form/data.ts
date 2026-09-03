import type { Form, Subject } from '@/types/form/client';
import { INFORMATION_SUBJECT } from './constants';

export const STEP_LIST = ['성적 입력', '출결상황', '봉사시간', '가산점'] as const;

export const FORM: Form = {
  applicant: {
    name: '',
    phoneNumber: '',
    birthday: '',
    gender: 'MALE',
    profile: '',
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
    schoolPhoneNumber: '',
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
    mentoringProgram: false,
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
  '정보',
  '영어',
].map((subject, index) => ({
  id: index,
  subjectName: subject,
  achievementLevel21: 'F',
  achievementLevel22: 'F',
  achievementLevel31: 'F',
  score: null,
  ...(subject === INFORMATION_SUBJECT && {
    achievementLevel11: 'F',
    achievementLevel12: 'F',
  }),
}));

export const GED_SUBJECT_LIST: Subject[] = ['국어', '수학', '사회', '과학', '영어'].map(
  (subject, index) => ({
    id: index,
    subjectName: subject,
    achievementLevel21: 'F',
    achievementLevel22: 'F',
    achievementLevel31: 'F',
    score: 0,
  }),
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
  achievementLevel21: 'F',
  achievementLevel22: 'F',
  achievementLevel31: 'F',
  score: 0,
}));
