import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import { GetFormStatusRes } from '@/types/form/remote';

export const getFormStatus = async () => {
  const { data } = await maru.get<GetFormStatusRes>('/form/status', authorization());

  return data;
};
