import { maru } from '@/apis/instance/instance';
import { FaqListRes } from '@/types/faq/remote';

export const getFaqList = async (category: string) => {
  const { data } = await maru.get<FaqListRes>(`/question?category=${category}`);

  return data;
};
