import { maru } from '@/apis/instance/instance';
import type { GetResultRes } from '@/types/result/remote';

export const getFirstResult = async () => {
  const { data } = await maru.get<GetResultRes>('/forms/result/first');

  return data;
};

export const getFinalResult = async () => {
  const { data } = await maru.get<GetResultRes>('/forms/result/final');

  return data;
};

export const getAdmissionTicket = async () => {
  const { data } = await maru.get('/forms/admission-ticket', {
    responseType: 'blob',
  });

  return data;
};
