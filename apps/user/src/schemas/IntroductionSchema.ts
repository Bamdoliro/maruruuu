import { z } from 'zod';

export const IntroductionSchema = z.object({
  coverLetter: z
    .string()
    .trim()
    .min(1, '자기소개서를 입력해주세요.')
    .max(1000, '자기소개서는 1000자 이내로 작성해주세요.'),

  statementOfPurpose: z
    .string()
    .trim()
    .min(1, '학업계획서를 입력해주세요.')
    .max(1000, '학업계획서는 1000자 이내로 작성해주세요.'),
});
