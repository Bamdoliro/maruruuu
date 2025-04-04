import { z } from 'zod';

export const GuardianSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('이름을 입력해 주세요.')
    .min(2, '이름은 2자 이상이어야 합니다.')
    .max(20, '이름은 20자 이하이어야 합니다.'),
  phoneNumber: z
    .string()
    .trim()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^\d{11}$/, '전화번호는 11자리를 입력해주세요.'),
  relation: z.string().trim().nonempty('올바른 값을 입력해주세요'),
  address: z
    .string()
    .trim()
    .nonempty('주소를 입력해주세요.')
    .max(100, '주소를 입력해주세요.'),
  detailAddress: z
    .string()
    .trim()
    .nonempty('알맞은 상세 주소를 입력해 주세요.')
    .max(100, '알맞은 상세 주소를 입력해 주세요.'),
});
