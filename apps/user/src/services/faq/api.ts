import { maru } from '@/apis/instance/instance';
import type { FaqListRes } from '@/types/faq/remote';

export const getFaqList = async (category: string) => {
  const { data } = await maru.get<FaqListRes>(`/questions?category=${category}`);

  return data;
};
