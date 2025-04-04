import { z } from 'zod';

export const ApplicantSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('이름을 입력해 주세요.')
    .min(2, '이름은 2자 이상이어야 합니다.')
    .max(20, '이름은 20자 이하이어야 합니다.'),
  birthday: z.string().length(10, '생년월일을 정확히 입력해주세요.'),
  phoneNumber: z
    .string()
    .trim()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^\d{11}$/, '전화번호는 11자리를 입력해주세요.'),
});
