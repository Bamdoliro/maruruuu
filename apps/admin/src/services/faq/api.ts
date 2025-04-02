import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import type {
  GetFaqListRes,
  GetFaqDetailRes,
  PostFaqReq,
  PutFaqReq,
} from '@/types/faq/remote';

export const getFaqList = async () => {
  const { data } = await maru.get<GetFaqListRes>(`/questions`);

  return data;
};

export const getFaqDetail = async (id: number) => {
  const { data } = await maru.get<GetFaqDetailRes>(`/questions/${id}`);

  return data;
};

export const postFaq = async (params: PostFaqReq) => {
  const { data } = await maru.post(`/questions`, { params }, authorization());

  return data;
};

export const putFaq = async (id: number, params: PutFaqReq) => {
  const { data } = await maru.put(`/questions/${id}`, { params }, authorization());

  return data;
};

export const deleteFaq = async (id: number) => {
  const { data } = await maru.delete(`/questions/${id}`, authorization());

  return data;
};
