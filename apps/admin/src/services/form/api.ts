import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import { GetFormListRes } from '@/types/form/remote';

export const getFormList = async () => {
  const { data } = await maru.get<GetFormListRes>('/form', authorization());

  return data;
};
