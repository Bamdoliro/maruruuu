import { z } from 'zod';

const qualificationSchema = z.object({
  graduationType: z.literal('QUALIFICATION_EXAMINATION'),
  graduationYear: z
    .string()
    .trim()
    .nonempty('합격 연도를 입력해주세요.')
    .regex(/^\d{4}$/, '합격 연도를 입력해주세요.'),
});

const schoolGraduateSchema = z.object({
  graduationType: z.enum(['EXPECTED', 'GRADUATED']),
  schoolName: z
    .string()
    .trim()
    .nonempty('출신 학교를 입력해주세요.')
    .max(30, '출신 학교를 입력해주세요.'),
  graduationYear: z
    .string()
    .trim()
    .nonempty('졸업 연도를 입력해주세요.')
    .regex(/^\d{4}$/, '졸업 연도를 입력해주세요.'),
  schoolPhoneNumber: z
    .string()
    .trim()
    .min(10, '10자 이상 입력해주세요.')
    .max(11, '11자 이하로 입력해주세요.')
    .nonempty('학교 전화번호를 입력해주세요.'),
  teacherName: z
    .string()
    .trim()
    .min(2, '작성 교사 이름을 입력해주세요.')
    .nonempty('작성 교사 이름을 입력해주세요.'),
  teacherMobilePhoneNumber: z
    .string()
    .trim()
    .regex(/^\d{11}$/, '11자리를 입력해주세요.')
    .nonempty('전화번호를 입력해주세요.'),
});

export const EducationSchema = z.discriminatedUnion('graduationType', [
  qualificationSchema,
  schoolGraduateSchema,
]);
