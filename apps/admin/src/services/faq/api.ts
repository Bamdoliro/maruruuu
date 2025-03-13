import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetFaqListReq, GetFaqListRes, GetFaqRes, PostFaqReq } from '@/types/faq/remote';

export const getFaqList = async (category: GetFaqListReq) => {
  const { data } = await maru.get<GetFaqListRes>(`/question?category=${category}`);

  return data;
};

export const getFaq = async (id: number) => {
  const { data } = await maru.get<GetFaqRes>(`/question/${id}`);

  return data;
};

export const postFaq = async (params: PostFaqReq) => {
  const { data } = await maru.post(`/question`, { params }, authorization());

  return data;
};
