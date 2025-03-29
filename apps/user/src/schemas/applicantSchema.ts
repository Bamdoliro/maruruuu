import { z } from 'zod';

export const applicantSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다.').max(20, '이름은 20자 이하이어야 합니다.'),
  birthday: z.string().length(10, '생년월일을 정확히 입력해주세요.'),
  phoneNumber: z.string().regex(/^\d{11}$/, '전화번호를 정확하게 입력해주세요.'),
});
