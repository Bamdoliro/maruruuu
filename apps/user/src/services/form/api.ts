import authorization from '@/apis/authorization/authorization';
import { maru } from '@/apis/instance/instance';
import { GetFormStatusRes, GetSaveFormRes } from '@/types/form/remote';

export const getFormStatus = async () => {
  const { data } = await maru.get<GetFormStatusRes>('/form/status', authorization());

  return data;
};

export const getExportForm = async () => {
  const { data } = await maru.get('/form/export', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getExportRecipt = async () => {
  const { data } = await maru.get('/form/proof-of-application', {
    ...authorization(),
    responseType: 'blob',
  });

  return data;
};

export const getSaveForm = async () => {
  const { data } = await maru.get<GetSaveFormRes>('/form/draft', authorization());

  return data;
};
