import z from 'zod';

export const SignUpBaseSchema = z.object({
  name: z
    .string()
    .regex(/^[가-힣]+$/, '이름은 한글만 사용할 수 있습니다.')
    .min(2, '이름은 최소 2자 이상이어야 합니다.')
    .max(50, '이름은 최대 50자 이내이어야 합니다.'),
  phoneNumber: z.string().regex(/^\d{11}$/, '휴대폰 번호는 숫자 11자리여야 합니다.'), // 예: 01012345678
  code: z.string().length(6, '인증 코드는 6자리여야 합니다.').optional(),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(/^[^\s]+$/, '비밀번호에 공백은 사용할 수 없습니다.')
    .regex(/[A-Za-z]/, '비밀번호에 영문자를 포함해야 합니다.')
    .regex(/\d/, '비밀번호에 숫자를 포함해야 합니다.')
    .regex(/[^\w\s]/, '비밀번호에 특수문자를 포함해야 합니다.'),
  password_confirm: z.string(),
});
