import { Form } from '@/types/form/client';

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
