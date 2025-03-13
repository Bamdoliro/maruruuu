import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { FaqCategory } from '@/types/faq/client';
import { GetFaqListRes } from '@/types/faq/remote';

export const getFaqList = async (category: FaqCategory) => {
  const { data } = await maru.get<GetFaqListRes>(`/question?category=${category}`);

  return data;
};
