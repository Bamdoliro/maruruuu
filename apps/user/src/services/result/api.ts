import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import { GetResultRes } from '@/types/result/remote';

export const getFirstResult = async () => {
  const { data } = await maru.get<GetResultRes>('/forms/result/first', authorization());

  return data;
};

export const getFinalResult = async () => {
  const { data } = await maru.get<GetResultRes>('/forms/result/final', authorization());

  return data;
};

export const getAdmissionTicket = async () => {
  const { data } = await maru.get('/forms/admission-ticket', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};
