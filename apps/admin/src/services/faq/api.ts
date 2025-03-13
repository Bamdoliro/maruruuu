import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetFaqListReq, GetFaqListRes, GetFaqRes } from '@/types/faq/remote';

export const getFaqList = async (category: GetFaqListReq) => {
  const { data } = await maru.get<GetFaqListRes>(`/question?category=${category}`);

  return data;
};

export const getFaq = async (id: number) => {
  const { data } = await maru.get<GetFaqRes>(`/question/${id}`);

  data;
};
